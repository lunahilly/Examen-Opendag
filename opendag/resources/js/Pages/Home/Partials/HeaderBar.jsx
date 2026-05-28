import { useState } from "react";
import styles from "../../../../scss/indoorMap.module.scss";
import { usePage } from "@inertiajs/react";

function HeaderBar({
  activeBuilding,
  setActiveBuilding,
  tourActive,
  startTour,
  onShowQR,
  onShowHelp,
  t,
}) {
    const [menuOpen, setMenuOpen] = useState(false);
    const user = usePage().props.auth.user;

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
        {
            user ? 
                <button
                    className={styles.hToolBtn}
                    onClick={onShowQR}
                    title="QR-codes voor elke ruimte">
                    <span className={styles.hBtnLabel}>QR</span>
                </button>
            : null
        }

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