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
    const wrapRef = useRef(null)
    const [tx, setTx] = useState({ x: 0, y: 0, s: 1 })
    const drag = useRef(null)
    const dragStart = useRef(null)
    const didDrag = useRef(false)
    const touchPan = useRef(null)
    const pinch = useRef(null)

    // ── Derived values (all declared before the return) ──────────────────────

    const floorPois = (pois || []).filter(p =>
        Number(p.floor) === Number(floor)
    )
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
        const all = route.waypoints
        const markers = []

        // The floor the route ultimately ends on
        const eindFloor = all[all.length - 1].floor

        for (let i = 0; i < all.length; i++) {
            const wp = all[i]
            if (wp.floor !== floor) continue
            const prev = all[i - 1]
            const next = all[i + 1]
            if (prev && prev.floor !== floor)
                markers.push({ x: wp.x, y: wp.y, type: 'entry', doelFloor: eindFloor })
            if (next && next.floor !== floor)
                markers.push({ x: wp.x, y: wp.y, type: 'exit', doelFloor: eindFloor })
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
                    {/* ... jouw defs blijven exact hetzelfde ... */}
                </defs>

                <rect width={SVG_W} height={SVG_H} fill="#353535" />

                <g transform={`translate(${tx.x},${tx.y}) scale(${tx.s})`}>

                    {/* FLOOR */}
                    <image
                        href={FLOOR_IMAGES[floor]}
                        x="0"
                        y="0"
                        width={SVG_W}
                        height={SVG_H}
                        preserveAspectRatio="none"
                    />

                    {/* ROUTE */}
                    {routePath && (
                        <>
                            <path
                                d={routePath}
                                fill="none"
                                stroke="rgba(224,64,251,0.18)"
                                strokeWidth="14"
                            />
                            <path
                                className="rDots"
                                d={routePath}
                                fill="none"
                                stroke="#e040fb"
                                strokeWidth="5"
                                strokeLinecap="round"
                                strokeDasharray="0 14"
                                filter="url(#glow)"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    from="14"
                                    to="0"
                                    dur="0.6s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </>
                    )}

                    {/* WALKER */}
                    {walkerPos && walkerPos.floor === floor && (
                        <g transform={`translate(${walkerPos.x},${walkerPos.y})`} pointerEvents="none">
                            <circle className="wRing" r="14" fill="rgba(224,64,251,0.25)" />
                            <circle r="6" fill="#e040fb" stroke="#fff" strokeWidth="2" filter="url(#glow)" />
                        </g>
                    )}

                    {/* STAIRS */}
                    {stairMarkers.map((m, i) => (
                        <g key={i} transform={`translate(${m.x},${m.y})`} pointerEvents="none">
                            {m.type === 'exit' && (
                                <g transform="translate(0,-20)">
                                    <rect className={styles.stairMarkerBg} />
                                    <text textAnchor="middle" y="1" fontSize="8" fill="#fff">
                                        {FLOORS.find(f => f.id === m.doelFloor)?.name}
                                    </text>
                                </g>
                            )}
                        </g>
                    ))}

                    {/* ========================= */}
                    {/* POI LAYER (GEEN LABELS) */}
                    {/* ========================= */}

                    {floorPois.map(poi => {
                        const isOrigin = origin?.id === poi.id
                        const isDest = destination?.id === poi.id
                        const isTransit = poi.category === 'transport'
                        const isProgramHL = Array.isArray(highlightPoiIds) && highlightPoiIds.includes(poi.id)

                        const r = isOrigin || isDest ? 12 : 8
                        const stroke = isOrigin ? '#4caf50' : isDest ? '#f44336'
                            : isProgramHL ? '#f59e0b'
                                : isTransit ? '#c060e0'
                                    : '#e040fb'

                        const fill = isOrigin ? 'rgba(76,175,80,0.15)'
                            : isDest ? 'rgba(244,67,54,0.15)'
                                : isProgramHL ? 'rgba(245,158,11,0.20)'
                                    : isTransit ? 'rgba(192,96,224,0.12)'
                                        : 'rgba(224,64,251,0.12)'

                        return (
                            <g
                                key={poi.id}
                                transform={`translate(${poi.x},${poi.y})`}
                                onClick={() => { if (!didDrag.current) onPoiClick(poi) }}
                                onMouseEnter={() => onPoiHover(poi)}
                                onMouseLeave={() => onPoiHover(null)}
                                style={{ cursor: 'pointer' }}
                            >
                                {!isOrigin && !isDest && <circle r={r} fill={fill} stroke={stroke} strokeWidth="1.5" />}
                                <image
                                    href={`/icons/${poi.icon}.webp`}
                                    x={-10}
                                    y={-10}
                                    width={24}
                                    height={24}
                                    pointerEvents="none"
                                />
                            </g>
                        )
                    })}

                    {/* ========================= */}
                    {/* LABEL LAYER (ALTIJD BOVEN) */}
                    {/* ========================= */}

                    {floorPois.map(poi => {
                        const isHov = hoveredPoi?.id === poi.id
                        const isOrigin = origin?.id === poi.id
                        const isDest = destination?.id === poi.id

                        if (!(isHov || isOrigin || isDest)) return null

                        const lw = Math.max(poi.label.length * 5.8 + 14, 50)

                        return (
                            <g
                                key={`label-${poi.id}`}
                                transform={`translate(${poi.x},${poi.y - 28})`}
                                pointerEvents="none"
                            >
                                <rect
                                    x={-lw / 2}
                                    y="-9"
                                    width={lw}
                                    height="18"
                                    rx="4"
                                    fill="#1a1a1a"
                                    stroke="#FF00E3"
                                    strokeWidth="1.5"
                                    opacity="0.95"
                                />
                                <text
                                    textAnchor="middle"
                                    y="4"
                                    fontSize="8"
                                    fill={isDark ? '#fff' : '#1a1a1a'}
                                    fontFamily="'DM Sans', sans-serif"
                                    fontWeight="500"
                                >
                                    {poi.label}
                                </text>
                            </g>
                        )
                    })}

                </g>
            </svg>

            {/* zoom UI blijft hetzelfde */}
            <div className={styles.zoom}>
                <button onClick={() => setTx(t => ({ ...t, s: Math.min(6, t.s * 1.25) }))}>+</button>
                <button onClick={() => setTx(t => ({ ...t, s: Math.max(0.3, t.s / 1.25) }))}>−</button>
                <button onClick={resetView}>⊡</button>
            </div>
        </div>
    )
}