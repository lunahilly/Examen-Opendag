import { useEffect, useState } from "react";
import styles from "../../../../scss/indoorMap.module.scss";

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

export default KioskHeader;