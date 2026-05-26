export const FLOORS = [
    { id: 0, label: 'BG', name: 'Begane grond' },
    { id: 1, label: '1e', name: '1e Verdieping' },
    { id: 2, label: '2e', name: '2e Verdieping' },
    { id: 3, label: '3e', name: '3e verdieping' },
]

// Breedte en hoogte van het SVG-canvas
export const SVG_W = 800
export const SVG_H = 500

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
    // Opleidingen
    { id: 'poi-sd', label: 'Creative software developer', icon: 'Creative-Software-Dev', floor: 2, x: 652, y: 157, category: 'onderwijs' },
    { id: 'poi-mv', label: 'Mediavormgever', icon: 'Mediavormgever', floor: 1, x: 281, y: 112, category: 'onderwijs' },
    { id: 'poi-id', label: 'Immersive designer', icon: 'immersive-designer', floor: 0, x: 640, y: 136, category: 'onderwijs' },
    { id: 'poi-pet', label: 'Podium- en evententechnicus', icon: 'Podium-en-Eventmenten tech', floor: 0, x: 607, y: 322, category: 'onderwijs' },
    { id: 'poi-cp', label: 'Medewerker creatieve productie', icon: 'Medewerker-creatieve-productie', floor: 1, x: 102, y: 271, category: 'onderwijs' },
    { id: 'poi-aam', label: 'All around mediamaker (dtp-er)', icon: 'Allround-DTP', floor: 1, x: 307, y: 241, category: 'onderwijs' },
    { id: 'poi-ss', label: 'Signspecialist', icon: 'Sign', floor: 1, x: 300, y: 371, category: 'onderwijs' },
    { id: 'poi-mr', label: 'Mediaredactiemedewerker', icon: 'Mediaredactie', floor: 2, x: 428, y: 309, category: 'onderwijs' },
    { id: 'poi-ed', label: 'E-commerce designer', icon: 'Ecom-design', floor: 0, x: 145, y: 260, category: 'onderwijs' },
    { id: 'poi-rv', label: 'Ruimtelijk Vormgever', icon: 'Ruimtelijkevormgever', floor: 0, x: 400, y: 112, category: 'onderwijs' },
    { id: 'poi-meemip', label: 'Media- en eventproducer & Music industry professional', icon: 'Media-Eventproducer', floor: 2, x: 428, y: 350, category: 'onderwijs' },
    { id: 'poi-av', label: 'Audiovisueel', icon: 'Audiovisueel', floor: 0, x: 608, y: 200, category: 'onderwijs' },
    { id: 'poi-pd', label: 'Photograpic designer', icon: 'Photographic-Design', floor: 0, x: 450, y: 430, category: 'onderwijs' },
    { id: 'poi-ga', label: 'Game artist', icon: 'Game-Artist', floor: 3, x: 398, y: 225, category: 'onderwijs' },
    { id: 'poi-aidev', label: 'Applied AI software developer', icon: 'Applied-Ai-Software dev', floor: 0, x: 488, y: 428, category: 'onderwijs' },
    { id: 'poi-fa', label: 'Filmacteur', icon: 'Film-acteur', floor: 0, x: 148, y: 432, category: 'onderwijs' },

    // Transport
    { id: 'lift-01', label: 'Lift', icon: 'Lift', floor: 0, x: 637, y: 168, category: 'transport' },
    { id: 'lift-02', label: 'Lift', icon: 'Lift', floor: 0, x: 273, y: 300, category: 'transport' },
    { id: 'trap-01', label: 'Trap 1', icon: 'Trap', floor: 0, x: 319, y: 301, category: 'transport' },
    { id: 'trap-02', label: 'Trap 2', icon: 'Trap', floor: 0, x: 589, y: 292, category: 'transport' },
    { id: 'trap-03', label: 'Trap 3', icon: 'Trap', floor: 0, x: 616, y: 174, category: 'transport' },
    { id: 'trap-04', label: 'Trap 4', icon: 'Trap', floor: 0, x: 608, y: 80, category: 'transport' },
    { id: 'trap-05', label: 'Trap 5', icon: 'Trap', floor: 0, x: 300, y: 55, category: 'transport' },
    { id: 'trap-06', label: 'Trap 6', icon: 'Trap', floor: 0, x: 168, y: 200, category: 'transport' },

    { id: 'lift-11', label: 'Lift', icon: 'Lift', floor: 1, x: 653, y: 178, category: 'transport' },
    { id: 'lift-12', label: 'Lift', icon: 'Lift', floor: 1, x: 251, y: 321, category: 'transport' },
    { id: 'trap-11', label: 'Trap 1', icon: 'Trap', floor: 1, x: 288, y: 314, category: 'transport' },
    { id: 'trap-12', label: 'Trap 2', icon: 'Trap', floor: 1, x: 604, y: 311, category: 'transport' },
    { id: 'trap-13', label: 'Trap 3', icon: 'Trap', floor: 1, x: 629, y: 188, category: 'transport' },
    { id: 'trap-14', label: 'Trap 4', icon: 'Trap', floor: 1, x: 621, y: 88, category: 'transport' },
    { id: 'trap-15', label: 'Trap 5', icon: 'Trap', floor: 1, x: 283, y: 45, category: 'transport' },
    { id: 'trap-16', label: 'Trap 6', icon: 'Trap', floor: 1, x: 125, y: 250, category: 'transport' },

    { id: 'lift-21', label: 'Lift', icon: 'Lift', floor: 2, x: 649, y: 183, category: 'transport' },
    { id: 'trap-21', label: 'Trap 1', icon: 'Trap', floor: 2, x: 300, y: 309, category: 'transport' },
    { id: 'trap-22', label: 'Trap 2', icon: 'Trap', floor: 2, x: 598, y: 305, category: 'transport' },
    { id: 'trap-23', label: 'Trap 3', icon: 'Trap', floor: 2, x: 624, y: 190, category: 'transport' },
    { id: 'trap-24', label: 'Trap 4', icon: 'Trap', floor: 2, x: 616, y: 89, category: 'transport' },

    { id: 'lift-31', label: 'Lift', icon: 'Lift', floor: 3, x: 389, y: 276, category: 'transport' },
    { id: 'trap-33', label: 'Trap 3', icon: 'Trap', floor: 3, x: 344, y: 290, category: 'transport' },
    { id: 'trap-34', label: 'Trap 4', icon: 'Trap', floor: 3, x: 318, y: 92, category: 'transport' },

    // Studio's
    { id: 'poi-pod', label: 'Podcaststudio', icon: 'Audiovisueel', floor: 0, x: 270, y: 340, category: 'onderwijs', status: 'vrij' },

    // Toiletten
    { id: 'poi-wc-bg1', label: 'Toiletten Beganegrond1', icon: 'Toilet', floor: 0, x: 167, y: 284, category: 'faciliteiten' },
    { id: 'poi-wc-bg2', label: 'Toiletten Beganegrond2', icon: 'Toilet', floor: 0, x: 260, y: 284, category: 'faciliteiten' },
    { id: 'poi-wc-bg3', label: 'Toiletten Beganegrond3', icon: 'Toilet', floor: 0, x: 256, y: 155, category: 'faciliteiten' },
    { id: 'poi-wc-bg4', label: 'Toiletten Beganegrond4', icon: 'Toilet', floor: 0, x: 637, y: 204, category: 'faciliteiten' },
    { id: 'poi-wc-bg5', label: 'Toiletten Beganegrond5', icon: 'Toilet', floor: 0, x: 612, y: 288, category: 'faciliteiten' },

    { id: 'poi-wc-1-1', label: 'Toiletten1 1e', icon: 'Toilet', floor: 1, x: 648, y: 216, category: 'faciliteiten', },
    { id: 'poi-wc-1-2', label: 'Toiletten2 1e', icon: 'Toilet', floor: 1, x: 631, y: 302, category: 'faciliteiten', },
    { id: 'poi-wc-1-3', label: 'Toiletten3 1e', icon: 'Toilet', floor: 1, x: 243, y: 298, category: 'faciliteiten', },
    { id: 'poi-wc-1-4', label: 'Toiletten4 1e', icon: 'Toilet', floor: 1, x: 125, y: 185, category: 'faciliteiten', },
    { id: 'poi-wc-1-5', label: 'Toiletten5 1e', icon: 'Toilet', floor: 1, x: 219, y: 173, category: 'faciliteiten', },

    { id: 'poi-wc-2-1', label: 'Toiletten1 2e', icon: 'Toilet', floor: 2, x: 646, y: 215, category: 'faciliteiten', },
    { id: 'poi-wc-2-2', label: 'Toiletten2 2e', icon: 'Toilet', floor: 2, x: 624, y: 312, category: 'faciliteiten', },
    { id: 'poi-wc-2-3', label: 'Toiletten3 2e', icon: 'Toilet', floor: 2, x: 339, y: 312, category: 'faciliteiten', },
    { id: 'poi-wc-2-4', label: 'Toiletten4 2e', icon: 'Toilet', floor: 2, x: 261, y: 299, category: 'faciliteiten', },

    { id: 'poi-wc-3', label: 'Toiletten 3e', icon: 'Toilet', floor: 3, x: 384, y: 342, category: 'faciliteiten', },

    // Overig
    { id: 'poi-portier', label: 'Ingang', icon: 'Ingang', floor: 0, x: 319, y: 356, category: 'faciliteiten', },
    { id: 'poi-receptie', label: 'Receptie', icon: 'Info', floor: 0, x: 346, y: 338, category: 'faciliteiten', },
    { id: 'poi-kantine', label: 'Kantine', icon: 'Kantine', floor: 0, x: 325, y: 166, category: 'eten', },
]

// Oost-vleugel aansluiting (verdieping 2) — aparte gedraaide vleugel, routing springt hier de gap over
export const EAST_WING_2 = { entryX: 653, entryY: 410 }

// Categorieën voor de filterknopppen
export const CATEGORIES = [
    { id: 'all', label: 'Alles', icon: 'fa-solid fa-border-all' },
    { id: 'onderwijs', label: 'Opleidingen', icon: 'fa-solid fa-graduation-cap' },
    { id: 'eten', label: 'Eten', icon: 'fa-solid fa-utensils' },
    { id: 'faciliteiten', label: 'Faciliteiten', icon: 'fa-solid fa-building' },
    { id: 'transport', label: 'Transport', icon: 'fa-solid fa-elevator' },
]