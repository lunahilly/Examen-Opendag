import styles from "../../../../scss/indoorMap.module.scss";

function StepsList({ route }) {
    const STEP_ICONS = {
        start: "📍",
        walk: "🚶",
        elevator: "🛗",
        stairs: "🪜",
        enter: "🚪",
        arrive: "✅",
    };
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

export default StepsList;