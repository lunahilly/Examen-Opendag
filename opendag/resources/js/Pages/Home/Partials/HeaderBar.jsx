import { useState } from "react";
import styles from "../../../../scss/indoorMap.module.scss";
import { usePage } from "@inertiajs/react";

// function HeaderBar({
//     activeBuilding,
//     setActiveBuilding,
//     theme,
//     toggleTheme,
//     isDemo,
//     startDemo,
//     stopDemo,
//     demoSpeed,
//     setDemoSpeed,
//     tourActive,
//     startTour,
//     onShowQR,
//     onShowHelp,
//     onSurprise,
//     onRestoreRoute,
//     accessMode,
//     toggleAccessMode,
//     lang,
//     toggleLang,
//     kioskMode,
//     toggleKiosk,
//     t,
// }) {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const buildings = usePage().props.buildings; // GAGA

//     return (
//         <header className={styles.header}>

//             {/* ── Sub-bar: building tabs · tool buttons ──────────────────────── */}
//             <div className={`${styles.hSubRow} wrapper`}>
//                 {/* Building switcher */}
//                 <div className={styles.buildingBar}>
//                     {buildings.map((b) => (
//                         <button
//                             key={b.id}
//                             className={`${styles.buildingBtn} ${activeBuilding === b.id ? styles.buildingBtnActive : ""}`}
//                             onClick={() => setActiveBuilding(b.id)}
//                         >
//                             {b.label}
//                         </button>
//                     ))}
//                 </div>

//                 <div className={styles.hRow}>
//                     {/* Settings icon buttons — SVG icons, always visible */}
//                     <div className={styles.hIcons}>
//                         {/* Accessibility toggle */}
//                         <button
//                             className={`${styles.hIconBtn} ${accessMode ? styles.hIconBtnOn : ""}`}
//                             onClick={toggleAccessMode}
//                             title={t.accessBanner}
//                         >
//                             {/* <svg
//               width="15"
//               height="15"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="4" r="2" />
//               <path d="M12 9v5M9 21l1.5-5M15 21l-1.5-5" />
//               <path d="M7 12l5-3 5 3" />
//             </svg> */}
//                             Rolstoel vriendelijk
//                         </button>

//                         {/* Language toggle — clean text pill */}
//                         <button
//                             className={styles.hLangBtn}
//                             onClick={toggleLang}
//                             title={
//                                 lang === "nl" ? "Switch to English" : "Schakel naar Nederlands"
//                             }
//                         >
//                             {lang === "nl" ? "NL" : "EN"}
//                         </button>

//                         {/* Kiosk mode */}
//                         {!kioskMode && (
//                             <button
//                                 className={styles.hIconBtn}
//                                 onClick={toggleKiosk}
//                                 title={t.kioskMode}
//                             >
//                                 {/* <svg
//                 width="14"
//                 height="14"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//               >
//                 <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M16 21h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
//               </svg> */}
//                                 Fullscreen
//                             </button>
//                         )}

//                         {/* Theme toggle — sun / moon SVG */}
//                         <button
//                             className={styles.hIconBtn}
//                             onClick={toggleTheme}
//                             title={theme === "light" ? "Donkere modus" : "Lichte modus"}
//                         >
//                             {theme === "light" ? (
//                                 <svg
//                                     width="15"
//                                     height="15"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                 >
//                                     <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
//                                 </svg>

//                             ) : (
//                                 <svg
//                                     width="15"
//                                     height="15"
//                                     viewBox="0 0 24 24"
//                                     fill="none"
//                                     stroke="currentColor"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                 >
//                                     <circle cx="12" cy="12" r="5" />
//                                     <line x1="12" y1="1" x2="12" y2="3" />
//                                     <line x1="12" y1="21" x2="12" y2="23" />
//                                     <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
//                                     <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
//                                     <line x1="1" y1="12" x2="3" y2="12" />
//                                     <line x1="21" y1="12" x2="23" y2="12" />
//                                     <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
//                                     <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
//                                 </svg>
//                             )}
//                         </button>

//                         {/* Help button — opens the feature explanation popup */}
//                         <button
//                             className={styles.hHelpBtn}
//                             onClick={onShowHelp}
//                             title="Uitleg over alle knoppen"
//                         >
//                             {/* <svg
//               width="14"
//               height="14"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2.5"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="12" cy="12" r="10" />
//               <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
//               <line x1="12" y1="17" x2="12.01" y2="17" />
//             </svg> */}
//                             Hoe werkt het?
//                         </button>
//                     </div>
//                 </div>

//                 {/* Tool buttons */}
//                 <div className={styles.hTools}>
//                     {/* Tour */}
//                     <button
//                         className={`${styles.hToolBtn} ${tourActive ? styles.hToolBtnGreen : ""}`}
//                         onClick={startTour}
//                         title="Start de open dag rondleiding"
//                     >
//                         🗺️ <span className={styles.hBtnLabel}>Tour</span>
//                     </button>

//                     {/* Verras me */}
//                     <button
//                         className={styles.hToolBtn}
//                         onClick={onSurprise}
//                         title={t.verrasMe}
//                     >
//                         🎲 <span className={styles.hBtnLabel}>Verras</span>
//                     </button>

//                     {/* Demo (toggle + inline speed slider when running) */}
//                     <button
//                         className={`${styles.hToolBtn} ${isDemo ? styles.hToolBtnPink : ""}`}
//                         onClick={isDemo ? stopDemo : startDemo}
//                     >
//                         {isDemo ? "⏹" : "▶"} <span className={styles.hBtnLabel}>Demo</span>
//                     </button>
//                     {isDemo && (
//                         <div className={styles.demoSpeed}>
//                             <span className={styles.demoSpeedLabel}>{demoSpeed}×</span>
//                             <input
//                                 type="range"
//                                 min="0.5"
//                                 max="5"
//                                 step="0.5"
//                                 value={demoSpeed}
//                                 className={styles.demoSlider}
//                                 style={{ "--pct": `${((demoSpeed - 0.5) / 4.5) * 100}%` }}
//                                 onChange={(e) => setDemoSpeed(Number(e.target.value))}
//                             />
//                         </div>
//                     )}

//                     {/* QR codes */}
//                     <button
//                         className={styles.hToolBtn}
//                         onClick={onShowQR}
//                         title="QR-codes voor elke ruimte"
//                     >
//                         📱 <span className={styles.hBtnLabel}>QR</span>
//                     </button>

//                     {/* Saved route */}
//                     <button
//                         className={styles.hToolBtn}
//                         onClick={onRestoreRoute}
//                         title={t.opgeslagenRoute}
//                     >
//                         📂 <span className={styles.hBtnLabel}>Route</span>
//                     </button>
//                 </div>
//             </div>
//         </header>
//     );
// }

function HeaderBar({
  activeBuilding,
  setActiveBuilding,
  tourActive,
  startTour,
  onShowQR,
  onShowHelp,
  t,
}) {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header className={styles.header}>

            {/* ── Sub-bar: building tabs · tool buttons ──────────────────────── */}
            <div className={`${styles.hSubRow} wrapper`}>

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

          {/* QR codes */}
          <button
            className={styles.hToolBtn}
            onClick={onShowQR}
            title="QR-codes voor elke ruimte"
          >
            <span className={styles.hBtnLabel}>QR</span>
          </button>

          {/* Help */}
          <button
            className={styles.hToolBtn}
            onClick={onShowHelp}
            title="Uitleg over alle knoppen"
          >
            <span className={styles.hBtnLabel}>Hoe werkt het?</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;