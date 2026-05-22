export const FLOORS = [
    { id: 0, label: 'BG', name: 'Begane grond' },
    { id: 1, label: '1e', name: '1e Verdieping' },
    { id: 2, label: '2e', name: '2e Verdieping' },
    { id: 3, label: '3e', name: '3e verdieping' },
]

// Breedte en hoogte van het SVG-canvas
export const SVG_W = 800
export const SVG_H = 686

// Y-coördinaat van de hoofdgang per verdieping (routing-anker).
// Verdieping 3 heeft een diagonale gang — CORRIDOR_Y[3] is de Y bij de trapingang bovenaan.
export const CORRIDOR_Y = { 0: 378, 1: 378, 2: 475, 3: 165 }

// X-coördinaat van de liftschacht per verdieping
export const ELEVATOR_X = { 0: 659, 1: 650, 2: 651, 3: 385 }

// X-coördinaat van het west- en oost-trappenhuis per verdieping
export const STAIR_WEST = { 0: 248, 1: 265, 2: 285, 3: 349 }
export const STAIR_EAST = { 0: 595, 1: 605, 2: 590, 3: 349 }

// Diagonale gang verdieping 3 — beschrijft de gangmiddellijn als polyline
export const FLOOR3_DIAG = [
    { x: 341, y: 150 },
    { x: 354, y: 200 },
    { x: 372, y: 265 },
    { x: 390, y: 330 },
    { x: 409, y: 390 },
    { x: 427, y: 445 },
]

// Geeft de gang-X terug bij een gegeven Y op verdieping 3 (lineaire interpolatie)
const DIAG3_X0 = 341, DIAG3_Y0 = 150
const DIAG3_SLOPE = (427 - 341) / (445 - 150)    // ≈ 0.291 — dx per dy
export function diag3X(y) {
    return Math.round(DIAG3_X0 + DIAG3_SLOPE * (y - DIAG3_Y0))
}

// Points of Interest
export const ALL_POIS = [
    //opleidingen
    { id: 'poi-sd', label: 'Creative software developer', icon: '💻', floor: 2, x: 655, y: 280, category: 'onderwijs' },
    { id: 'poi-mv', label: 'Mediavormgever', icon: '🎨', floor: 1, x: 280, y: 150, category: 'onderwijs' },
    { id: 'poi-id', label: 'Immersive designer', icon: '🥽', floor: 0, x: 700, y: 210, category: 'onderwijs' },
    { id: 'poi-pet', label: 'Podium- en evententechnicus', icon: '🎤', floor: 0, x: 500, y: 405, category: 'onderwijs' },
    { id: 'poi-cp', label: 'Medewerker creatieve productie', icon: '🎞️', floor: 1, x: 100, y: 350, category: 'onderwijs' },
    { id: 'poi-aam', label: 'All around mediamaker (dtp-er)', icon: '📡', floor: 1, x: 310, y: 300, category: 'onderwijs' },
    { id: 'poi-ss', label: 'Signspecialist', icon: '🖼️', floor: 1, x: 320, y: 420, category: 'onderwijs' },
    { id: 'poi-mr', label: 'Mediaredactiemedewerker', icon: '📰', floor: 2, x: 430, y: 460, category: 'onderwijs' },
    { id: 'poi-ed', label: 'E-commerce designer', icon: '🎞️', floor: 0, x: 100, y: 300, category: 'onderwijs' },
    { id: 'poi-rv', label: 'Ruimtelijk Vormgever', icon: '🏗️', floor: 0, x: 400, y: 150, category: 'onderwijs' },
    { id: 'poi-meemip', label: 'Media- en eventproducer & Music industry professional', icon: '🎞️', floor: 2, x: 430, y: 505, category: 'onderwijs' },
    { id: 'poi-av', label: 'Audiovisueel', icon: '🎬', floor: 0, x: 630, y: 270, category: 'onderwijs' },
    { id: 'poi-pd', label: 'Photograpic designer', icon: '🎞️', floor: 0, x: 650, y: 320, category: 'onderwijs' },
    { id: 'poi-ga', label: 'Game artist', icon: '🎮', floor: 3, x: 400, y: 310, category: 'onderwijs' },
    { id: 'poi-aidev', label: 'Applied AI software developer', icon: '🎞️', floor: 0, x: 595, y: 225, category: 'onderwijs' },
    { id: 'poi-fa', label: 'Filmacteur', icon: '🎞️', floor: 0, x: 130, y: 553, category: 'onderwijs' },

    //verdiepings dingen
    // Het eerste cijfer staat voor de verdieping, de 2e voor welke trap/lift
    // begane grond
    { id: 'lift-01', label: 'Lift', icon: '🛗', floor: 0, x: 659, y: 207, category: 'transport' },
    { id: 'lift-02', label: 'Lift', icon: '🛗', floor: 0, x: 247, y: 387, category: 'transport' },
    { id: 'trap-01', label: 'Trap 1', icon: '🪜', floor: 0, x: 290, y: 380, category: 'transport' },
    { id: 'trap-02', label: 'Trap 2', icon: '🪜', floor: 0, x: 603, y: 376, category: 'transport' },
    { id: 'trap-03', label: 'Trap 3', icon: '🪜', floor: 0, x: 635, y: 220, category: 'transport' },
    { id: 'trap-04', label: 'Trap 4', icon: '🪜', floor: 0, x: 624, y: 96, category: 'transport' },
    { id: 'trap-05', label: 'Trap 5', icon: '🪜', floor: 0, x: 277, y: 68, category: 'transport' },
    { id: 'trap-06', label: 'Trap 6', icon: '🪜', floor: 0, x: 120, y: 253, category: 'transport' },
    { id: 'trap-07', label: 'Trap 7', icon: '🪜', floor: 0, x: 115, y: 445, category: 'transport' },
    //1e verdieping
    { id: 'lift-11', label: 'Lift', icon: '🛗', floor: 1, x: 650, y: 218, category: 'transport' },
    { id: 'lift-12', label: 'Lift', icon: '🛗', floor: 1, x: 251, y: 385, category: 'transport' },
    { id: 'trap-11', label: 'Trap 1', icon: '🪜', floor: 1, x: 284, y: 374, category: 'transport' },
    { id: 'trap-12', label: 'Trap 2', icon: '🪜', floor: 1, x: 603, y: 378, category: 'transport' },
    { id: 'trap-13', label: 'Trap 3', icon: '🪜', floor: 1, x: 633, y: 228, category: 'transport' },
    { id: 'trap-14', label: 'Trap 4', icon: '🪜', floor: 1, x: 618, y: 109, category: 'transport' },
    { id: 'trap-15', label: 'Trap 5', icon: '🪜', floor: 1, x: 283, y: 55, category: 'transport' },
    { id: 'trap-16', label: 'Trap 6', icon: '🪜', floor: 1, x: 125, y: 250, category: 'transport' },
    { id: 'trap-17', label: 'Trap 7', icon: '🪜', floor: 1, x: 129, y: 444, category: 'transport' },
    //2e verdieping
    { id: 'lift-21', label: 'Lift', icon: '🛗', floor: 2, x: 651, y: 304, category: 'transport' },
    { id: 'trap-21', label: 'Trap 1', icon: '🪜', floor: 2, x: 299, y: 457, category: 'transport' },
    { id: 'trap-23', label: 'Trap 3', icon: '🪜', floor: 2, x: 631, y: 310, category: 'transport' },
    { id: 'trap-24', label: 'Trap 4', icon: '🪜', floor: 2, x: 616, y: 191, category: 'transport' },
    //3e verdieping
    { id: 'lift-31', label: 'Lift', icon: '🛗', floor: 3, x: 385, y: 390, category: 'transport' },
    { id: 'trap-33', label: 'Trap 3', icon: '🪜', floor: 3, x: 339, y: 408, category: 'transport' },
    { id: 'trap-34', label: 'Trap 4', icon: '🪜', floor: 3, x: 316, y: 146, category: 'transport' },

    //studio's
    { id: 'poi-pod', label: 'Podcaststudio', icon: '🎧', floor: 0, x: 243, y: 430, category: 'onderwijs', status: 'vrij' },

    //toiletten
    { id: 'poi-wc-bg1', label: 'Toiletten Beganegrond1', icon: '🚻', floor: 0, x: 125, y: 365, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-wc-bg2', label: 'Toiletten Beganegrond2', icon: '🚻', floor: 0, x: 230, y: 365, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-wc-bg3', label: 'Toiletten Beganegrond3', icon: '🚻', floor: 0, x: 223, y: 195, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-wc-bg4', label: 'Toiletten Beganegrond4', icon: '🚻', floor: 0, x: 655, y: 255, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-wc-bg5', label: 'Toiletten Beganegrond5', icon: '🚻', floor: 0, x: 630, y: 370, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-wc-2', label: 'Toiletten 2e', icon: '🚻', floor: 2, x: 102, y: 460, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-wc-3', label: 'Toiletten 3e', icon: '🚻', floor: 3, x: 400, y: 470, category: 'faciliteiten', status: 'vrij' },

    //overig
    { id: 'poi-portier', label: 'Ingang', icon: '🛡️', floor: 0, x: 295, y: 455, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-receptie', label: 'Receptie', icon: 'ℹ️', floor: 0, x: 320, y: 410, category: 'faciliteiten', status: 'vrij' },
    { id: 'poi-kantine', label: 'Kantine', icon: '🍽️', floor: 0, x: 295, y: 290, category: 'eten', status: 'vrij' },
]

// Oost-vleugel aansluiting (verdieping 2) — aparte gedraaide vleugel, routing springt hier de gap over
export const EAST_WING_2 = { entryX: 653, entryY: 410 }

// Categorieën voor de filterknopppen
export const CATEGORIES = [
    { id: 'all', label: 'Alles', icon: '🔍' },
    { id: 'onderwijs', label: 'Opleidingen', icon: '🎓' },
    { id: 'eten', label: 'Eten', icon: '🍽️' },
    { id: 'faciliteiten', label: 'Faciliteiten', icon: '🛠️' },
    { id: 'transport', label: 'Transport', icon: '🚶' },
]