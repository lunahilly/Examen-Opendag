import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { ALL_POIS, FLOORS, CATEGORIES } from "../data/building";
import { computeRoute } from "../data/campusWayfinding";
import MapCanvas from "./MapCanvas";
import FloorSelector from "../Components/FloorSelector";
import styles from "../../scss/indoorMap.module.scss";
import QRModal from "@/Pages/Home/QRModal";
import HeaderBar from "@/Pages/Home/HeaderBar";
import { usePage } from "@inertiajs/react";

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

    const pois = usePage().props.pois;
    const categories = usePage().props.categories;
    // ── Map state ─────────────────────────────────────────────────────────────────
    const gridpois = pois.filter((p) => p.category.name !== "transport");
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
        const van = params.get("van") ? pois.find((p) => p.value === params.get("van")) : null;
        const naar = params.get("naar") ? pois.find((p) => p.value === params.get("naar")) : null;
        const hier = params.get("hier") ? pois.find((p) => p.value === params.get("hier")) : null;

        if (van) { setOrigin(van); setFloor(van.floor_id); }
        if (naar) { setDestination(naar); setFloor(naar.floor_id); }
        if (van && naar) {
            setRoute(computeRoute(van.value, naar.value, { transport: "stairs" }));
            setSheetOpen(true);
        }
        if (hier && !van && !naar) {
            setOrigin(hier);
            setFloor(hier.floor_id);
            setScanWelcomePoi(hier);
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── URL params: sync on change ────────────────────────────────────────────────
    useEffect(() => {
        const params = new URLSearchParams();
        if (origin) params.set("van", origin.value);
        if (destination) params.set("naar", destination.value);
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
            const result = computeRoute(o.value, d.value, { transport: "stairs" });
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
            setFloor(poi.floor_id);
            applyRoute(poi, destination);
            setSelectionMode(null);
        } else if (selectionMode === "to") {
            setDestination(poi);
            if (!origin || poi.floor_id === origin.floor_id) setFloor(poi.floor_id);
            applyRoute(origin, poi);
            setSelectionMode(null);
        } else {
            if (!origin) {
                setOrigin(poi);
                setFloor(poi.floor_id);
                applyRoute(poi, destination);
                setSelectionMode("to");
            } else {
                setDestination(poi);
                if (poi.floor_id === origin.floor_id) setFloor(poi.floor_id);
                applyRoute(origin, poi);
                setSelectionMode(null);
            }
        }
        // setHlRoom(poi.roomId); GAGA
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
        let pois = gridpois;

        if (activeCategory !== "all") {
            pois = pois.filter((p) => p.category.name === activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            pois = pois.filter(
                (p) =>
                    p.label.toLowerCase().includes(q) ||
                    // (p.desc && p.desc.toLowerCase().includes(q)) || GAGA
                    (p.category.name && p.category.name.toLowerCase().includes(q)),
            );
        }

        pois = [...pois].sort((a, b) => {
            const aFav = favorites.includes(a.value);
            const bFav = favorites.includes(b.value);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return a.label.localeCompare(b.label);
        });

        return pois;
    }, [searchQuery, activeCategory, favorites]);

    const gridCategories = categories.filter((c) => c.value !== "transport");

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
                                pois={pois}
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
                                key={cat.value}
                                className={`${styles.catTab} ${activeCategory === cat.value ? styles.catTabActive : ""}`}
                                onClick={() => setActiveCategory(cat.value)}
                            >
                                <i className={cat.icon} /> {cat.label}
                            </button>
                        ))}
                    </div>

                    {filteredPois.length > 0 ? (
                        <div className={styles.poiBox}>
                            {filteredPois.map((poi) => {
                                const isOrigin = origin?.value === poi.value;
                                const isDest = destination?.value === poi.value;
                                return (
                                    <div
                                        key={poi.value}
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
                                            className={`${styles.favBtn} ${isFav(poi.value) ? styles.favActive : ""}`}
                                            onClick={(e) => { e.stopPropagation(); toggleFav(poi.value); }}
                                            title={isFav(poi.value) ? "Verwijder favoriet" : "Voeg toe aan favorieten"}
                                        >
                                            {isFav(poi.value) ? "⭐" : "☆"}
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