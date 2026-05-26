import styles from "../../../../scss/indoorMap.module.scss";

function HelpModal({ onClose, lang }) {
    const isNl = lang === "nl";

    // Each entry: icon (JSX), name, description
    const items = [
        {
            icon: (
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
            ),
            name: isNl ? "Route plannen" : "Plan a route",
            desc: isNl
                ? 'Klik op "Vanaf" en "Naar" om een startpunt en bestemming te kiezen. De route wordt dan op de kaart getekend met stap-voor-stap aanwijzingen.'
                : 'Click "From" and "To" to pick a start and destination. The route is drawn on the map with step-by-step directions.',
        },
        {
            icon: "🗺️",
            name: isNl
                ? "Tour — open dag rondleiding"
                : "Tour — guided open day walk",
            desc: isNl
                ? 'Start een begeleide rondleiding langs 5 highlights van de school: Receptie → Kantine → Aula → Podium & Event → Radio Studio. Druk op "Ik ben er" als je aankomt om naar de volgende stop te gaan.'
                : 'Start a guided walk through 5 highlights: Reception → Canteen → Auditorium → Stage & Events → Radio Studio. Press "I\'m here" on arrival to move to the next stop.',
        },
        {
            icon: "🎲",
            name: isNl ? "Verras me" : "Surprise me",
            desc: isNl
                ? "Kiest een willekeurige interessante ruimte en toont de route ernaartoe, inclusief een leuk weetje over die plek."
                : "Picks a random interesting room and shows you the route there, with a fun fact about that space.",
        },
        {
            icon: "▶",
            name: isNl ? "Demo" : "Demo",
            desc: isNl
                ? "Speelt een geanimeerde demo af van een loper die de route van Radio Studio naar de Kantine loopt. Gebruik de schuifregelaar om de snelheid aan te passen."
                : "Plays an animated demo of a walker following the route from Radio Studio to the Canteen. Use the slider to adjust the speed.",
        },
        {
            icon: "📱",
            name: isNl ? "QR-codes" : "QR codes",
            desc: isNl
                ? "Genereert een QR-code voor elke ruimte. Print ze uit en plak ze op de deur. Bezoekers scannen de code en de kaart opent met die ruimte als startpunt."
                : "Generates a QR code for every room. Print them out and stick them on the door. Visitors scan the code and the map opens with that room as the starting point.",
        },
        {
            icon: "📂",
            name: isNl ? "Opgeslagen route laden" : "Load saved route",
            desc: isNl
                ? "Laadt een eerder opgeslagen route. Sla een route op via het 💾 icoontje in de routebeschrijving — handig als je geen wifi hebt in het gebouw."
                : "Loads a previously saved route. Save a route via the 💾 icon in the directions — useful when you have no WiFi inside the building.",
        },
        {
            icon: (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="4" r="2" />
                    <path d="M12 9v5M9 21l1.5-5M15 21l-1.5-5" />
                    <path d="M7 12l5-3 5 3" />
                </svg>
            ),
            name: isNl ? "Toegankelijkheidsmodus" : "Accessibility mode",
            desc: isNl
                ? "Routes lopen alleen via de lift (geen trappen). Ruimtes met liftacces worden extra gemarkeerd op de kaart."
                : "Routes only use the elevator (no stairs). Rooms with elevator access are highlighted extra on the map.",
        },
        {
            icon: (
                <span
                    style={{
                        fontFamily: "'Space Mono', monospace",
                        fontWeight: 700,
                        fontSize: "0.75em",
                        letterSpacing: "0.06em",
                    }}
                >
                    NL/EN
                </span>
            ),
            name: isNl ? "Taal wisselen" : "Switch language",
            desc: isNl
                ? "Schakelt de volledige interface over tussen Nederlands en Engels — inclusief routebeschrijvingen en knoppen."
                : "Switches the entire interface between Dutch and English — including directions and buttons.",
        },
        {
            icon: (
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M16 21h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3" />
                </svg>
            ),
            name: isNl ? "Kiosk modus" : "Kiosk mode",
            desc: isNl
                ? "Schakelt over naar een volledig scherm weergave zonder header, met grote tekst en grote knoppen — ideaal voor een tablet die in de hal staat opgesteld."
                : "Switches to a full-screen display with no header, large text and large buttons — ideal for a tablet mounted in the entrance hall.",
        },
        {
            icon: (
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            ),
            name: isNl ? "Donkere / lichte modus" : "Dark / light mode",
            desc: isNl
                ? "Schakelt tussen een licht en donker kleurenschema. De voorkeur wordt opgeslagen zodat je die niet steeds opnieuw hoeft in te stellen."
                : "Toggles between a light and dark colour scheme. Your preference is saved so you don't have to set it again.",
        },
    ];

    return (
        <div
            className={styles.helpOverlay}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className={styles.helpModal}>
                {/* Header */}
                <div className={styles.helpHeader}>
                    <div>
                        <div className={styles.helpTitle}>
                            {isNl ? "Uitleg & functies" : "Help & features"}
                        </div>
                        <div className={styles.helpSub}>
                            {isNl
                                ? "Een overzicht van alle knoppen en wat ze doen."
                                : "An overview of all buttons and what they do."}
                        </div>
                    </div>
                    <button className={styles.qrCloseBtn} onClick={onClose}>
                        ✕
                    </button>
                </div>

                {/* Feature list */}
                <div className={styles.helpList}>
                    {items.map((item, i) => (
                        <div key={i} className={styles.helpItem}>
                            <div className={styles.helpItemIcon}>{item.icon}</div>
                            <div className={styles.helpItemBody}>
                                <div className={styles.helpItemName}>{item.name}</div>
                                <div className={styles.helpItemDesc}>{item.desc}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HelpModal;