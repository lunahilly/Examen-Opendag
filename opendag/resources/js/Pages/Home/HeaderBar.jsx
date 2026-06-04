import { usePage } from "@inertiajs/react";
import styles from "../../../scss/indoorMap.module.scss";

function HeaderBar({ onShowQR }) {
    const user = usePage().props.auth.user;
    return user ? (
        <header className={styles.header}>
            <div className={`${styles.hSubRow} wrapper`}>
                <div className={styles.hTools}>
                    <button
                        className={styles.hToolBtn}
                        onClick={onShowQR}
                        title="QR-codes voor elke ruimte"
                    >
                        <span className={styles.hBtnLabel}>QR</span>
                    </button>
                </div>
            </div>
        </header>
    ) : null ;
}

export default HeaderBar;