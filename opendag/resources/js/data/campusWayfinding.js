import { ALL_POIS } from './building'

export const floors = [
    { value: "floor-0", label: "Begane grond", shortLabel: "0", image: '/maps/Plattegrond_begane-grond.svg', viewBox: "0 0 1986.13 1704.1", wallStrokeClass: "cls-21" },
    { value: "floor-1", label: "Verdieping 1", shortLabel: "1", image: '/maps/Plattegrond_verdieping1.svg', viewBox: "0 0 2050.72 1704.1", wallStrokeClass: "cls-14" },
    { value: "floor-2", label: "Verdieping 2", shortLabel: "2", image: '/maps/Plattegrond_verdieping2.svg', viewBox: "0 0 2050.723 1704.1", wallStrokeClass: "cls-7" },
    { value: "floor-3", label: "Verdieping 3", shortLabel: "3", image: '/maps/Plattegrond_verdieping3.svg', viewBox: "0 0 2050.7234 1704.1", wallStrokeClass: "cls-2" },
];

export const locationColumns = [
    { id: "column-1", label: "Opleidingen" },
    { id: "column-2", label: "Meer opleidingen" },
    { id: "column-3", label: "Startpunten & service" },
];

// Kruispunten in het gangenstelsel (geen bestemmingen).
// Naamgeving: fX-abc → fX=verdieping, a=l/m/r (horizontaal), b=t/c/b (verticaal)
// Verdieping 2 is gesplitst in deel 1 (west) en deel 2 (oost), NIET onderling verbonden.
export const graphNodes = {
    // Begane grond
    "f0-outside": { floorId: "floor-0", x: 295, y: 555 },
    "f0-actor": { floorId: "floor-0", x: 200, y: 555 },
    "f0-mb": { floorId: "floor-0", x: 290, y: 405 },
    "f0-mb2": { floorId: "floor-0", x: 425, y: 405 },
    "f0-lb": { floorId: "floor-0", x: 95, y: 405 },
    "f0-rb": { floorId: "floor-0", x: 645, y: 405 },
    "f0-lc": { floorId: "floor-0", x: 97, y: 235 },
    "f0-mc": { floorId: "floor-0", x: 270, y: 240 },
    "f0-mc2": { floorId: "floor-0", x: 280, y: 300 },
    "f0-rc": { floorId: "floor-0", x: 543, y: 240 },
    "f0-rc2": { floorId: "floor-0", x: 600, y: 220 },
    "f0-rc3": { floorId: "floor-0", x: 680, y: 215 },
    "f0-rc4": { floorId: "floor-0", x: 625, y: 250 },
    "f0-rc5": { floorId: "floor-0", x: 650, y: 305 },
    "f0-mt": { floorId: "floor-0", x: 270, y: 150 },
    "f0-rt": { floorId: "floor-0", x: 637, y: 125 },

    // 1e verdieping
    "f1-mb": { floorId: "floor-1", x: 307, y: 402 },
    "f1-mb2": { floorId: "floor-1", x: 285, y: 402 },
    "f1-lb": { floorId: "floor-1", x: 102, y: 402 },
    "f1-rb": { floorId: "floor-1", x: 605, y: 402 },
    "f1-rb2": { floorId: "floor-1", x: 604, y: 336 },
    "f1-lc": { floorId: "floor-1", x: 100, y: 234 },
    "f1-mc": { floorId: "floor-1", x: 280, y: 230 },
    "f1-mc2": { floorId: "floor-1", x: 307, y: 230 },
    "f1-rc": { floorId: "floor-1", x: 642, y: 312 },
    "f1-rc3": { floorId: "floor-1", x: 619, y: 254 },
    "f1-rc4": { floorId: "floor-1", x: 674, y: 226 },
    "f1-mt": { floorId: "floor-1", x: 277, y: 81 },
    "f1-rt": { floorId: "floor-1", x: 630, y: 128 },

    // 2e verdieping — deel 1 (west)
    "f2-1-mb": { floorId: "floor-2", x: 299, y: 485 },
    "f2-1-lb": { floorId: "floor-2", x: 130, y: 485 },
    "f2-1-rb": { floorId: "floor-2", x: 599, y: 485 },
    "f2-1-lc": { floorId: "floor-2", x: 128, y: 328 },

    // 2e verdieping — deel 2 (oost)
    "f2-2-rc": { floorId: "floor-2", x: 686, y: 346 },
    "f2-2-rc2": { floorId: "floor-2", x: 670, y: 314 },
    "f2-2-rt": { floorId: "floor-2", x: 624, y: 212 },

    // 3e verdieping (diagonale gang)
    "f3-mb": { floorId: "floor-3", x: 472, y: 489 },
    "f3-mc": { floorId: "floor-3", x: 434, y: 407 },
    "f3-mt": { floorId: "floor-3", x: 339, y: 187 },
};

// Verbindingen tussen nodes. Bidirectioneel.
// Zonder weight → Euclidische afstand. Met weight → vaste penalty (trappen/lift).
export const graphEdges = [
    // Begane grond
    ["f0-outside", "f0-mb"],
    ["f0-outside", "f0-actor"],
    ["f0-lb", "f0-mb"],
    ["f0-mb", "f0-mb2"],
    ["f0-mb2", "f0-rb"],
    ["f0-lb", "f0-lc"],
    ["f0-lc", "f0-mc"],
    ["f0-mc", "f0-mc2"],
    ["f0-mc2", "f0-mb"],
    ["f0-mc", "f0-mt"],
    ["f0-mc", "f0-rc"],
    ["f0-rc", "f0-rc2"],
    ["f0-rc2", "f0-rc4"],
    ["f0-rc4", "f0-rc5"],
    ["f0-rc4", "f0-rc3"],
    ["f0-rc3", "f0-rt"],
    ["f0-rb", "f0-rc5"],

    // 1e verdieping
    ["f1-lb", "f1-mb"],
    ["f1-mb", "f1-rb"],
    ["f1-rb", "f1-rb2"],
    ["f1-lb", "f1-lc"],
    ["f1-lc", "f1-mc"],
    ["f1-mc", "f1-mc2"],
    ["f1-mc2", "f1-mb"],
    ["f1-mc", "f1-mt"],
    ["f1-rb2", "f1-rc"],
    ["f1-rc", "f1-rc3"],
    ["f1-rc3", "f1-rc4"],
    ["f1-rc4", "f1-rt"],

    // 2e verdieping deel 1
    ["f2-1-lb", "f2-1-mb"],
    ["f2-1-mb", "f2-1-rb"],
    ["f2-1-lb", "f2-1-lc"],

    // 2e verdieping deel 2
    ["f2-2-rc", "f2-2-rc2"],
    ["f2-2-rc2", "f2-2-rt"],

    // 3e verdieping
    ["f3-mb", "f3-mc"],
    ["f3-mc", "f3-mt"],

    // Trappen
    ["f0-mb", "f1-mb", { weight: 300, label: "Trap 1" }],
    ["f1-mb", "f2-1-mb", { weight: 300, label: "Trap 1" }],
    ["f0-rb", "f1-rb", { weight: 300, label: "Trap 2" }],
    ["f0-rc2", "f1-rc3", { weight: 300, label: "Trap 3" }],
    ["f1-rc3", "f2-2-rc2", { weight: 300, label: "Trap 3" }],
    ["f2-2-rc2", "f3-mc", { weight: 300, label: "Trap 3" }],
    ["f0-rt", "f1-rt", { weight: 300, label: "Trap 4" }],
    ["f1-rt", "f2-2-rt", { weight: 300, label: "Trap 4" }],
    ["f2-2-rt", "f3-mt", { weight: 300, label: "Trap 4" }],
    ["f0-mt", "f1-mt", { weight: 300, label: "Trap 5" }],
    ["f0-lc", "f1-lc", { weight: 300, label: "Trap 6" }],
    ["f0-lb", "f1-lb", { weight: 300, label: "Trap 7" }],

    // Liften
    ["f0-rc3", "f1-rc4", { weight: 350, label: "Lift" }],
    ["f1-rc4", "f2-2-rc2", { weight: 350, label: "Lift" }],
    ["f2-2-rc2", "f3-mc", { weight: 350, label: "Lift" }],
];

const floorLookup = Object.fromEntries(floors.map(f => [f.value, f]));

// Berekent Euclidische afstand tussen twee punten
function afstand(ax, ay, bx, by) {
    return Math.hypot(bx - ax, by - ay);
}

// Bouwt adjacentielijst op: { nodeId: [{ naar, gewicht, label }] }
function bouwAdjacentielijst() {
    const adj = {};
    Object.keys(graphNodes).forEach(id => { adj[id] = []; });

    graphEdges.forEach(([van, naar, opties = {}]) => {
        const nVan = graphNodes[van], nNaar = graphNodes[naar];
        const gewicht = opties.weight ?? afstand(nVan.x, nVan.y, nNaar.x, nNaar.y);
        adj[van].push({ naar, gewicht, label: opties.label ?? null });
        adj[naar].push({ naar: van, gewicht, label: opties.label ?? null });
    });

    return adj;
}

const adjacentielijst = bouwAdjacentielijst();

// Zoekt de dichtstbijzijnde graphNode voor een POI op dezelfde verdieping
function vindDichtstbijzijndeNode(poi) {
    const poiFloorId = `floor-${poi.floor}`;
    let besteNode = null;
    let besteAfstand = Infinity;

    for (const [nodeId, node] of Object.entries(graphNodes)) {
        if (node.floorId !== poiFloorId) continue;
        const d = afstand(poi.x, poi.y, node.x, node.y);
        if (d < besteAfstand) {
            besteAfstand = d;
            besteNode = nodeId;
        }
    }

    return besteNode;
}

// Dijkstra: vindt het kortste pad tussen twee nodes.
// Geeft { pad: [nodeIds], afstand } terug, of null.
function dijkstra(startId, eindId) {
    const afstanden = {};
    const vorige = {};
    const bezocht = new Set();

    Object.keys(adjacentielijst).forEach(id => { afstanden[id] = Infinity; });
    afstanden[startId] = 0;

    const wachtrij = [{ id: startId, afstand: 0 }];

    while (wachtrij.length > 0) {
        wachtrij.sort((a, b) => a.afstand - b.afstand);
        const { id: huidige } = wachtrij.shift();

        if (huidige === eindId) break;
        if (bezocht.has(huidige)) continue;
        bezocht.add(huidige);

        for (const buur of adjacentielijst[huidige] ?? []) {
            if (bezocht.has(buur.naar)) continue;

            const nieuweAfstand = afstanden[huidige] + buur.gewicht;
            if (nieuweAfstand < afstanden[buur.naar]) {
                afstanden[buur.naar] = nieuweAfstand;
                vorige[buur.naar] = huidige;
                wachtrij.push({ id: buur.naar, afstand: nieuweAfstand });
            }
        }
    }

    if (afstanden[eindId] === Infinity) return null;

    const pad = [];
    let stap = eindId;
    while (stap) {
        pad.unshift(stap);
        stap = vorige[stap];
    }

    return { pad, afstand: afstanden[eindId] };
}

// Berekent een route tussen twee POI-IDs (uit ALL_POIS in building.js).
// Accepteert optioneel een options object (voor compatibiliteit met IndoorMap).
// Return-formaat is compatible met IndoorMap en MapCanvas.
export function computeRoute(vanPoiId, naarPoiId, _options = {}) {
    const vanPoi = ALL_POIS.find(p => p.id === vanPoiId);
    const naarPoi = ALL_POIS.find(p => p.id === naarPoiId);
    if (!vanPoi || !naarPoi) return null;
    if (vanPoiId === naarPoiId) return null;

    const vanNode = vindDichtstbijzijndeNode(vanPoi);
    const naarNode = vindDichtstbijzijndeNode(naarPoi);
    if (!vanNode || !naarNode) return null; 

    const resultaat = dijkstra(vanNode, naarNode);
    if (!resultaat) return null;

    const { pad, afstand: padAfstand } = resultaat;

    // Waypoints: floor als nummer zodat MapCanvas ze kan filteren.
    // POI-positie wordt toegevoegd als start/eind zodat er altijd een lijn
    // zichtbaar is op de verdieping van de POI (ook als er maar 1 graphNode is).
    const floorNummer = (floorId) => parseInt(floorId.replace("floor-", ""), 10);

    const waypoints = [];

    // Startpunt: POI-positie als die afwijkt van de eerste node
    const eersteNode = graphNodes[pad[0]];
    if (vanPoi.x !== eersteNode.x || vanPoi.y !== eersteNode.y) {
        waypoints.push({ x: vanPoi.x, y: vanPoi.y, floor: vanPoi.floor });
    }

    // Graph-nodes
    for (const nodeId of pad) {
        const node = graphNodes[nodeId];
        waypoints.push({ x: node.x, y: node.y, floor: floorNummer(node.floorId) });
    }

    // Eindpunt: POI-positie als die afwijkt van de laatste node
    const laatsteNode = graphNodes[pad[pad.length - 1]];
    if (naarPoi.x !== laatsteNode.x || naarPoi.y !== laatsteNode.y) {
        waypoints.push({ x: naarPoi.x, y: naarPoi.y, floor: naarPoi.floor });
    }

    // Stappen: compatible met StepsList (icon, text, type)
    const steps = [];
    steps.push({ icon: "start", text: `Start bij ${vanPoi.label}`, type: "start" });

    for (let i = 0; i < pad.length - 1; i++) {
        const vanN = graphNodes[pad[i]];
        const naarN = graphNodes[pad[i + 1]];
        const edge = (adjacentielijst[pad[i]] ?? []).find(b => b.naar === pad[i + 1]);

        if (vanN.floorId !== naarN.floorId && edge?.label) {
            const doelVerdieping = floorLookup[naarN.floorId]?.label ?? naarN.floorId;
            const isLift = edge.label.includes("Lift");
            steps.push({
                icon: isLift ? "elevator" : "stairs",
                text: `${edge.label} naar ${doelVerdieping}`,
                type: isLift ? "elevator" : "stairs",
            });
        }
    }

    steps.push({ icon: "arrive", text: `Aangekomen bij ${naarPoi.label}`, type: "arrive" });

    const totalDistance = Math.max(1, Math.round(padAfstand * 0.08));
    const totalMinutes = Math.max(1, Math.round(totalDistance / 60));
    const multiFloor = vanPoi.floor !== naarPoi.floor;

    return { waypoints, steps, totalDistance, totalMinutes, multiFloor };
}

// Interpoleert een positie op het pad bij voortgang 0–1.
// Geeft { x, y, floor } terug.
export function getPositionAtProgress(waypoints, progress) {
    if (!waypoints || waypoints.length < 2) return null;
    if (progress <= 0) return { ...waypoints[0] };
    if (progress >= 1) return { ...waypoints[waypoints.length - 1] };

    let totaal = 0;
    const segmenten = [];
    for (let i = 1; i < waypoints.length; i++) {
        const a = waypoints[i - 1], b = waypoints[i];
        const len = Math.max(Math.hypot(b.x - a.x, b.y - a.y), 1);
        segmenten.push({ a, b, len });
        totaal += len;
    }

    let resterend = progress * totaal;
    for (const seg of segmenten) {
        if (resterend <= seg.len) {
            const t = resterend / seg.len;
            return {
                x: seg.a.x + (seg.b.x - seg.a.x) * t,
                y: seg.a.y + (seg.b.y - seg.a.y) * t,
                floor: t < 0.5 ? seg.a.floor : seg.b.floor,
            };
        }
        resterend -= seg.len;
    }

    return { ...waypoints[waypoints.length - 1] };
}