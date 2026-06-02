import { useRef, useState, useEffect, useCallback } from 'react'
import { SVG_W, SVG_H, FLOORS } from '../data/building'
import styles from '../../scss/components/MapCanvas.module.scss'

const FLOOR_IMAGES = {
    0: '/maps/floor-0.png',
    1: '/maps/floor-1.png',
    2: '/maps/floor-2.png',
    3: '/maps/floor-3.png',
}

function pinchDist(t1, t2) {
    const dx = t1.clientX - t2.clientX
    const dy = t1.clientY - t2.clientY
    return Math.sqrt(dx * dx + dy * dy)
}

export default function MapCanvas({
    floor, pois, route, origin, destination,
    onPoiClick, hoveredPoi, onPoiHover,
    centerOn, isDark, walkerPos,
    highlightPoiIds,
    accessMode,
}) {
    console.log(floor); // GAGA
    // Ref to the outer wrapper div — used to attach wheel and touch listeners
    const wrapRef = useRef(null)
    const [tx, setTx] = useState({ x: 0, y: 0, s: 1 })
    const drag = useRef(null)
    const dragStart = useRef(null)
    const didDrag = useRef(false)
    const touchPan = useRef(null)
    const pinch = useRef(null)

    // ── Derived values (all declared before the return) ──────────────────────

    // Only POIs that belong to the currently visible floor
    const floorPois = (pois || []).filter(p => p.floor_id === floor) // floor => floor_id GAGA

    const routePath = (() => {
        if (!route?.waypoints || route.waypoints.length < 2) return ''
        const alle = route.waypoints
        let d = ''
        for (let i = 0; i < alle.length; i++) {
            const wp = alle[i]
            if (wp.floor !== floor) continue
            const vorige = i > 0 ? alle[i - 1] : null
            const doorlopend = vorige && vorige.floor === floor
            d += `${doorlopend ? 'L' : 'M'}${wp.x},${wp.y} `
        }
        return d.trim()
    })()

    // Collect the points where the route crosses to/from this floor, including
    // the floor number the user needs to travel to so the label is correct.
    const stairMarkers = (() => {
        if (!route || !route.multiFloor) return []
        console.log('this');
        const all = route.waypoints
        const markers = []
        for (let i = 0; i < all.length; i++) {
            const wp = all[i]
            if (wp.floor !== floor) continue
            const prev = all[i - 1]
            const next = all[i + 1]
            // Entry: coming FROM another floor onto this one
            console.log(prev);
            if (prev && prev.floor !== floor)
                markers.push({ x: wp.x, y: wp.y, type: 'entry', doelFloor: prev.floor })
            // Exit: leaving this floor FOR another one
            if (next && next.floor !== floor)
                markers.push({ x: wp.x, y: wp.y, type: 'exit', doelFloor: next.floor })
        }
        return markers
    })()

    // ── Event handlers ───────────────────────────────────────────────────────

    const onMouseDown = useCallback((e) => {
        if (e.button !== 0) return
        drag.current = { sx: e.clientX - tx.x, sy: e.clientY - tx.y }
        dragStart.current = { x: e.clientX, y: e.clientY }
        didDrag.current = false
    }, [tx])

    const onMouseMove = useCallback((e) => {
        if (!drag.current) return
        if (dragStart.current) {
            const dx = e.clientX - dragStart.current.x
            const dy = e.clientY - dragStart.current.y
            if (Math.abs(dx) > 4 || Math.abs(dy) > 4) didDrag.current = true
        }
        setTx(t => ({ ...t, x: e.clientX - drag.current.sx, y: e.clientY - drag.current.sy }))
    }, [])

    const onMouseUp = useCallback(() => {
        drag.current = null
        dragStart.current = null
    }, [])

    const onWheel = useCallback((e) => {
        if (!e.ctrlKey) return
        e.preventDefault()
        const f = e.deltaY > 0 ? 0.88 : 1.14
        setTx(t => ({ ...t, s: Math.max(0.3, Math.min(6, t.s * f)) }))
    }, [])

    function handleClick(e) {
        const svg = e.currentTarget
        const pt = svg.createSVGPoint()
        pt.x = e.clientX
        pt.y = e.clientY
        const svgPt = pt.matrixTransform(svg.getScreenCTM().inverse())
        const x = (svgPt.x - tx.x) / tx.s
        const y = (svgPt.y - tx.y) / tx.s
        console.log('WORLD CLICK:', { x: Math.round(x), y: Math.round(y) })
    }

    const resetView = () => setTx({ x: 0, y: 0, s: 1 })

    // ── Effects ──────────────────────────────────────────────────────────────

    useEffect(() => {
        const stop = () => { drag.current = null; dragStart.current = null }
        document.addEventListener('mouseup', stop)
        return () => document.removeEventListener('mouseup', stop)
    }, [])

    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [onWheel])

    useEffect(() => {
        const el = wrapRef.current
        if (!el) return

        const onTouchStart = (e) => {
            if (e.touches.length === 1) {
                const t = e.touches[0]
                touchPan.current = { sx: t.clientX, sy: t.clientY }
                pinch.current = null
                didDrag.current = false
            } else if (e.touches.length === 2) {
                const dist = pinchDist(e.touches[0], e.touches[1])
                setTx(cur => {
                    pinch.current = { startDist: dist, startScale: cur.s }
                    return cur
                })
                touchPan.current = null
            }
        }

        const onTouchMove = (e) => {
            e.preventDefault()
            if (e.touches.length === 1 && touchPan.current) {
                const t = e.touches[0]
                const dx = t.clientX - touchPan.current.sx
                const dy = t.clientY - touchPan.current.sy
                if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag.current = true
                touchPan.current = { sx: t.clientX, sy: t.clientY }
                setTx(cur => ({ ...cur, x: cur.x + dx, y: cur.y + dy }))
            } else if (e.touches.length === 2 && pinch.current) {
                const newDist = pinchDist(e.touches[0], e.touches[1])
                const newScale = Math.max(0.3, Math.min(6,
                    pinch.current.startScale * (newDist / pinch.current.startDist)
                ))
                setTx(cur => ({ ...cur, s: newScale }))
            }
        }

        const onTouchEnd = () => {
            touchPan.current = null
            pinch.current = null
        }

        el.addEventListener('touchstart', onTouchStart, { passive: false })
        el.addEventListener('touchmove', onTouchMove, { passive: false })
        el.addEventListener('touchend', onTouchEnd, { passive: false })
        el.addEventListener('touchcancel', onTouchEnd, { passive: false })

        return () => {
            el.removeEventListener('touchstart', onTouchStart)
            el.removeEventListener('touchmove', onTouchMove)
            el.removeEventListener('touchend', onTouchEnd)
            el.removeEventListener('touchcancel', onTouchEnd)
        }
    }, [])

    useEffect(() => {
        if (!centerOn) return
        setTx(prev => {
            const s = Math.max(prev.s, 2.0)
            return { x: 400 - centerOn.x * s, y: 343 - centerOn.y * s, s }
        })
    }, [centerOn])

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <div
            className={styles.wrapper}
            ref={wrapRef}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
        >
            <svg
                className={styles.svg}
                viewBox={`0 0 ${SVG_W} ${SVG_H}`}
                preserveAspectRatio="xMidYMid meet"
                onClick={handleClick}
            >
                <defs>
                    <style>{`
                        @keyframes dotFlow { to { stroke-dashoffset: -14; } }
                        .rDots { animation: dotFlow 0.75s linear infinite; }
                        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:0.1} }
                        .pPulse { animation: pulse 1.8s ease-in-out infinite; }
                        @keyframes pulse2 { 0%,100%{opacity:0.35;transform:scale(1)} 50%{opacity:0;transform:scale(1.6)} }
                        .pPulse2 { animation: pulse2 2.2s ease-out infinite; transform-origin:center; transform-box:fill-box; }
                        @keyframes wPulse { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:0.15;transform:scale(1.8)} }
                        .wRing { animation: wPulse 1.1s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
                    `}</style>
                    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="3" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="glowAmber" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="5" result="b" />
                        <feFlood floodColor="#f59e0b" floodOpacity="0.6" result="c" />
                        <feComposite in="c" in2="b" operator="in" result="d" />
                        <feMerge><feMergeNode in="d" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>

                <rect width={SVG_W} height={SVG_H} fill="#353535" />

                <g transform={`translate(${tx.x},${tx.y}) scale(${tx.s})`}>

                    {/* Floor plan image */}
                    <image
                        href={FLOOR_IMAGES[floor]}
                        x="0" y="0"
                        width={SVG_W} height={SVG_H}
                        preserveAspectRatio="none"
                    />

                    {/* Route dots */}
                    {routePath && (
                        <>
                            <path d={routePath} fill="none"
                                stroke="rgba(224,64,251,0.18)" strokeWidth="14"
                                strokeLinecap="round" strokeLinejoin="round" />
                            <path className="rDots" d={routePath} fill="none"
                                stroke="#e040fb" strokeWidth="5"
                                strokeLinecap="round" strokeLinejoin="round"
                                strokeDasharray="1 13"
                                filter="url(#glow)" />
                        </>
                    )}

                    {/* Demo walker */}
                    {walkerPos && walkerPos.floor === floor && (
                        <g transform={`translate(${walkerPos.x},${walkerPos.y})`} pointerEvents="none">
                            <circle className="wRing" r="14" fill="rgba(224,64,251,0.25)" stroke="none" />
                            <circle r="6" fill="#e040fb" stroke="#fff" strokeWidth="2"
                                filter="url(#glow)" />
                        </g>
                    )}

                    {/* Stair/lift transition markers */}
                    {stairMarkers.map((m, i) => {
                        const floorObj = FLOORS.find(f => f.id === m.doelFloor)
                        const tekst = floorObj
                            ? `Ga naar ${floorObj.name}`
                            : `Ga naar verdieping ${m.doelFloor}`
                        const breedte = tekst.length * 5 + 16
                        return (
                            <g key={i} transform={`translate(${m.x},${m.y})`} pointerEvents="none">
                                {m.type === 'exit' && (
                                    <g transform="translate(0,-20)" pointerEvents="none">
                                        <rect className={styles.stairMarkerBg}
                                            x={-breedte / 2} y="-9" width={breedte} height="14" rx="4" />
                                        <text
                                            textAnchor="middle"
                                            y="1"
                                            fontSize="8"
                                            fill="#ffffff"
                                            fontFamily="'DM Sans', sans-serif"
                                            fontWeight="500"
                                        >
                                            {tekst}
                                        </text>
                                    </g>
                                )}
                            </g>
                        )
                    })}

                    {/* POI markers */}
                    {floorPois.map(poi => {
                        const isOrigin = origin?.value === poi.value // poi.id GAGA
                        const isDest = destination?.value === poi.value // poi.id GAGA
                        const isHov = hoveredPoi?.value === poi.value // poi.id GAGA
                        const isTransit = poi.category.value === 'transport' // poi.category => poi.category.value GAGA
                        // Amber/gold highlight for programme filter
                        const isProgramHL = Array.isArray(highlightPoiIds) && highlightPoiIds.includes(poi.id)

                        const r = isOrigin || isDest ? 12 : isHov ? 10 : 8
                        const stroke = isOrigin ? '#4caf50' : isDest ? '#f44336'
                            : isProgramHL ? '#f59e0b'
                                : isTransit ? '#c060e0' : '#e040fb'
                        const fill = isOrigin ? 'rgba(76,175,80,0.15)'
                            : isDest ? 'rgba(244,67,54,0.15)'
                                : isProgramHL ? 'rgba(245,158,11,0.20)'
                                    : isTransit ? 'rgba(192,96,224,0.12)'
                                        : 'rgba(224,64,251,0.12)'

                        const lw = Math.max(poi.label.length * 5.8 + 14, 50)

                        return (
                            <g key={poi.id}
                                transform={`translate(${poi.x},${poi.y})`}
                                onClick={() => { if (!didDrag.current) onPoiClick(poi) }}
                                onMouseEnter={() => onPoiHover(poi)}
                                onMouseLeave={() => onPoiHover(null)}
                                style={{ cursor: 'pointer' }}>

                                {isOrigin && (
                                    <circle className="pPulse2" r="22"
                                        fill="rgba(76,175,80,0.18)" stroke="#4caf50" strokeWidth="1" />
                                )}
                                {(isOrigin || isDest) && (
                                    <circle className="pPulse" r="18"
                                        fill="none" stroke={stroke} strokeWidth="1.5" />
                                )}
                                <circle r={r} fill={fill} stroke={stroke} strokeWidth="1.5"
                                    filter={isOrigin || isDest ? 'url(#glow)' : isProgramHL ? 'url(#glowAmber)' : undefined} />
                                <image
                                    href={`/icons/${poi.icon}.webp`}
                                    x={-10} y={-10} width={24} height={24}
                                    pointerEvents="none"
                                />
                                {(isHov || isOrigin || isDest) && (
                                    <g transform="translate(0,-28)" pointerEvents="none">
                                        <rect x={-lw / 2} y="-9" width={lw} height="18" rx="4"
                                            fill='#1a1a1a'
                                            stroke='#FF00E3'
                                            strokeWidth="1.5"
                                            opacity="0.95"
                                        />
                                        <text
                                            textAnchor="middle"
                                            y="4"
                                            fontSize="8"
                                            fill={isDark ? '#ffffff' : '#1a1a1a'}
                                            fontFamily="'DM Sans', sans-serif"
                                            fontWeight="500"
                                            pointerEvents="none"
                                        >
                                            {poi.label}
                                        </text>
                                    </g>
                                )}
                            </g>
                        )
                    })}
                </g>
            </svg>

            <div className={styles.zoom}>
                <button className={styles.zBtn}
                    onClick={() => setTx(t => ({ ...t, s: Math.min(6, t.s * 1.25) }))}>+</button>
                <button className={styles.zBtn}
                    onClick={() => setTx(t => ({ ...t, s: Math.max(0.3, t.s / 1.25) }))}>−</button>
                <button className={styles.zBtn} onClick={resetView} title="Reset">⊡</button>
            </div>
        </div>
    )
}