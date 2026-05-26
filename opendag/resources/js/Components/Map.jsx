import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import JSZip from "jszip";
import { QRCodeSVG } from "qrcode.react";
import { ALL_POIS, FLOORS, CATEGORIES } from "../data/building";
import { computeRoute, getPosisieOpRoute } from "../data/campusWayfinding";
import MapCanvas from "./MapCanvas";
import FloorSelector from "../Components/FloorSelector";
import styles from "../../scss/indoorMap.module.scss";
import GraphDebugger from './GraphDebugger'

// All POIs that are not transport nodes (stairs/lift) — used in the grid and search
const GRID_POIS = ALL_POIS.filter((p) => p.category !== "transport");

// ── Feature 2: Study programmes filter ────────────────────────────────────────
// Maps programme ids to metadata; 'all' shows every POI
const PROGRAMMES = [
    { id: "all", label: "Alles", icon: "fa-solid fa-border-all", pois: [] },
    {
        id: "audio",
        label: "Audio & Podcast",
        icon: "fa-solid fa-microphone",
        pois: ["poi-radio", "poi-pod", "poi-av", "poi-pet"],
    },
    {
        id: "video",
        label: "Video & Film",
        icon: "fa-solid fa-film",
        pois: ["poi-tv", "poi-post", "poi-cp"],
    },
    {
        id: "design",
        label: "Design & Media",
        icon: "fa-solid fa-palette",
        pois: ["poi-mv", "poi-mr", "poi-rv", "poi-id", "poi-aam"],
    },
    {
        id: "tech",
        label: "Tech & ICT",
        icon: "fa-solid fa-laptop-code",
        pois: ["poi-sd", "poi-ga", "poi-xr"],
    },
    {
        id: "events",
        label: "Events & Live",
        icon: "fa-solid fa-music",
        pois: ["poi-pet", "poi-aula", "poi-ss"],
    },
];

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
const STEP_ICONS = {
    start: "📍",
    walk: "🚶",
    elevator: "🛗",
    stairs: "🪜",
    enter: "🚪",
    arrive: "✅",
};

// The two buildings available in the building switcher
const BUILDINGS = [
    { id: 0, label: "Gebouw A" },
    { id: 1, label: "Silver bullet" },
];

// Duration of one full demo loop in milliseconds at 1× speed
const DEMO_BASE_DURATION = 14000;

/**
 * Picks two random non-transport POIs that are guaranteed to be on
 * DIFFERENT floors, then builds a stair route between them.
 * Returns { route, originPoi, destPoi } or null.
 *
 * Strategy: group POIs by floor first, pick two distinct floors at random,
 * then pick one random POI from each floor. This is 100 % guaranteed to
 * produce a cross-floor pair — no shuffle-and-hope required.
 */
function pickDemoRoute() {
    // Build a map of floor → [poi, poi, …]
    const byFloor = GRID_POIS.reduce((acc, p) => {
        (acc[p.floor] = acc[p.floor] || []).push(p);
        return acc;
    }, {});

    const floorKeys = Object.keys(byFloor);
    if (floorKeys.length < 2) return null;

    // Pick two distinct floor indices
    const i = Math.floor(Math.random() * floorKeys.length);
    let j = Math.floor(Math.random() * (floorKeys.length - 1));
    if (j >= i) j++; // shift so j never equals i

    const originPool = byFloor[floorKeys[i]];
    const destPool = byFloor[floorKeys[j]];

    // Random POI from each floor
    const originPoi = originPool[Math.floor(Math.random() * originPool.length)];
    const destPoi = destPool[Math.floor(Math.random() * destPool.length)];

    const route = computeRoute(originPoi.id, destPoi.id, { transport: "stairs" });
    return route ? { route, originPoi, destPoi } : null;
}

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

// ── QR Scan Welcome Overlay ───────────────────────────────────────────────────
// Shown when the visitor opens the app by scanning a room QR code (?hier=poi-id).
// Displays a rich "you are here" card and lets them immediately pick a destination.
function ScanWelcomeOverlay({ poi, t, onNavigate, onExplore }) {
    const floor = FLOORS.find((f) => f.id === poi.floor)

    const statusColor =
        poi.status === "vrij" ? "scanBadgeGreen"
            : poi.status === "bezet" ? "scanBadgeRed"
                : poi.status === "gesloten" ? "scanBadgeAmber"
                    : ""

    const statusLabel =
        poi.status === "vrij" ? "✅ Vrij"
            : poi.status === "bezet" ? "🔴 Bezet"
                : poi.status === "gesloten" ? "🔒 Gesloten"
                    : ""

    return (
        <div className={styles.scanOverlay} onClick={(e) => {
            if (e.target === e.currentTarget) onExplore()
        }}>
            <div className={styles.scanCard}>

                {/* Pulsing location ring + POI icon */}
                <div className={styles.scanRing}>
                    <div className={styles.scanIcon}><img src={`/icons/${poi.icon}.webp`} alt="" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /></div>
                </div>

                {/* "Je bent hier" label */}
                <div className={styles.scanHere}>📍 Je bent hier</div>

                {/* Room name */}
                <div className={styles.scanName}>{poi.label}</div>

                {/* Info badges */}
                <div className={styles.scanBadges}>
                    {floor && (
                        <span className={styles.scanBadge}>
                            {floor.name}
                        </span>
                    )}
                    {statusLabel && (
                        <span className={`${styles.scanBadge} ${statusColor ? styles[statusColor] : ""}`}>
                            {statusLabel}
                        </span>
                    )}
                    {poi.category && (
                        <span className={styles.scanBadge}>
                            {poi.category}
                        </span>
                    )}
                </div>

                {/* Room description */}
                {poi.desc && (
                    <div className={styles.scanDesc}>{poi.desc}</div>
                )}

                {/* Primary CTA */}
                <button className={styles.scanCta} onClick={onNavigate}>
                    🗺️ Kies mijn bestemming
                </button>

                {/* Secondary link */}
                <button className={styles.scanExplore} onClick={onExplore}>
                    Verken de kaart zonder route
                </button>
            </div>
        </div>
    )
}

// ── Header ────────────────────────────────────────────────────────────────────
// Two-row header:
//   Top row  — logo | spacer | nav links | settings icons (♿ 🇳🇱 ⊞ 🌙)
//   Sub-bar  — building tabs | spacer | tool buttons (Tour Verras Demo QR Route)
// On mobile the nav links hide and the sub-bar scrolls horizontally.
function HeaderBar({
  activeBuilding,
  setActiveBuilding,
  isDemo,
  startDemo,
  stopDemo,
  demoSpeed,
  setDemoSpeed,
  tourActive,
  startTour,
  onShowQR,
  onShowHelp,
  onSurprise,
  onRestoreRoute,
  accessMode,
  toggleAccessMode,
  t,
}) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className={styles.header}>

            {/* ── Sub-bar: building tabs · tool buttons ──────────────────────── */}
            <div className={`${styles.hSubRow} wrapper`}>

                <div className={styles.hRow}>
                    {/* Settings icon buttons — SVG icons, always visible */}
                    <div className={styles.hIcons}>
                        {/* Accessibility toggle */}
                        <button
                            className={`${styles.hIconBtn} ${accessMode ? styles.hIconBtnOn : ""}`}
                            onClick={toggleAccessMode}
                            title={t.accessBanner}
                        >
                            Rolstoel vriendelijk
                        </button>


                        {/* Help button — opens the feature explanation popup */}
                        <button
                            className={styles.hHelpBtn}
                            onClick={onShowHelp}
                            title="Uitleg over alle knoppen"
                        >
                            {/* <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg> */}
                            Hoe werkt het?
                        </button>
                    </div>
                </div>

        {/* Tool buttons */}
        <div className={styles.hTools}>
          {/* Tour */}
          <button
            className={`${styles.hToolBtn} ${tourActive ? styles.hToolBtnGreen : ""}`}
            onClick={startTour}
            title="Start de open dag rondleiding"
          >
            <span className={styles.hBtnLabel}>Tour</span>
          </button>

          {/* Verras me */}
          <button
            className={styles.hToolBtn}
            onClick={onSurprise}
            title={t.verrasMe}
          >
            <span className={styles.hBtnLabel}>Verras</span>
          </button>

          {/* Demo (toggle + inline speed slider when running) */}
          <button
            className={`${styles.hToolBtn} ${isDemo ? styles.hToolBtnPink : ""}`}
            onClick={isDemo ? stopDemo : startDemo}
          >
            <span className={styles.hBtnLabel}>Demo</span>
          </button>
          {isDemo && (
            <div className={styles.demoSpeed}>
              <span className={styles.demoSpeedLabel}>{demoSpeed}×</span>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={demoSpeed}
                className={styles.demoSlider}
                style={{ "--pct": `${((demoSpeed - 0.5) / 4.5) * 100}%` }}
                onChange={(e) => setDemoSpeed(Number(e.target.value))}
              />
            </div>
          )}

          {/* QR codes */}
          <button
            className={styles.hToolBtn}
            onClick={onShowQR}
            title="QR-codes voor elke ruimte"
          >
            <span className={styles.hBtnLabel}>QR</span>
          </button>

          {/* Saved route */}
          <button
            className={styles.hToolBtn}
            onClick={onRestoreRoute}
            title={t.opgeslagenRoute}
          >
            <span className={styles.hBtnLabel}>Route</span>
          </button>
        </div>
      </div>
    </header>
  );
}

// ── Kiosk header ──────────────────────────────────────────────────────────────
// Minimal header shown when kiosk mode is active: logo on left, clock in center, exit button on right
function KioskHeader({ onExit, t }) {
    const [time, setTime] = useState(() => {
        const now = new Date();
        return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    });
    useEffect(() => {
        const id = setInterval(() => {
            const now = new Date();
            setTime(
                `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`,
            );
        }, 1000);
        return () => clearInterval(id);
    }, []);
    return (
        <header className={styles.kioskHeader}>
            {/* Logo left */}
            <div className={styles.logo}>
                <div className={styles.logoMark}>
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <rect width="34" height="34" rx="7" fill="#e040fb" />
                        <text
                            x="17"
                            y="24"
                            textAnchor="middle"
                            fill="white"
                            fontSize="15"
                            fontWeight="800"
                            fontFamily="'DM Sans', sans-serif"
                            letterSpacing="-0.5"
                        >
                            mA
                        </text>
                    </svg>
                </div>
                <div className={styles.logoWords}>
                    <span className={styles.logoName}>Mediacollege</span>
                    <span className={styles.logoCity}>Amsterdam</span>
                </div>
            </div>
            {/* Clock center */}
            <span className={styles.kioskClock}>{time}</span>
            {/* Exit button right */}
            <button className={styles.kioskExitBtn} onClick={onExit}>
                {t.exitKiosk}
            </button>
        </header>
    );
}

// ── Route steps list ──────────────────────────────────────────────────────────
// Renders an ordered list of navigation steps with icon, connecting line, and text
function StepsList({ route }) {
    return (
        <ol className={styles.stepsList}>
            {route.steps.map((step, i) => (
                <li key={i} className={`${styles.step} ${styles[`step_${step.type}`]}`}>
                    <div className={styles.stepLeft}>
                        <span className={styles.stepIcon}>
                            {STEP_ICONS[step.icon] ?? step.icon}
                        </span>
                        {i < route.steps.length - 1 && <span className={styles.stepLine} />}
                    </div>
                    <span className={styles.stepText}>{step.text}</span>
                </li>
            ))}
        </ol>
    );
}

// ── Tour banner ───────────────────────────────────────────────────────────────
// Shown below the map while a guided tour is active.
// Displays progress dots, stop info, a tip, and the "Ik ben er" / cancel buttons.
function TourBanner({ tourStep, onNext, onCancel }) {
    const stop = TOUR_STOPS[tourStep];
    const poi = ALL_POIS.find((p) => p.id === stop.id);
    const isLast = tourStep === TOUR_STOPS.length - 1;

    return (
        <div className={styles.tourBar}>
            {/* Progress dots */}
            <div className={styles.tourDots}>
                {TOUR_STOPS.map((_, i) => (
                    <span
                        key={i}
                        className={`${styles.tourDot} ${i === tourStep ? styles.tourDotActive : ""} ${i < tourStep ? styles.tourDotDone : ""}`}
                    />
                ))}
            </div>

            {/* Stop counter + POI */}
            <div className={styles.tourStop}>
                <span className={styles.tourStopIcon}>{poi?.icon}</span>
                <div className={styles.tourStopText}>
                    <span className={styles.tourStopCounter}>
                        Stop {tourStep + 1} van {TOUR_STOPS.length}
                    </span>
                    <span className={styles.tourStopName}>{poi?.label}</span>
                </div>
            </div>

            {/* Tip text */}
            <p className={styles.tourTip}>{stop.tip}</p>

            {/* Actions */}
            <div className={styles.tourActions}>
                <button className={styles.tourCancelBtn} onClick={onCancel}>
                    ✕ Annuleer
                </button>
                <button className={styles.tourNextBtn} onClick={onNext}>
                    {isLast ? "🎉 Tour voltooid!" : "Ik ben er ✓"}
                </button>
            </div>
        </div>
    );
}

// ── QR Modal ──────────────────────────────────────────────────────────────────
// Full-screen modal showing a grid of QR codes — one per non-transport POI.
// Each QR encodes ?hier=[poi-id]. "Download alles" bundles every QR into a
// single ZIP file. Clicking one card downloads just that QR as a PNG.
function QRModal({ onClose }) {
    const base = `${window.location.origin}${window.location.pathname}`;
    const qrRefs = useRef({});
    const [downloading, setDownloading] = useState(false);

    // Render one POI's SVG into a labeled PNG Blob
    const renderQRBlob = async (poi) => {
        const svg = qrRefs.current[poi.id];
        if (!svg) return null;

        let svgString = new XMLSerializer().serializeToString(svg);
        svgString = svgString.replace(/currentColor/g, "#000000");

        const svgBlob = new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = svgUrl;
        });

        const SIZE = 1024;
        const PAD = 60;
        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE + 140;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, PAD, PAD, SIZE - 2 * PAD, SIZE - 2 * PAD);
        URL.revokeObjectURL(svgUrl);

        ctx.fillStyle = "#000000";
        ctx.font = "bold 40px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(poi.label, SIZE / 2, SIZE + 60);

        const floor = FLOORS.find((f) => f.id === poi.floor);
        if (floor) {
            ctx.font = "28px sans-serif";
            ctx.fillStyle = "#666666";
            ctx.fillText(floor.name, SIZE / 2, SIZE + 100);
        }

        return new Promise((resolve) =>
            canvas.toBlob((blob) => resolve(blob), "image/png"),
        );
    };

    // Trigger a file download from a Blob
    const triggerDownload = (blob, filename) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = URL.createObjectURL(blob);
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    // Build safe filename from POI label
    const safeName = (poi) =>
        poi.label
            .replace(/[^a-z0-9]+/gi, "-")
            .toLowerCase()
            .replace(/^-|-$/g, "");

    // Single QR download (per card click)
    const downloadOne = async (poi) => {
        const blob = await renderQRBlob(poi);
        if (blob) triggerDownload(blob, `qr-${safeName(poi)}.png`);
    };

    // Bundle all QRs into one ZIP
    const downloadAll = async () => {
        if (downloading) return;
        setDownloading(true);

        const zip = new JSZip();
        const folder = zip.folder("qr-codes");

        for (const poi of GRID_POIS) {
            const blob = await renderQRBlob(poi);
            if (blob) folder.file(`qr-${safeName(poi)}.png`, blob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        triggerDownload(zipBlob, "Ma-OpenDag-QR-codes.zip");
        setDownloading(false);
    };

    return (
        <div
            className={styles.qrOverlay}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className={styles.qrModal}>
                {/* Header */}
                <div className={styles.qrModalHeader}>
                    <div>
                        <div className={styles.qrModalTitle}>📱 QR-codes per ruimte</div>
                        <div className={styles.qrModalSub}>
                            Download alle QR-codes als ZIP en plak ze op de deur van elke
                            ruimte. Bezoekers scannen de code en de kaart opent automatisch
                            met die ruimte als startpunt. Klik op één code voor losse
                            download.
                        </div>
                    </div>
                    <div className={styles.qrModalActions}>
                        <button
                            className={styles.qrPrintBtn}
                            onClick={downloadAll}
                            disabled={downloading}
                        >
                            {downloading ? "⏳ Bezig…" : "⬇️ Download alles (ZIP)"}
                        </button>
                        <button className={styles.qrCloseBtn} onClick={onClose}>
                            ✕
                        </button>
                    </div>
                </div>

                {/* Grid of QR codes — click any card to download just that one */}
                <div className={styles.qrGrid}>
                    {GRID_POIS.map((poi) => {
                        const url = `${base}?hier=${poi.id}`;
                        const floor = FLOORS.find((f) => f.id === poi.floor);
                        return (
                            <div
                                key={poi.id}
                                className={styles.qrItem}
                                onClick={() => downloadOne(poi)}
                                style={{ cursor: "pointer" }}
                                title={`Download QR voor ${poi.label}`}
                            >
                                <QRCodeSVG
                                    ref={(el) => {
                                        if (el) qrRefs.current[poi.id] = el;
                                    }}
                                    value={url}
                                    size={130}
                                    bgColor="transparent"
                                    fgColor="currentColor"
                                    level="M"
                                />
                                <span className={styles.qrItemIcon}><img src={`/icons/${poi.icon}.webp`} alt="" style={{ width: 16, height: 16, verticalAlign: 'middle' }} /></span>
                                <span className={styles.qrItemName}>{poi.label}</span>
                                <span className={styles.qrItemFloor}>{floor?.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ── Help Modal ────────────────────────────────────────────────────────────────
// Popup that explains every button and feature in plain language.
// Opened via the ? icon in the header — useful for first-time visitors.
function HelpModal({ onClose }) {
    const items = [
        {
            name: "Route plannen",
            desc: 'Klik op "Vanaf" en "Naar" om een startpunt en bestemming te kiezen. De route wordt op de kaart getekend met stap-voor-stap aanwijzingen.',
        },
        {
            name: "Tour",
            desc: 'Start een begeleide rondleiding langs 5 highlights: Receptie → Kantine → Aula → Podium & Events → Radio Studio. Druk op "Ik ben er" om naar de volgende stop te gaan.',
        },
        {
            name: "Verras me",
            desc: "Kiest een willekeurige ruimte en toont de route ernaartoe, inclusief een leuk weetje over die plek.",
        },
        {
            name: "Demo",
            desc: "Speelt een geanimeerde demo af van een loper die een route volgt. Gebruik de schuifregelaar om de snelheid aan te passen.",
        },
        {
            name: "QR-codes",
            desc: "Genereert een QR-code voor elke ruimte. Print ze uit en plak ze op de deur. Bezoekers scannen de code en de kaart opent met die ruimte als startpunt.",
        },
        {
            name: "Opgeslagen route",
            desc: "Laadt een eerder opgeslagen route — handig als je geen wifi hebt in het gebouw.",
        },
        {
            name: "Rolstoel vriendelijk",
            desc: "Routes lopen alleen via de lift (geen trappen). Ruimtes met liftacces worden extra gemarkeerd op de kaart.",
        },
    ];

    return createPortal(
        <div
            className="modal-overlay"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="help-modal">
                <div className="help-modal__header">
                    <div>
                        <div className="help-modal__title">Uitleg & functies</div>
                        <div className="help-modal__subtitle">Een overzicht van alle knoppen en wat ze doen.</div>
                    </div>
                    <button className="help-modal__close-btn" onClick={onClose}>
                        ✕
                    </button>
                </div>
                <div className="help-modal__list">
                    {items.map((item, i) => (
                        <div key={i} className="help-modal__item">
                            <div className="help-modal__item-name">{item.name}</div>
                            <div className="help-modal__item-desc">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
}

// ── Main component ────────────────────────────────────────────────────────────
// Root component for the indoor map application — manages all state and renders the full UI
export default function IndoorMap() {    // ── Theme (Feature 1) ────────────────────────────────────────────────────────
    // Initialise dark mode from localStorage; fall back to the OS preference
    const [isDark, setIsDark] = useState(() => {
        const stored = localStorage.getItem("mA-theme");
        if (stored) return stored === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

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

    // ── Feature 4: Accessibility mode ────────────────────────────────────────────
    // Persisted to localStorage; when true adds bigger text and elevator highlights
    const [accessMode, setAccessMode] = useState(
        () => localStorage.getItem("mA-access") === "true",
    );
    const toggleAccessMode = useCallback(() => {
        setAccessMode((prev) => {
            const next = !prev;
            localStorage.setItem("mA-access", String(next));
            return next;
        });
    }, []);

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

    // ── Feature 2: Category filter ───────────────────────────────────────────────
    // The currently selected category tab ('all' or a category id)
    const [activeCategory, setActiveCategory] = useState("all");

    // ── Feature 2 (new): Programme filter ───────────────────────────────────────
    // The currently selected programme ('all' or a programme id)
    const [activeProgram, setActiveProgram] = useState("all");


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

    // ── Demo animation ────────────────────────────────────────────────────────────
    // Whether the automated demo walk is currently running
    const [isDemo, setIsDemo] = useState(false);
    // Current interpolated position { x, y, floor } of the demo walker dot
    const [walkerPos, setWalkerPos] = useState(null);
    // Playback speed multiplier (0.5 – 5)
    const [demoSpeed, setDemoSpeed] = useState(1);
    // Handle for the active requestAnimationFrame call
    const rafRef = useRef(null);
    // timestamp of previous frame
    const lastTsRef = useRef(null);
    // 0–1, accumulates every frame
    const progressRef = useRef(0);
    // mirror of demoSpeed — readable inside rAF without restarting it
    const demoSpeedRef = useRef(1);
    // Holds the currently-playing demo pack { route, originPoi, destPoi }.
    // Stored in a ref so the rAF loop can swap it without triggering a re-render.
    const demoPackRef = useRef(null);

    // Keep the speed ref in sync with state (runs on every render, no extra effect needed)
    demoSpeedRef.current = demoSpeed;

    // Map from room id → status colour used on the SVG map canvas (read from poi data, never overridden)
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
            ? ALL_POIS.find((p) => p.id === params.get("van"))
            : null;
        const naar = params.get("naar")
            ? ALL_POIS.find((p) => p.id === params.get("naar"))
            : null;
        const hier = params.get("hier")
            ? ALL_POIS.find((p) => p.id === params.get("hier"))
            : null;

        if (van) {
            setOrigin(van);
            setFloor(van.floor);
        }
        if (naar) {
            setDestination(naar);
            setFloor(naar.floor);
        }
        if (van && naar) {
            const transport = accessMode ? 'elevator' : 'stairs';
            setRoute(computeRoute(van.id, naar.id, { lang, transport }));
            setSheetOpen(true);
        }

        // "You are here" QR scan: show the rich welcome overlay; origin is pre-set
        // so the user just has to tap "Kies bestemming" to start routing.
        if (hier && !van && !naar) {
            setOrigin(hier);
            setFloor(hier.floor);
            setScanWelcomePoi(hier);   // opens the welcome overlay
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── URL params: update on change ─────────────────────────────────────────────
    // Keep the browser URL in sync whenever origin or destination changes (for sharing)
    // Also preserve ?kiosk if active
    useEffect(() => {
        const params = new URLSearchParams();
        if (origin) params.set("van", origin.id);
        if (destination) params.set("naar", destination.id);
        if (kioskMode) params.set("kiosk", "");
        const qs = params.toString();
        window.history.replaceState(
            null,
            "",
            window.location.pathname + (qs ? "?" + qs : ""),
        );
    }, [origin, destination, kioskMode]);

    // ── Demo animation loop ──────────────────────────────────────────────────────
    // Speed is read from demoSpeedRef so the slider never restarts the loop.
    // A new random route is picked on every loop completion so the demo never
    // shows the same path twice in a row.
    useEffect(() => {
        if (!isDemo) {
            setWalkerPos(null);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            return;
        }

        // Push a demo pack (route + POIs) to the visible map state
        const applyPack = (pack) => {
            if (!pack) return;
            setOrigin(pack.originPoi);
            setDestination(pack.destPoi);
            setRoute(pack.route);
            setFloor(pack.originPoi.floor);
        };

        applyPack(demoPackRef.current);
        progressRef.current = 0;
        lastTsRef.current = null;

        function tick(ts) {
            const dt = lastTsRef.current ? ts - lastTsRef.current : 0;
            lastTsRef.current = ts;
            const duration = DEMO_BASE_DURATION / demoSpeedRef.current;
            progressRef.current += dt / duration;

            // Loop finished — swap in a fresh random route and restart progress
            if (progressRef.current >= 1) {
                progressRef.current = 0;
                lastTsRef.current = null;
                const next = pickDemoRoute();
                if (next) {
                    demoPackRef.current = next;
                    applyPack(next);
                }
                rafRef.current = requestAnimationFrame(tick);
                return;
            }

            const pack = demoPackRef.current;
            if (pack) {
                const pos = getPosisieOpRoute(pack.route.waypoints, progressRef.current);
                if (pos) {
                    setWalkerPos(pos);
                    setFloor(pos.floor);
                }
            }
            rafRef.current = requestAnimationFrame(tick);
        }

        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lastTsRef.current = null;
        };
    }, [isDemo]); // demoSpeed intentionally omitted — ref handles it without restart

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
                const transport = accessMode ? 'elevator' : 'stairs';
                const result = computeRoute(o.id, d.id, { lang, transport });
                console.log("computeRoute:", o.id, "→", d.id, "=", result);
                setRoute(result);
                setSheetOpen(true);
            } else {
                setRoute(null);
                setSheetOpen(false);
            }
        },
        [lang, accessMode],
    );

    // Handles a POI click from either the map or the list;
    // assigns it as origin or destination depending on the current selection mode
    const handlePoiClick = useCallback(
        (poi) => {
            if (selectionMode === "from") {
                setOrigin(poi);
                setFloor(poi.floor);
                applyRoute(poi, destination);
                setSelectionMode(null);
            } else if (selectionMode === "to") {
                setDestination(poi);
                // Cross-floor route: stay on the origin floor so the user sees
                // the path going FROM their position TO the staircase. They switch
                // floors themselves to see the next segment start at the stairs.
                if (!origin || poi.floor === origin.floor) {
                    setFloor(poi.floor);
                }
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
                    // Same floor → follow destination. Cross-floor → stay on origin floor.
                    if (poi.floor === origin.floor) {
                        setFloor(poi.floor);
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

    // ── Demo helpers ─────────────────────────────────────────────────────────────
    // Picks a fresh random route and starts the animation
    const startDemo = useCallback(() => {
        const pack = pickDemoRoute();
        if (!pack) return; // safety — shouldn't happen with real POI data
        demoPackRef.current = pack;
        setIsDemo(true);
    }, []);
    // Stops the animation and clears the walker dot
    const stopDemo = useCallback(() => {
        setIsDemo(false);
        setWalkerPos(null);
    }, []);

    // ── Guided tour helpers ───────────────────────────────────────────────────────

    // Applies the route for a given tour step index (from stop[i] to stop[i+1])
    const applyTourStep = useCallback(
        (step) => {
            const from = ALL_POIS.find((p) => p.id === TOUR_STOPS[step].id);
            const to =
                step + 1 < TOUR_STOPS.length
                    ? ALL_POIS.find((p) => p.id === TOUR_STOPS[step + 1].id)
                    : null;
            if (from) {
                setOrigin(from);
                setFloor(from.floor);
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

    // Starts the guided tour from step 0, cancelling any active demo
    const startTour = useCallback(() => {
        setIsDemo(false);
        setWalkerPos(null);
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

    // ── Feature 3 (new): Surprise me ─────────────────────────────────────────────
    // Picks a random POI, sets it as destination, computes route, shows fun fact toast
    const handleSurprise = useCallback(() => {
        const available = GRID_POIS.filter(
            (p) => p.id !== origin?.id && p.id !== destination?.id,
        );
        if (available.length === 0) return;
        const pick = available[Math.floor(Math.random() * available.length)];
        // Pick a random origin if none is set
        const o = origin ?? GRID_POIS.find((p) => p.id !== pick.id);
        setDestination(pick);
        setFloor(pick.floor);
        if (o) {
            setOrigin(o);
            applyRoute(o, pick);
        }
        const fact = SURPRISE_FACTS[pick.id];
        showToast(fact ? fact : `${t.verrasMe}: ${pick.label}`);
    }, [origin, destination, applyRoute, showToast, t]);

    // ── Feature 6 (new): Save / restore route ────────────────────────────────────
    // Saves the current origin + destination to localStorage
    const handleSaveRoute = useCallback(() => {
        if (!origin || !destination) return;
        localStorage.setItem(
            "mA-saved-route",
            JSON.stringify({ originId: origin.id, destId: destination.id }),
        );
        showToast(t.slaRouteOp + " ✓");
    }, [origin, destination, showToast, t]);

    // Reads saved route from localStorage and restores it
    const handleRestoreRoute = useCallback(() => {
        try {
            const saved = JSON.parse(localStorage.getItem("mA-saved-route"));
            if (!saved) {
                showToast(t.geenOpgeslagen);
                return;
            }
            const o = ALL_POIS.find((p) => p.id === saved.originId);
            const d = ALL_POIS.find((p) => p.id === saved.destId);
            if (o && d) {
                setOrigin(o);
                setDestination(d);
                setFloor(o.floor);
                const transport = accessMode ? 'elevator' : 'stairs';
                setRoute(computeRoute(o.id, d.id, { lang, transport }));
                setSheetOpen(true);
                showToast(t.opgeslagenRoute + " geladen");
            } else {
                showToast(t.geenOpgeslagen);
            }
        } catch {
            showToast(t.geenOpgeslagen);
        }
    }, [showToast, t, lang, accessMode]);

    // ── Feature 2+6: Filtered + sorted POIs ─────────────────────────────────────
    // Derives the visible POI list from search query, active category, programme, and favourites
    const filteredPois = useMemo(() => {
        let pois = GRID_POIS;

        // Programme filter (new Feature 2 — study programme)
        if (activeProgram !== "all") {
            const prog = PROGRAMMES.find((p) => p.id === activeProgram);
            if (prog) pois = pois.filter((p) => prog.pois.includes(p.id));
        }

        // Category filter
        if (activeCategory !== "all") {
            pois = pois.filter((p) => p.category === activeCategory);
        }

        // Search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            pois = pois.filter(
                (p) =>
                    p.label.toLowerCase().includes(q) ||
                    (p.desc && p.desc.toLowerCase().includes(q)) ||
                    (p.category && p.category.toLowerCase().includes(q)),
            );
        }

        // Sort: favorites first, then alphabetical
        pois = [...pois].sort((a, b) => {
            const aFav = favorites.includes(a.id);
            const bFav = favorites.includes(b.id);
            if (aFav && !bFav) return -1;
            if (!aFav && bFav) return 1;
            return a.label.localeCompare(b.label);
        });

        return pois;
    }, [searchQuery, activeCategory, activeProgram, favorites]);

    // IDs to highlight on the map when a programme is selected (amber glow)
    const highlightPoiIds = useMemo(() => {
        if (activeProgram === "all") return [];
        return PROGRAMMES.find((p) => p.id === activeProgram)?.pois ?? [];
    }, [activeProgram]);

    // ── Category tabs (exclude transport) ────────────────────────────────────────
    // Transport POIs are only shown on the map, not in the category tab strip
    const gridCategories = CATEGORIES.filter((c) => c.id !== "transport");

    // Bundle all HeaderBar props to keep JSX tidy
    const headerProps = {
        activeBuilding,
        setActiveBuilding,
        theme,
        toggleTheme,
        isDemo,
        startDemo,
        stopDemo,
        demoSpeed,
        setDemoSpeed,
        tourActive,
        startTour,
        onShowQR: () => setShowQR(true),
        onShowHelp: () => setShowHelp(true),
        onSurprise: handleSurprise,
        onRestoreRoute: handleRestoreRoute,
        accessMode,
        toggleAccessMode,
        lang,
        toggleLang,
        kioskMode,
        toggleKiosk,
        t,
    };

    // ── Main render ───────────────────────────────────────────────────────────────
    return (
        <div
            className={`${styles.app} ${accessMode ? styles.accessMode : ""} ${kioskMode ? styles.kioskMode : ""}`}
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

            {/* Feature 4: accessibility banner shown below header when accessMode is on */}
            {accessMode && (
                <div className={styles.accessBanner}>{t.accessBanner}</div>
            )}

            <main className={styles.main}>
                <div className={`${styles.card} wrapper`}>
                    {/* Map + floor selector */}
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
                                walkerPos={walkerPos}
                                highlightPoiIds={highlightPoiIds}
                                accessMode={accessMode}
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
                                    {/* Feature 6 (new): Save route button */}
                                    <button
                                        className={styles.shareBtn}
                                        onClick={handleSaveRoute}
                                        title={t.slaRouteOp}
                                    >
                                        💾
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

                    {/* Feature 2 (new): Programme tabs ABOVE category tabs */}
                    <div className={styles.progTabsRow}>
                        <span className={styles.tabsLabel}>{t.programme}</span>
                        <div className={styles.progTabs}>
                            {PROGRAMMES.map((prog) => (
                                <button
                                    key={prog.id}
                                    className={`${styles.progTab} ${activeProgram === prog.id ? styles.progTabActive : ""}`}
                                    onClick={() => setActiveProgram(prog.id)}
                                >
                                    <i className={prog.icon} /> {prog.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feature 2: Category tabs */}
                    <div className={styles.catTabsRow}>
                        <span className={styles.tabsLabel}>{t.categories}</span>
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
                    </div>

                    {/* POI grid */}
                    {filteredPois.length > 0 ? (
                        <div className={styles.poiBox}>
                            {filteredPois.map((poi) => {
                                const isOrigin = origin?.id === poi.id;
                                const isDest = destination?.id === poi.id;
                                // Mark this POI if it is the current tour stop
                                const isTourStop =
                                    tourActive && TOUR_STOPS[tourStep]?.id === poi.id;
                                // Is this a lift POI in access mode?
                                const isLift =
                                    accessMode &&
                                    poi.category === "transport" &&
                                    poi.label.toLowerCase().includes("lift");
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
                                        {isLift && (
                                            <span className={styles.accessNote}>
                                                {t.liftBeschikbaar}
                                            </span>
                                        )}
                                        <button
                                            className={`${styles.favBtn} ${isFav(poi.id) ? styles.favActive : ""}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFav(poi.id);
                                            }}
                                            title={
                                                isFav(poi.id)
                                                    ? "Verwijder favoriet"
                                                    : "Voeg toe aan favorieten"
                                            }
                                        >
                                            {isFav(poi.id) ? "⭐" : "☆"}
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
                            {/* Feature 6 (new): Save route (mobile) */}
                            <button
                                className={styles.shareBtn}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveRoute();
                                }}
                            >
                                💾
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