import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import JSZip from "jszip";
import { QRCodeSVG } from "qrcode.react";
import { ALL_POIS, FLOORS, CATEGORIES } from "../data/building";
import { computeRoute } from "../data/campusWayfinding";
import MapCanvas from "./MapCanvas";
import FloorSelector from "../Components/FloorSelector";
import styles from "../../scss/indoorMap.module.scss";
import { usePage } from "@inertiajs/react";
import QRModal from "@/Pages/Home/QRModal";
import HeaderBar from "@/Pages/Home/HeaderBar";

// All POIs that are not transport nodes (stairs/lift) — used in the grid and search
const GRID_POIS = ALL_POIS.filter((p) => p.category !== "transport");

// Maps a route step type to a display emoji icon
const STEP_ICONS = {
    start: "📍",
    walk: "🚶",
    elevator: "🛗",
    stairs: "🪜",
    enter: "🚪",
    arrive: "✅",
};

// ── QR Scan Welcome Overlay ───────────────────────────────────────────────────
function ScanWelcomeOverlay({ poi, onNavigate, onExplore }) {
    const floor = FLOORS.find((f) => f.id === poi.floor);

    const statusColor =
        poi.status === "vrij" ? "scanBadgeGreen"
            : poi.status === "bezet" ? "scanBadgeRed"
                : poi.status === "gesloten" ? "scanBadgeAmber"
                    : "";

    const statusLabel =
        poi.status === "vrij" ? "✅ Vrij"
            : poi.status === "bezet" ? "🔴 Bezet"
                : poi.status === "gesloten" ? "🔒 Gesloten"
                    : "";

    return (
        <div className={styles.scanOverlay} onClick={(e) => {
            if (e.target === e.currentTarget) onExplore();
        }}>
            <div className={styles.scanCard}>
                <div className={styles.scanRing}>
                    <div className={styles.scanIcon}>
                        <img src={`/icons/${poi.icon}.webp`} alt="" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
                    </div>
                </div>
                <div className={styles.scanHere}>📍 Je bent hier</div>
                <div className={styles.scanName}>{poi.label}</div>
                <div className={styles.scanBadges}>
                    {floor && <span className={styles.scanBadge}>{floor.name}</span>}
                    {statusLabel && (
                        <span className={`${styles.scanBadge} ${statusColor ? styles[statusColor] : ""}`}>
                            {statusLabel}
                        </span>
                    )}
                    {poi.category && <span className={styles.scanBadge}>{poi.category}</span>}
                </div>
                {poi.desc && <div className={styles.scanDesc}>{poi.desc}</div>}
                <button className={styles.scanCta} onClick={onNavigate}>
                    🗺️ Kies mijn bestemming
                </button>
                <button className={styles.scanExplore} onClick={onExplore}>
                    Verken de kaart zonder route
                </button>
            </div>
        </div>
    );
}

// ── Header ────────────────────────────────────────────────────────────────────

// ── Route steps list ──────────────────────────────────────────────────────────
// function StepsList({ route }) {
//     return (
//         <ol className={styles.stepsList}>
//             {route.steps.map((step, i) => (
//                 <li key={i} className={`${styles.step} ${styles[`step_${step.type}`]}`}>
//                     <div className={styles.stepLeft}>
//                         <span className={styles.stepIcon}>
//                             {STEP_ICONS[step.icon] ?? step.icon}
//                         </span>
//                         {i < route.steps.length - 1 && <span className={styles.stepLine} />}
//                     </div>
//                     <span className={styles.stepText}>{step.text}</span>
//                 </li>
//             ))}
//         </ol>
//     );
// }

// ── QR Modal ──────────────────────────────────────────────────────────────────


// ── Main component ────────────────────────────────────────────────────────────
export default function IndoorMap() {
    // ── Theme ─────────────────────────────────────────────────────────────────────
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("mA-theme");
        if (stored) return stored === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const theme = isDark ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("mA-theme", theme);
    }, [isDark]);

    // ── Map state ─────────────────────────────────────────────────────────────────
    const [floor, setFloor] = useState(0);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [route, setRoute] = useState(null);
    const [selectionMode, setSelectionMode] = useState(null);
    const [hoveredPoi, setHoveredPoi] = useState(null);
    const [hlRoom, setHlRoom] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [sheetOpen, setSheetOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState("");
    const toastTimer = useRef(null);

    // ── Category filter ───────────────────────────────────────────────────────────
    const [activeCategory, setActiveCategory] = useState("all");

    // ── Favorites ─────────────────────────────────────────────────────────────────
    const [favorites, setFavorites] = useState(() => {
        try { return JSON.parse(localStorage.getItem("mA-fav") ?? "[]"); }
        catch { return []; }
    });
    const isFav = (id) => favorites.includes(id);
    const toggleFav = (id) =>
        setFavorites((prev) => {
            const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
            localStorage.setItem("mA-fav", JSON.stringify(next));
            return next;
        });

    // ── Room statuses ─────────────────────────────────────────────────────────────
    const roomStatuses = useMemo(() => {
        const m = {};
        ALL_POIS.forEach((p) => { if (p.roomId) m[p.roomId] = p.status; });
        return m;
    }, []);

    // ── QR scan welcome state ─────────────────────────────────────────────────────
    const [scanWelcomePoi, setScanWelcomePoi] = useState(null);

    // ── QR modal state ────────────────────────────────────────────────────────────
    const [showQR, setShowQR] = useState(false);

    // ── URL params: read on mount ─────────────────────────────────────────────────
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const van = params.get("van") ? ALL_POIS.find((p) => p.id === params.get("van")) : null;
        const naar = params.get("naar") ? ALL_POIS.find((p) => p.id === params.get("naar")) : null;
        const hier = params.get("hier") ? ALL_POIS.find((p) => p.id === params.get("hier")) : null;

        if (van) { setOrigin(van); setFloor(van.floor); }
        if (naar) { setDestination(naar); setFloor(naar.floor); }
        if (van && naar) {
            setRoute(computeRoute(van.id, naar.id, { transport: "stairs" }));
            setSheetOpen(true);
        }
        if (hier && !van && !naar) {
            setOrigin(hier);
            setFloor(hier.floor);
            setScanWelcomePoi(hier);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── URL params: sync on change ────────────────────────────────────────────────
    useEffect(() => {
        const params = new URLSearchParams();
        if (origin) params.set("van", origin.id);
        if (destination) params.set("naar", destination.id);
        const qs = params.toString();
        window.history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
    }, [origin, destination]);

    // ── Toast ─────────────────────────────────────────────────────────────────────
    const showToast = useCallback((msg) => {
        setToastMsg(msg);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToastMsg(""), 2500);
    }, []);

    const handleShare = useCallback(() => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => showToast("🔗 Link gekopieerd!"))
            .catch(() => showToast("❌ Kopiëren mislukt"));
    }, [showToast]);

    // ── Route ─────────────────────────────────────────────────────────────────────
    const applyRoute = useCallback((o, d) => {
        if (o && d) {
            const result = computeRoute(o.id, d.id, { transport: "stairs" });
            setRoute(result);
            setSheetOpen(true);
        } else {
            setRoute(null);
            setSheetOpen(false);
        }
    }, []);

    const handlePoiClick = useCallback((poi) => {
        if (selectionMode === "from") {
            setOrigin(poi);
            setFloor(poi.floor);
            applyRoute(poi, destination);
            setSelectionMode(null);
        } else if (selectionMode === "to") {
            setDestination(poi);
            if (!origin || poi.floor === origin.floor) setFloor(poi.floor);
            applyRoute(origin, poi);
            setSelectionMode(null);
        } else {
            if (!origin) {
                setOrigin(poi);
                setFloor(poi.floor);
                applyRoute(poi, destination);
                setSelectionMode("to");
            } else {
                setDestination(poi);
                if (poi.floor === origin.floor) setFloor(poi.floor);
                applyRoute(origin, poi);
                setSelectionMode(null);
            }
        }
        setHlRoom(poi.roomId);
        setTimeout(() => setHlRoom(null), 1200);
    }, [selectionMode, origin, destination, applyRoute]);

    const handleClear = () => {
        setOrigin(null);
        setDestination(null);
        setRoute(null);
        setSelectionMode(null);
        setSheetOpen(false);
    };

    const toggleMode = (mode) => setSelectionMode((m) => (m === mode ? null : mode));

    // ── Filtered + sorted POIs ────────────────────────────────────────────────────
    const filteredPois = useMemo(() => {
        let pois = GRID_POIS;

        if (activeCategory !== "all") {
            pois = pois.filter((p) => p.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            pois = pois.filter(
                (p) =>
                    p.label.toLowerCase().includes(q) ||
                    (p.desc && p.desc.toLowerCase().includes(q)) ||
                    (p.category && p.category.toLowerCase().includes(q)),
            );
        }

        pois = [...pois].sort((a, b) => {
            const aFav = favorites.includes(a.id);
            const bFav = favorites.includes(b.id);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return a.label.localeCompare(b.label);
        });

        return pois;
    }, [searchQuery, activeCategory, favorites]);

    const gridCategories = CATEGORIES.filter((c) => c.id !== "transport");

    // ── Render ────────────────────────────────────────────────────────────────────
    return (
        <div
            className={styles.app}
            data-theme={isDark ? "dark" : "light"}
        >
            {scanWelcomePoi && (
                <ScanWelcomeOverlay
                    poi={scanWelcomePoi}
                    onNavigate={() => {
                        setScanWelcomePoi(null);
                        setSelectionMode("to");
                        showToast(`📍 Je start bij ${scanWelcomePoi.label}. Kies nu je bestemming!`);
                    }}
                    onExplore={() => setScanWelcomePoi(null)}
                />
            )}

            <HeaderBar onShowQR={() => setShowQR(true)} />

            <main className={styles.main}>
                <div className={`${styles.card} wrapper`}>
                    <div className={styles.mapRow}>
                        <div className={styles.mapWrap}>
                            <MapCanvas
                                floor={floor}
                                pois={ALL_POIS}
                                route={route}
                                origin={origin}
                                destination={destination}
                                hoveredPoi={hoveredPoi}
                                onPoiClick={handlePoiClick}
                                onPoiHover={setHoveredPoi}
                                highlightRoomId={hlRoom}
                                roomStatuses={roomStatuses}
                                isDark={isDark}
                            />
                        </div>
                        <div className={styles.floorCol}>
                            <FloorSelector floor={floor} onChange={setFloor} />
                        </div>
                    </div>

                    {origin && (
                        <div className={styles.youAreHere}>
                            📍 <strong>Je bent hier:</strong>&nbsp;{origin.label}
                        </div>
                    )}

                    <div className={styles.routeBox}>
                        <button
                            className={`${styles.routeField} ${selectionMode === "from" ? styles.routeFieldActive : ""}`}
                            onClick={() => toggleMode("from")}
                        >
                            <span className={styles.dotGreen}>●</span>
                            <span className={styles.routeLabel}>Vanaf</span>
                            <span className={`${styles.routeValue} ${origin ? styles.routeValueSet : ""}`}>
                                {origin ? origin.label : "Kies locatie"}
                            </span>
                        </button>
                        <div className={styles.routeDivider} />
                        <button
                            className={`${styles.routeField} ${selectionMode === "to" ? styles.routeFieldActive : ""}`}
                            onClick={() => toggleMode("to")}
                        >
                            <span className={styles.dotPink}>●</span>
                            <span className={styles.routeLabel}>Naar</span>
                            <span className={`${styles.routeValue} ${destination ? styles.routeValueSet : ""}`}>
                                {destination ? destination.label : "Kies locatie"}
                            </span>
                        </button>
                        {(origin || destination) && (
                            <button className={styles.clearBtn} onClick={handleClear} title="Wis route">
                                ✕
                            </button>
                        )}
                    </div>

                    {selectionMode && (
                        <div className={styles.hint}>Klik op een locatie op de kaart of in de lijst</div>
                    )}

                    {/* {route && (
                        <div className={`${styles.stepsBox} ${styles.desktopOnly}`}>
                            <div className={styles.stepsHeader}>
                                <span className={styles.stepsMeta}>
                                    📏 ~{route.totalDistance} m &nbsp;·&nbsp; 🚶 ~{route.totalMinutes} min
                                    {route.multiFloor && <>&nbsp;·&nbsp;🛗 meerdere verdiepingen</>}
                                </span>
                                <div style={{ display: "flex", gap: 4 }}>
                                    <button className={styles.shareBtn} onClick={() => window.print()} title="Afdrukken">🖨️</button>
                                    <button className={styles.shareBtn} onClick={handleShare} title="Deel route">🔗</button>
                                </div>
                            </div>
                            <StepsList route={route} />
                        </div>
                    )} */}

                    <div className={styles.searchWrap}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder="Zoek een ruimte…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button className={styles.searchClear} onClick={() => setSearchQuery("")}>✕</button>
                        )}
                    </div>

                    <div className={styles.catTabs}>
                        {gridCategories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`${styles.catTab} ${activeCategory === cat.id ? styles.catTabActive : ""}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <i className={cat.icon} /> {cat.label}
                            </button>
                        ))}
                    </div>

                    {filteredPois.length > 0 ? (
                        <div className={styles.poiBox}>
                            {filteredPois.map((poi) => {
                                const isOrigin = origin?.id === poi.id;
                                const isDest = destination?.id === poi.id;
                                return (
                                    <div
                                        key={poi.id}
                                        role="button"
                                        tabIndex={0}
                                        className={`${styles.poiItem} ${isOrigin ? styles.poiFrom : ""} ${isDest ? styles.poiTo : ""}`}
                                        onClick={() => handlePoiClick(poi)}
                                        onKeyDown={(e) => e.key === "Enter" && handlePoiClick(poi)}
                                    >
                                        <span className={`${styles.checkBox} ${isOrigin || isDest ? styles.checkActive : ""}`} />
                                        <span className={styles.poiName}>
                                            <img src={`/icons/${poi.icon}.webp`} alt="" className={styles.poiIcon} />
                                            {poi.label}
                                        </span>
                                        <button
                                            className={`${styles.favBtn} ${isFav(poi.id) ? styles.favActive : ""}`}
                                            onClick={(e) => { e.stopPropagation(); toggleFav(poi.id); }}
                                            title={isFav(poi.id) ? "Verwijder favoriet" : "Voeg toe aan favorieten"}
                                        >
                                            {isFav(poi.id) ? "⭐" : "☆"}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            Geen resultaten voor &ldquo;<strong>{searchQuery}</strong>&rdquo;
                        </div>
                    )}
                </div>
            </main>

            {route && (
                <div className={`${styles.sheet} ${sheetOpen ? styles.sheetOpen : ""}`}>
                    <div className={styles.sheetHandle} onClick={() => setSheetOpen((o) => !o)}>
                        <div className={styles.sheetHandleBar} />
                        <span className={styles.sheetHandleLabel}>
                            📏 ~{route.totalDistance} m &nbsp;·&nbsp; 🚶 ~{route.totalMinutes} min
                            {route.multiFloor && <>&nbsp;·&nbsp;🛗</>}
                        </span>
                        <div style={{ display: "flex", gap: 4 }}>
                            <button className={styles.shareBtn} onClick={(e) => { e.stopPropagation(); window.print(); }}>🖨️</button>
                            <button className={styles.shareBtn} onClick={(e) => { e.stopPropagation(); handleShare(); }}>🔗</button>
                        </div>
                    </div>
                    <div className={styles.sheetContent}>
                        {/* <StepsList route={route} /> */}
                    </div>
                </div>
            )}

            {toastMsg && (
                <div className={`${styles.toast} ${styles.toastVisible}`}>{toastMsg}</div>
            )}

            {showQR && <QRModal onClose={() => setShowQR(false)} />}
        </div>
    );
}