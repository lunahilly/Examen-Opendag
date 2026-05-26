import { usePage } from "@inertiajs/react";
import styles from "../../../../scss/indoorMap.module.scss";

function ScanWelcomeOverlay({ poi, t, onNavigate, onExplore }) {
    const floors = usePage().props.floors; // GAGA
    console.log(floors); // GAGA
    const floor = floors.find((f) => f.id === poi.floor); // FLOORS => floors GAGA

    // const statusColor =
    //     poi.status === "vrij" ? "scanBadgeGreen"
    //         : poi.status === "bezet" ? "scanBadgeRed"
    //             : poi.status === "gesloten" ? "scanBadgeAmber"
    //                 : ""

    // const statusLabel =
    //     poi.status === "vrij" ? "✅ Vrij"
    //         : poi.status === "bezet" ? "🔴 Bezet"
    //             : poi.status === "gesloten" ? "🔒 Gesloten"
    //                 : ""

    return (
        <div className={styles.scanOverlay} onClick={(e) => {
            if (e.target === e.currentTarget) onExplore()
        }}>
            <div className={styles.scanCard}>

                {/* Pulsing location ring + POI icon */}
                <div className={styles.scanRing}>
                    <div className={styles.scanIcon}>{poi.icon}</div>
                </div>

                {/* "Je bent hier" label */}
                <div className={styles.scanHere}>📍 Je bent hier</div>

                {/* Room name */}
                <div className={styles.scanName}>{poi.label}</div>

                {/* Info badges */}
                <div className={styles.scanBadges}>
                    {floor && (
                        <span className={styles.scanBadge}>
                            {floor.label} {/*floor.name => floor.label GAGA*/}
                        </span>
                    )}
                    {statusLabel && (
                        <span className={`${styles.scanBadge} ${statusColor ? styles[statusColor] : ""}`}>
                            {statusLabel}
                        </span>
                    )}
                    {poi.category && (
                        <span className={styles.scanBadge}>
                            {poi.category.label} {/*poi.category => poi.category.label GAGA*/}
                        </span>
                    )}
                </div>

                {/* Room description */}
                {/* oude code LADY */}
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

export default ScanWelcomeOverlay;