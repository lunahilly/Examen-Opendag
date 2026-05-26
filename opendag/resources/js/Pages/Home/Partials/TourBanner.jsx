import { usePage } from "@inertiajs/react";
import styles from "../../../../scss/indoorMap.module.scss";

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

function TourBanner({ tourStep, onNext, onCancel }) {
    const stop = TOUR_STOPS[tourStep];
    // const poi = ALL_POIS.find((p) => p.id === stop.id);
    const poi = usePage().props.pois.find((poi) => poi.value === stop.id); // GAGA
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

export default TourBanner; 