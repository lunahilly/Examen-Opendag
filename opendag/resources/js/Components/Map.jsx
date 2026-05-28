import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import JSZip from "jszip";
import { QRCodeSVG } from "qrcode.react";
import { ALL_POIS, FLOORS } from "../data/building";
import { computeRoute } from "../data/campusWayfinding";
import MapCanvas from "./MapCanvas";
import FloorSelector from "../Components/FloorSelector";
import styles from "../../scss/indoorMap.module.scss";
// import styles from "../../scss/indoorMap.module.scss";
import { usePage } from "@inertiajs/react";
import HeaderBar from "@/Pages/Home/Partials/HeaderBar";
import KioskHeader from "@/Pages/Home/Partials/KioskHeader";
import StepsList from "@/Pages/Home/Partials/StepsList";
import TourBanner from "@/Pages/Home/Partials/TourBanner";
import QRModal from "@/Pages/Home/Partials/QRModal";
import HelpModal from "@/Pages/Home/Partials/HelpModal";
// import GraphDebugger from './GraphDebugger'

// All POIs that are not transport nodes (stairs/lift) — used in the grid and search
const GRID_POIS = ALL_POIS.filter((p) => p.category !== "transport");

// ── Feature 2: Study programmes filter ────────────────────────────────────────
// Maps programme ids to metadata; 'all' shows every POI
// ── Feature 3: Surprise facts ────────────────────────────────────────────────
// Fun facts shown as toast messages when the user clicks "Verras me"
const SURPRISE_FACTS = {
    "poi-radio":
        "Wist je dat hier de schoolradio van Mediacollege Amsterdam wordt opgenomen? 🎙️",
    "poi-tv":
        "In deze TV-studio worden echte televisieprogramma's gemaakt door studenten! 📺",
    "poi-pod": "In de podcaststudio kun je straks je eigen podcast opnemen. 🎧",
    "poi-xr":
        "Het XR Lab heeft de nieuwste VR- en AR-apparatuur — probeer het vandaag uit! 🥽",
    "poi-aula":
        "De aula biedt ruimte aan 400 mensen. Veel grote schoolfeesten vinden hier plaats. 🎭",
    "poi-kantine":
        "De kantine serveert elke dag verse broodjes en een dagschotel voor studenten. 🍽️",
    "poi-sd":
        "Software developers bij Mediacollege bouwen apps voor echte klanten. 💻",
    "poi-ga": "Game Artists ontwerpen hier personages en werelden voor games. 🎮",
    "poi-pet":
        "Podium & Evenementen Techniek leert je live shows en festivals te begeleiden. 🎤",
    "poi-mr":
        "Media Redactie studenten produceren content voor echte media-outlets. 📰",
    "poi-post":
        "In de post-productie studio leer je video editing en color grading. 🎞️",
    "poi-id":
        "Immersive Designers creëren ervaringen voor musea, festivals en meer. 🥽",
};

// ── Feature 5: Translations ──────────────────────────────────────────────────
// All UI strings in Dutch ('nl') and English ('en')
const T = {
    nl: {
        vanaf: "Vanaf",
        naar: "Naar",
        locatie: "Locatie",
        zoek: "Zoek locatie…",
        wis: "Wis route",
        kiesLocatie: "Klik op de kaart of kies hieronder een locatie",
        afstand: "afstand",
        minuten: "min",
        meerdereVerd: "meerdere verdiepingen",
        afdrukken: "Afdrukken",
        deelRoute: "Deel route",
        vernieuwen: "🔄 Vernieuwen",
        geenResultaten: "Geen locaties gevonden voor",
        normaal: "Normaal",
        nietBeschikbaar: "Niet beschikbaar",
        vrij: "Vrij",
        bezet: "Bezet",
        gesloten: "Gesloten",
        ikBenEr: "Ik ben er ✓",
        tourVoltooid: "🎉 Tour voltooid!",
        annuleer: "✕ Annuleer",
        stopTour: "Stop",
        van: "van",
        startBij: "Start bij",
        aangekomonBij: "Aangekomen bij",
        loopNaarGang: "Loop naar de gang",
        gabinnen: "Ga binnen",
        neemLift: "Neem de lift naar",
        loopOost: "Loop oostwaarts door de gang",
        loopWest: "Loop westwaarts door de gang",
        slaRouteOp: "💾 Sla route op",
        opgeslagenRoute: "📂 Opgeslagen route",
        geenOpgeslagen: "Geen opgeslagen route",
        verrasMe: "🎲 Verras me",
        programma: "📅 Programma",
        vandaag: "Vandaag op de open dag",
        programme: "Opleiding",
        categories: "Categorie",
        accessBanner: "♿ Toegankelijkheidsmodus actief — routes lopen via de lift",
        liftBeschikbaar: "Lift beschikbaar",
        exitKiosk: "Exit kiosk",
        kioskMode: "Kiosk",
    },
    en: {
        vanaf: "From",
        naar: "To",
        locatie: "Location",
        zoek: "Search location…",
        wis: "Clear route",
        kiesLocatie: "Tap the map or choose a location below",
        afstand: "distance",
        minuten: "min",
        meerdereVerd: "multiple floors",
        afdrukken: "Print",
        deelRoute: "Share route",
        vernieuwen: "🔄 Refresh",
        geenResultaten: "No locations found for",
        normaal: "Normal",
        nietBeschikbaar: "Not available",
        vrij: "Free",
        bezet: "Occupied",
        gesloten: "Closed",
        ikBenEr: "I'm here ✓",
        tourVoltooid: "🎉 Tour complete!",
        annuleer: "✕ Cancel",
        stopTour: "Stop",
        van: "of",
        startBij: "Start at",
        aangekomonBij: "Arrived at",
        loopNaarGang: "Walk to the corridor",
        gabinnen: "Enter",
        neemLift: "Take the elevator to",
        loopOost: "Walk east through the corridor",
        loopWest: "Walk west through the corridor",
        slaRouteOp: "💾 Save route",
        opgeslagenRoute: "📂 Saved route",
        geenOpgeslagen: "No saved route",
        verrasMe: "🎲 Surprise me",
        programma: "📅 Schedule",
        vandaag: "Today at the open day",
        programme: "Programme",
        categories: "Category",
        accessBanner: "♿ Accessibility mode active — routes go via the elevator",
        liftBeschikbaar: "Elevator available",
        exitKiosk: "Exit kiosk",
        kioskMode: "Kiosk",
    },
};

// Maps a route step type to a display emoji icon
// const STEP_ICONS = {
//     start: "📍",
//     walk: "🚶",
//     elevator: "🛗",
//     stairs: "🪜",
//     enter: "🚪",
//     arrive: "✅",
// };

// The two buildings available in the building switcher
// const BUILDINGS = [
//     { id: 0, label: "Gebouw A" },
//     { id: 1, label: "Silver bullet" },
// ];


// ── Guided tour stops (Open dag rondleiding) ──────────────────────────────────
// Each stop has a POI id and a short tip shown in the tour banner.
// The tour routes from stop[n] to stop[n+1] and advances when the user taps "Ik ben er".
const TOUR_STOPS = [
    {
        id: "poi-receptie",
        tip: "Welkom bij Mediacollege Amsterdam! 👋 Start je rondleiding hier bij de receptie — haal hier een sticker en een plattegrond op.",
    },
    {
        id: "poi-kantine",
        tip: "Dit is de kantine, open van 08:00–17:00. 🍽️ Perfect voor een broodje of koffie tussendoor op een open dag.",
    },
    {
        id: "poi-aula",
        tip: "De grote aula — hier vinden presentaties, schoolshows en evenementen plaats. 🎭 Kijk op het programma voor de tijden vandaag.",
    },
    {
        id: "poi-pet",
        tip: "Podium & Evenementen Techniek op de 1e verdieping. 🎤 Hier leer je live shows en festivals technisch te begeleiden.",
    },
    {
        id: "poi-radio",
        tip: "De Radio Studio op de 3e verdieping! 🎙️ Hier worden echte radioprogramma's gemaakt. Misschien hoor je Mediacollege Radio vandaag live.",
    },
];


// ── Main component ────────────────────────────────────────────────────────────
// Root component for the indoor map application — manages all state and renders the full UI
export default function IndoorMap() {    // ── Theme (Feature 1) ────────────────────────────────────────────────────────
    // Initialise dark mode from localStorage; fall back to the OS preference
    const pois = usePage().props.pois; // GAGA
    const categories = usePage().props.categories; // GAGA
    const floors = usePage().props.floors; // GAGA
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("mA-theme");
        if (stored) return stored === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const [selectedPoi, setSelectedPoi] = useState(null);
    // Derive the string token ('light' | 'dark') from the boolean
    const theme = isDark ? "dark" : "light";

    // Apply the theme to <html> and persist it every time it changes
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("mA-theme", theme);
    }, [theme]);

    // Stable callback that flips the dark-mode boolean
    const toggleTheme = useCallback(() => setIsDark((d) => !d), []);

    // ── Feature 5: Language ──────────────────────────────────────────────────────
    // Language state persisted to localStorage; default Dutch
    const [lang, setLang] = useState(
        () => localStorage.getItem("mA-lang") ?? "nl",
    );
    const toggleLang = useCallback(() => {
        setLang((l) => {
            const next = l === "nl" ? "en" : "nl";
            localStorage.setItem("mA-lang", next);
            return next;
        });
    }, []);
    // Shorthand translation helper used throughout the component
    const t = T[lang];

    // ── Feature 7: Kiosk mode ────────────────────────────────────────────────────
    // Initialised from ?kiosk URL param; also toggleable via header button
    const [kioskMode, setKioskMode] = useState(() =>
        new URLSearchParams(window.location.search).has("kiosk"),
    );
    const toggleKiosk = useCallback(() => {
        setKioskMode((prev) => {
            const next = !prev;
            // Sync ?kiosk to the URL
            const params = new URLSearchParams(window.location.search);
            if (next) params.set("kiosk", "");
            else params.delete("kiosk");
            const qs = params.toString();
            window.history.replaceState(
                null,
                "",
                window.location.pathname + (qs ? "?" + qs : ""),
            );
            return next;
        });
    }, []);

    // ── Map state ─────────────────────────────────────────────────────────────────
    // Currently visible floor (0 = begane grond … 3 = derde verdieping)
    const [floor, setFloor] = useState(0);
    // The POI chosen as route start
    const [origin, setOrigin] = useState(null);
    // The POI chosen as route end
    const [destination, setDestination] = useState(null);
    // The computed route object returned by computeRoute()
    const [route, setRoute] = useState(null);
    // Which endpoint the user is currently picking ('from' | 'to' | null)
    const [selectionMode, setSelectionMode] = useState(null);
    // The POI the user is hovering over in the list or on the map
    const [hoveredPoi, setHoveredPoi] = useState(null);
    // Room id to briefly highlight after a POI click
    const [hlRoom, setHlRoom] = useState(null);
    // Current value of the search input
    const [searchQuery, setSearchQuery] = useState("");
    // Which building tab is active (0 = Gebouw A, 1 = Gebouw B)
    const [activeBuilding, setActiveBuilding] = useState(0);
    // Whether the mobile bottom sheet is fully open
    const [sheetOpen, setSheetOpen] = useState(false);
    // Text of the currently visible toast notification (empty = hidden)
    const [toastMsg, setToastMsg] = useState("");
    // Ref holding the setTimeout handle so we can clear it when a new toast fires
    const toastTimer = useRef(null);



    // ── Feature 6: Favorites ──────────────────────────────────────────────────────
    // Array of favourite POI ids, persisted to localStorage
    const [favorites, setFavorites] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("mA-fav") ?? "[]");
        } catch {
            return [];
        }
    });
    // Returns true when the given POI id is in the favourites list
    const isFav = (id) => favorites.includes(id);
    // Adds or removes a POI id from favourites and syncs to localStorage
    const toggleFav = (id) =>
        setFavorites((prev) => {
            const next = prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id];
            localStorage.setItem("mA-fav", JSON.stringify(next));
            return next;
        });

    // Map from room id → status colour used on the SVG map canvas (read from poi data, never overridden)
    // old data here GAGA
    const roomStatuses = useMemo(() => {
        const m = {};
        ALL_POIS.forEach((p) => {
            if (p.roomId) m[p.roomId] = p.status;
        });
        return m;
    }, []);

    // ── Guided tour state ─────────────────────────────────────────────────────────
    // Whether the tour is currently active
    const [tourActive, setTourActive] = useState(false);
    // Index of the current tour stop (0-based)
    const [tourStep, setTourStep] = useState(0);

    // ── QR scan welcome state ─────────────────────────────────────────────────────
    // When the app opens with ?hier=poi-id (room QR scan), show a rich welcome card
    const [scanWelcomePoi, setScanWelcomePoi] = useState(null);

    // ── QR modal state ────────────────────────────────────────────────────────────
    // Whether the QR code print modal is open
    const [showQR, setShowQR] = useState(false);
    // Whether the help / feature-explanation popup is open
    const [showHelp, setShowHelp] = useState(false);

    // ── URL params: read on mount ────────────────────────────────────────────────
    // On first render, read query params and restore state:
    //   ?van=  &naar=  → restore a shared route
    //   ?hier=         → "You are here" — set origin and prompt user to pick destination
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const van = params.get("van")
            ? pois.find((poi) => poi.value === params.get("van")) // ALL_POIS.find((p) => p.id === params.get("van")) GAGA
            : null;
        const naar = params.get("naar")
            ? pois.find((poi) => poi.value === params.get("naar")) // ALL_POIS.find((p) => p.id === params.get("naar")) GAGA
            : null;
        const hier = params.get("hier")
            ? pois.find((poi) => poi.value === params.get("hier")) // ALL_POIS.find((p) => p.id === params.get("hier")) GAGA
            : null;

        if (van) {
            setOrigin(van);
            setFloor(van.floor_id); // van.floor => van.floor_id GAGA
            console.log(van); //GAGA
        }
        if (naar) {
            setDestination(naar);
            setFloor(naar.floor_id); // naar.floor => naar.floor_id GAGA
        }
        if (van && naar) {
            const transport = 'stairs';
            console.log(van); // GAGA
            setRoute(computeRoute(van, naar, { lang, transport })); // id gone GAGA
            setSheetOpen(true);
        }

        // "You are here" QR scan: show the rich welcome overlay; origin is pre-set
        // so the user just has to tap "Kies bestemming" to start routing.
        if (hier && !van && !naar) {
            setOrigin(hier);
            setFloor(hier.floor_id); // hier.floor => hier.floor_id GAGA
            setScanWelcomePoi(hier);   // opens the welcome overlay
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── URL params: update on change ─────────────────────────────────────────────
    // Keep the browser URL in sync whenever origin or destination changes (for sharing)
    // Also preserve ?kiosk if active
    useEffect(() => {
        const params = new URLSearchParams();
        if (origin) params.set("van", origin.value); // origin.id => origin.value GAGA
        if (destination) params.set("naar", destination.value); // destination.id => destination.value GAGA
        if (kioskMode) params.set("kiosk", "");
        const qs = params.toString();
        window.history.replaceState(
            null,
            "",
            window.location.pathname + (qs ? "?" + qs : ""),
        );
    }, [origin, destination, kioskMode]);

    // ── Toast ────────────────────────────────────────────────────────────────────
    // Shows a temporary toast message that disappears after 2.5 seconds
    const showToast = useCallback((msg) => {
        setToastMsg(msg);
        clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToastMsg(""), 2500);
    }, []);

    // Copies the current shareable URL to the clipboard and shows a toast
    const handleShare = useCallback(() => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => showToast("🔗 Link gekopieerd!"))
            .catch(() => showToast("❌ Kopiëren mislukt"));
    }, [showToast]);

    // ── Route ────────────────────────────────────────────────────────────────────
    // Computes and stores a route when both endpoints are known; clears it otherwise
    // Uses stairs by default; elevator only when accessibility mode is on
    const applyRoute = useCallback(
        (o, d) => {
            if (o && d) {
                const transport = 'stairs';
                const result = computeRoute(o, d, { lang, transport }); // o.id, d.id weggehaald GAGA
                console.log("computeRoute:", o.id, "→", d.id, "=", result);
                setRoute(result);
                setSheetOpen(true);
            } else {
                setRoute(null);
                setSheetOpen(false);
            }
        },
        [lang],
    );

    // Handles a POI click from either the map or the list;
    // assigns it as origin or destination depending on the current selection mode
    const handlePoiClick = useCallback(
        (poi) => {
            console.log('say no to this'); // GAGA
            if (selectionMode === "from") {
                setOrigin(poi);
                console.log(poi); // GAGA
                setFloor(poi.floor_id); // poi.floor => poi.floor_id GAGA
                applyRoute(poi, destination);
                setSelectionMode(null);
            } else if (selectionMode === "to") {
                setDestination(poi);
                // Cross-floor route: stay on the origin floor so the user sees
                // the path going FROM their position TO the staircase. They switch
                // floors themselves to see the next segment start at the stairs.
                if (!origin || poi.floor_id === origin.floor_id) { // poi.floor => poi.floor_id origin.floor => origin.floor_id GAGA
                    setFloor(poi.floor_id); // poi.floor => poi.floor_id GAGA
                }
                applyRoute(origin, poi);
                setSelectionMode(null);
            } else {
                if (!origin) {
                    setOrigin(poi);
                    setFloor(poi.floor_id); // poi.floor => poi.floor_id GAGA
                    applyRoute(poi, destination);
                    setSelectionMode("to");
                } else {
                    setDestination(poi);
                    // Same floor → follow destination. Cross-floor → stay on origin floor.
                    if (poi.floor_id === origin.floor_id) { // poi.floor => poi.floor_id origin.floor => origin.floor_id GAGA
                        setFloor(poi.floor_id); // poi.floor => poi.floor_id GAGA
                    }
                    applyRoute(origin, poi);
                    setSelectionMode(null);
                }
            }
            setHlRoom(poi.roomId);
            setTimeout(() => setHlRoom(null), 1200);
        },
        [selectionMode, origin, destination, applyRoute],
    );

    // Resets origin, destination, route, and selection mode to their initial state
    const handleClear = () => {
        setOrigin(null);
        setDestination(null);
        setRoute(null);
        setSelectionMode(null);
        setSheetOpen(false);
    };

    // Toggles a selection mode on/off; clicking the active mode deactivates it
    const toggleMode = (mode) =>
        setSelectionMode((m) => (m === mode ? null : mode));

    // ── Guided tour helpers ───────────────────────────────────────────────────────

    // Applies the route for a given tour step index (from stop[i] to stop[i+1])
    const applyTourStep = useCallback(
        (step) => {
            const from = pois.find((poi) => poi.value === TOUR_STOPS[step].id); // ALL_POIS.find((p) => p.id === TOUR_STOPS[step].id); GAGA
            const to =
                step + 1 < TOUR_STOPS.length
                    ? pois.find((poi) => poi.value === TOUR_STOPS[step + 1].id) // ALL_POIS.find((p) => p.id === TOUR_STOPS[step + 1].id) GAGA
                    : null;
            if (from) {
                setOrigin(from);
                setFloor(from.floor_id); //from.floor => from.floor_id GAGA
            }
            if (to) {
                setDestination(to);
                applyRoute(from, to);
            } else {
                setDestination(null);
                setRoute(null);
            } // last stop — clear route
        },
        [applyRoute],
    );

    const startTour = useCallback(() => {
        setTourStep(0);
        setTourActive(true);
        applyTourStep(0);
        showToast("🗺️ Open dag rondleiding gestart!");
    }, [applyTourStep, showToast]);

    // Advances to the next stop, or ends the tour on the final stop
    const nextTourStop = useCallback(() => {
        if (tourStep >= TOUR_STOPS.length - 1) {
            // Last stop reached — end the tour
            setTourActive(false);
            handleClear();
            showToast("🎉 Rondleiding voltooid! Welkom bij Mediacollege Amsterdam.");
        } else {
            const next = tourStep + 1;
            setTourStep(next);
            applyTourStep(next);
        }
    }, [tourStep, applyTourStep, showToast]); // eslint-disable-line react-hooks/exhaustive-deps

    // Cancels the tour and resets everything
    const cancelTour = useCallback(() => {
        setTourActive(false);
        handleClear();
        showToast("Tour geannuleerd");
    }, [showToast]); // eslint-disable-line react-hooks/exhaustive-deps

    // ── Filtered + sorted POIs ───────────────────────────────────────────────────
    const filteredPois = useMemo(() => {
        // let pois = GRID_POIS;
        let gridpois = pois.filter((poi) => poi.category.value !== "transport");  // let pois = GRID_POIS; GAGA


        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            gridpois = gridpois.filter(  // pois GAGA
                (p) =>
                    p.label.toLowerCase().includes(q) ||
                    (p.desc && p.desc.toLowerCase().includes(q)) ||
                    (p.category.value && p.category.value.toLowerCase().includes(q)), // p.category => p.category.value GAGA
            );
        }

        return [...pois].sort((a, b) => {
            const aFav = favorites.includes(a.id);
            const bFav = favorites.includes(b.id);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return a.label.localeCompare(b.label);
        });
    }, [searchQuery, favorites]);

    // Bundle all HeaderBar props to keep JSX tidy
    const headerProps = {
        activeBuilding,
        setActiveBuilding,
        theme,
        toggleTheme,
        tourActive,
        startTour,
        onShowQR: () => setShowQR(true),
        onShowHelp: () => setShowHelp(true),
        lang,
        toggleLang,
        kioskMode,
        toggleKiosk,
        t,
    };

    // ── Main render ───────────────────────────────────────────────────────────────
    return (
        <div
            className={`${styles.app} ${kioskMode ? styles.kioskMode : ""}`}
            data-theme={isDark ? "dark" : "light"}
        >
            {/* ── QR scan welcome overlay ───────────────────────────────────────────
          Shown when visitor opens the app from a room QR code (?hier=poi-id).
          Origin is already set; overlay lets them choose destination or explore. */}
            {scanWelcomePoi && (
                <ScanWelcomeOverlay
                    poi={scanWelcomePoi}
                    t={t}
                    onNavigate={() => {
                        setScanWelcomePoi(null);
                        setSelectionMode("to");
                        showToast(`📍 Je start bij ${scanWelcomePoi.label}. Kies nu je bestemming!`);
                    }}
                    onExplore={() => {
                        setScanWelcomePoi(null);
                    }}
                />
            )}

            {/* Feature 7: kiosk mode swaps the full header for a minimal one */}
            {kioskMode ? (
                <KioskHeader onExit={toggleKiosk} t={t} />
            ) : (
                <HeaderBar {...headerProps} />
            )}

            <main className={styles.main}>
                <div className={`${styles.card} wrapper`}>
                    {/* Map + floor selector */}
                    <div className={styles.mapRow}>
                        <div className={styles.mapWrap}>
                            <MapCanvas
                                floor={floor}
                                pois={pois} //ALL_POIS
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
                            {/* <GraphDebugger floor={floor} /> */}
                        </div>
                        <div className={styles.floorCol}>
                            <FloorSelector floor={floor} onChange={setFloor} />
                        </div>
                    </div>

                    {/* ── Guided tour banner ─────────────────────────────────────────── */}
                    {tourActive && (
                        <TourBanner
                            tourStep={tourStep}
                            onNext={nextTourStop}
                            onCancel={cancelTour}
                        />
                    )}

                    {/* ── "Je bent hier" chip ─────────────────────────────────────────── */}
                    {origin && (
                        <div className={styles.youAreHere}>
                            📍 <strong>Je bent hier:</strong>&nbsp;{origin.label}
                        </div>
                    )}

                    {/* Route inputs */}
                    <div className={styles.routeBox}>
                        <button
                            className={`${styles.routeField} ${selectionMode === "from" ? styles.routeFieldActive : ""}`}
                            onClick={() => toggleMode("from")}
                        >
                            <span className={styles.dotGreen}>●</span>
                            <span className={styles.routeLabel}>{t.vanaf}</span>
                            <span
                                className={`${styles.routeValue} ${origin ? styles.routeValueSet : ""}`}
                            >
                                {origin ? origin.label : t.locatie}
                            </span>
                        </button>
                        <div className={styles.routeDivider} />
                        <button
                            className={`${styles.routeField} ${selectionMode === "to" ? styles.routeFieldActive : ""}`}
                            onClick={() => toggleMode("to")}
                        >
                            <span className={styles.dotPink}>●</span>
                            <span className={styles.routeLabel}>{t.naar}</span>
                            <span
                                className={`${styles.routeValue} ${destination ? styles.routeValueSet : ""}`}
                            >
                                {destination ? destination.label : t.locatie}
                            </span>
                        </button>
                        {(origin || destination) && (
                            <button
                                className={styles.clearBtn}
                                onClick={handleClear}
                                title={t.wis}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {selectionMode && <div className={styles.hint}>{t.kiesLocatie}</div>}

                    {/* Route steps — desktop only */}
                    {route && (
                        <div className={`${styles.stepsBox} ${styles.desktopOnly}`}>
                            <div className={styles.stepsHeader}>
                                <span className={styles.stepsMeta}>
                                    📏 ~{route.totalDistance} m &nbsp;·&nbsp; 🚶 ~
                                    {route.totalMinutes} {t.minuten}
                                    {route.multiFloor && <>&nbsp;·&nbsp;🛗 {t.meerdereVerd}</>}
                                </span>
                                <div style={{ display: "flex", gap: 4 }}>
                                    {/* Feature 7 (print route) */}
                                    <button
                                        className={styles.shareBtn}
                                        onClick={() => window.print()}
                                        title={t.afdrukken}
                                    >
                                        🖨️
                                    </button>
                                    <button
                                        className={styles.shareBtn}
                                        onClick={handleShare}
                                        title={t.deelRoute}
                                    >
                                        🔗
                                    </button>
                                </div>
                            </div>
                            <StepsList route={route} />
                        </div>
                    )}

                    {/* Search bar */}
                    <div className={styles.searchWrap}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            className={styles.searchInput}
                            type="text"
                            placeholder={t.zoek}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                className={styles.searchClear}
                                onClick={() => setSearchQuery("")}
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* POI grid */}
                    {filteredPois.length > 0 ? (
                        <div className={styles.poiBox}>
                            {filteredPois.map((poi) => {
                                const isOrigin = origin?.value === poi.value; // origin?.id => origin?.value, poi.id GAGA
                                const isDest = destination?.value === poi.value; // destination?.id => destination?.value, poi.id GAGA
                                // Mark this POI if it is the current tour stop
                                const isTourStop =
                                    tourActive && TOUR_STOPS[tourStep]?.id === poi.id;
                                return (
                                    <div
                                        key={poi.id}
                                        role="button"
                                        tabIndex={0}
                                        className={`${styles.poiItem} ${isOrigin ? styles.poiFrom : ""} ${isDest ? styles.poiTo : ""} ${isTourStop ? styles.poiTourStop : ""}`}
                                        onClick={() => handlePoiClick(poi)}
                                        onKeyDown={(e) => e.key === "Enter" && handlePoiClick(poi)}
                                    >
                                        <span
                                            className={`${styles.checkBox} ${isOrigin || isDest ? styles.checkActive : ""}`}
                                        />
                                        {/* {
                                            console.log(poi) GAGA
                                        } */} 
                                        <span className={styles.poiName}>
                                            <img src={`/icons/${poi.icon}.webp`} alt="" className={styles.poiIcon} />
                                            {poi.label}
                                        </span>
                                        {isTourStop && (
                                            <span
                                                className={styles.tourStopBadge}
                                                title="Huidige tour stop"
                                            >
                                                📍
                                            </span>
                                        )}
                                        <button
                                            className={`${styles.favBtn} ${isFav(poi.value) ? styles.favActive : ""}`} //poi.id => poi.value GAGA
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFav(poi.value); //poi.id => poi.value GAGA
                                            }}
                                            title={
                                                isFav(poi.value) //poi.id => poi.value GAGA
                                                    ? "Verwijder favoriet"
                                                    : "Voeg toe aan favorieten"
                                            }
                                        >
                                            {isFav(poi.value) ? "⭐" : "☆"} {/*poi.id => poi.value GAGA*/}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            {t.geenResultaten} &ldquo;<strong>{searchQuery}</strong>&rdquo;
                        </div>
                    )}

                    {/* Feature 3: POI detail card */}
                    {selectedPoi && (
                        <div className={styles.detailCard}>
                            <button
                                className={styles.detailClose}
                                onClick={() => setSelectedPoi(null)}
                            >
                                ✕
                            </button>
                            <span className={styles.detailIcon}>{selectedPoi.icon}</span>
                            <div className={styles.detailName}>{selectedPoi.label}</div>
                            {selectedPoi.desc && (
                                <div className={styles.detailDesc}>{selectedPoi.desc}</div>
                            )}

                            <div className={styles.detailMeta}>
                                <span>
                                    {floors.find((f) => f.id === selectedPoi.floor_id)?.label} {/* FLOORS => floors selectedpoi.floor => selectedpoi.floor_id ?.name => ?.label GAGA */}
                                </span>
                            </div>
                            <div className={styles.detailActions}>
                                <button
                                    className={styles.detailAction}
                                    onClick={() => {
                                        setOrigin(selectedPoi);
                                        setFloor(selectedPoi.floor_id); // selectedPoi.floor => selectedPoi.floor_id GAGA
                                        applyRoute(selectedPoi, destination);
                                        setSelectionMode(null);
                                        setSelectedPoi(null);
                                    }}
                                >
                                    📍 Vertrek hier
                                </button>
                                <button
                                    className={styles.detailAction}
                                    onClick={() => {
                                        setDestination(selectedPoi);
                                        setFloor(selectedPoi.floor_id); // selectedPoi.floor => selectedPoi.floor_id GAGA
                                        applyRoute(origin, selectedPoi);
                                        setSelectionMode(null);
                                        setSelectedPoi(null);
                                    }}
                                >
                                    🏁 Navigeer hierheen
                                </button>
                                <button
                                    className={`${styles.detailFav} ${isFav(selectedPoi.value) ? styles.favActive : ""}`} // selectedPoi.id => selectedPoi.value GAGA
                                    onClick={() => toggleFav(selectedPoi.id)}
                                    title={
                                        isFav(selectedPoi.value) // selectedPoi.id => selectedPoi.value GAGA
                                            ? "Verwijder favoriet"
                                            : "Voeg toe aan favorieten"
                                    }
                                >
                                    {isFav(selectedPoi.value) ? "⭐" : "☆"} {/*selectedPoi.id => selectedPoi.value GAGA*/}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Mobile bottom sheet */}
            {route && (
                <div className={`${styles.sheet} ${sheetOpen ? styles.sheetOpen : ""}`}>
                    <div
                        className={styles.sheetHandle}
                        onClick={() => setSheetOpen((o) => !o)}
                    >
                        <div className={styles.sheetHandleBar} />
                        <span className={styles.sheetHandleLabel}>
                            📏 ~{route.totalDistance} m &nbsp;·&nbsp; 🚶 ~{route.totalMinutes}{" "}
                            {t.minuten}
                            {route.multiFloor && <>&nbsp;·&nbsp;🛗</>}
                        </span>
                        <div style={{ display: "flex", gap: 4 }}>
                            {/* Feature 7: Print route (mobile) */}
                            <button
                                className={styles.shareBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.print();
                                }}
                            >
                                🖨️
                            </button>
                            <button
                                className={styles.shareBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleShare();
                                }}
                            >
                                🔗
                            </button>
                        </div>
                    </div>
                    <div className={styles.sheetContent}>
                        <StepsList route={route} />
                    </div>
                </div>
            )}

            {/* Toast */}
            {toastMsg && (
                <div className={`${styles.toast} ${styles.toastVisible}`}>
                    {toastMsg}
                </div>
            )}

            {/* QR Code modal */}
            {showQR && <QRModal onClose={() => setShowQR(false)} />}
            {/* Help / feature explanation popup */}
            {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        </div>
    );
}

