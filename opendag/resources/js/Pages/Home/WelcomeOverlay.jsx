import { usePage } from "@inertiajs/react";
import styles from "../../../scss/indoorMap.module.scss";

function ScanWelcomeOverlay({ poi, onNavigate, onExplore }) {
    const floors = usePage().props.floors;
    const floor = floors.find((f) => f.id === poi.floor_id);

    // const statusColor =
    //     poi.status === "vrij" ? "scanBadgeGreen"
    //         : poi.status === "bezet" ? "scanBadgeRed"
    //             : poi.status === "gesloten" ? "scanBadgeAmber"
    //                 : "";

    // const statusLabel =
    //     poi.status === "vrij" ? "✅ Vrij"
    //         : poi.status === "bezet" ? "🔴 Bezet"
    //             : poi.status === "gesloten" ? "🔒 Gesloten"
    //                 : "";

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
                    {floor && <span className={styles.scanBadge}>{floor.label}</span>}
                    {statusLabel && (
                        <span className={`${styles.scanBadge} ${statusColor ? styles[statusColor] : ""}`}>
                            {statusLabel}
                        </span>
                    )}
                    {poi.category.name && <span className={styles.scanBadge}>{poi.category.name}</span>}
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


export default ScanWelcomeOverlay;