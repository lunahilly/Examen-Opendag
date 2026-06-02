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

export const graphNodes = {
    // Begane grond
    "f0-outside": { floorId: "floor-0", x: 315, y: 433 },
    "f0-actor": { floorId: "floor-0", x: 200, y: 433 },
    "f0-mb": { floorId: "floor-0", x: 315, y: 317 },
    "f0-mb2": { floorId: "floor-0", x: 460, y: 317 },
    "f0-mb3": { floorId: "floor-0", x: 400, y: 317 },
    "f0-mb5": { floorId: "floor-0", x: 530, y: 317 },
    "f0-lb": { floorId: "floor-0", x: 147, y: 317 },
    "f0-lb2": { floorId: "floor-0", x: 220, y: 317 },
    "f0-lb3": { floorId: "floor-0", x: 147, y: 250 },
    "f0-rb": { floorId: "floor-0", x: 628, y: 317 },
    "f0-lc": { floorId: "floor-0", x: 147, y: 186 },
    "f0-lc2": { floorId: "floor-0", x: 245, y: 186 },
    "f0-mc": { floorId: "floor-0", x: 300, y: 188 },
    "f0-mc2": { floorId: "floor-0", x: 300, y: 220 },
    "f0-mc3": { floorId: "floor-0", x: 400, y: 189 },
    "f0-mc4": { floorId: "floor-0", x: 480, y: 189 },
    "f0-mc5": { floorId: "floor-0", x: 310, y: 270 },
    "f0-rc": { floorId: "floor-0", x: 537, y: 190 },
    "f0-rc2": { floorId: "floor-0", x: 589, y: 171 },
    "f0-rc3": { floorId: "floor-0", x: 659, y: 177 },
    "f0-rc4": { floorId: "floor-0", x: 607, y: 198 },
    "f0-rc5": { floorId: "floor-0", x: 631, y: 253 },
    "f0-rc6": { floorId: "floor-0", x: 601, y: 188 },
    "f0-mt": { floorId: "floor-0", x: 300, y: 113 },
    "f0-mt2": { floorId: "floor-0", x: 350, y: 113 },
    "f0-rt": { floorId: "floor-0", x: 619, y: 100 },

    // 1e verdieping
    "f1-mb": { floorId: "floor-1", x: 311, y: 332 },
    "f1-mb2": { floorId: "floor-1", x: 256, y: 332 },
    "f1-mb3": { floorId: "floor-1", x: 311, y: 282 },
    "f1-mb4": { floorId: "floor-1", x: 311, y: 232 },
    "f1-mb5": { floorId: "floor-1", x: 400, y: 332 },
    "f1-mb6": { floorId: "floor-1", x: 510, y: 332 },
    "f1-lb": { floorId: "floor-1", x: 102, y: 332 },
    "f1-lb2": { floorId: "floor-1", x: 102, y: 282 },
    "f1-lb3": { floorId: "floor-1", x: 152, y: 332 },
    "f1-lb4": { floorId: "floor-1", x: 202, y: 332 },
    "f1-rb": { floorId: "floor-1", x: 605, y: 332 },
    "f1-rb2": { floorId: "floor-1", x: 605, y: 278 },
    "f1-lc": { floorId: "floor-1", x: 102, y: 204 },
    "f1-lc2": { floorId: "floor-1", x: 102, y: 234 },
    "f1-mc": { floorId: "floor-1", x: 157, y: 205 },
    "f1-mc2": { floorId: "floor-1", x: 157, y: 190 },
    "f1-mc3": { floorId: "floor-1", x: 311, y: 190 },
    "f1-mc4": { floorId: "floor-1", x: 277, y: 190 },
    "f1-mc5": { floorId: "floor-1", x: 222, y: 190 },
    "f1-rc": { floorId: "floor-1", x: 645, y: 258 },
    "f1-rc3": { floorId: "floor-1", x: 619, y: 210 },
    "f1-rc4": { floorId: "floor-1", x: 671, y: 188 },
    "f1-mt": { floorId: "floor-1", x: 277, y: 81 },
    "f1-mt2": { floorId: "floor-1", x: 277, y: 130 },
    "f1-rt": { floorId: "floor-1", x: 641, y: 128 },

    // 2e verdieping — deel 1 (west)
    "f2-1-mb": { floorId: "floor-2", x: 347, y: 333 },
    "f2-1-mb2": { floorId: "floor-2", x: 427, y: 333 },
    "f2-1-lb": { floorId: "floor-2", x: 300, y: 333 },
    "f2-1-lb2": { floorId: "floor-2", x: 260, y: 333 },
    "f2-1-rb": { floorId: "floor-2", x: 602, y: 333 },

    // 2e verdieping — deel 2 (oost)
    "f2-2-rt": { floorId: "floor-2", x: 627, y: 107 },
    "f2-2-rc2": { floorId: "floor-2", x: 668, y: 189 },
    "f2-2-rc": { floorId: "floor-2", x: 687, y: 218 },

    // 3e verdieping (diagonale gang)
    "f3-mb": { floorId: "floor-3", x: 471, y: 349 },
    "f3-mc": { floorId: "floor-3", x: 435, y: 289 },
    "f3-mc2": { floorId: "floor-3", x: 346, y: 323 },
    "f3-mt": { floorId: "floor-3", x: 338, y: 127 },
};

// Verbindingen tussen nodes. Bidirectioneel.
// Zonder weight → Euclidische afstand. Met weight → vaste penalty (trappen/lift).

export const graphEdges = [
    // Begane grond
    ["f0-outside", "f0-mb"],
    ["f0-outside", "f0-actor"],
    ["f0-lb", "f0-lb2"],
    ["f0-lb2", "f0-mb"],
    ["f0-mb", "f0-mb3"],
    ["f0-mb3", "f0-mb2"],
    ["f0-mb2", "f0-mb5"],
    ["f0-mb5", "f0-rb"],
    ["f0-lb", "f0-lb3"],
    ["f0-lb3", "f0-lc"],
    ["f0-lc", "f0-lc2"],
    ["f0-lc2", "f0-mc"],
    ["f0-mc", "f0-mc2"],
    ["f0-mc5", "f0-mb"],
    ["f0-mc2", "f0-mc5"],
    ["f0-mc", "f0-mt"],
    ["f0-mt", "f0-mt2"],
    ["f0-mc", "f0-mc3"],
    ["f0-mc3", "f0-mc4"],
    ["f0-mc4", "f0-rc"],
    ["f0-rc", "f0-rc2"],
    ["f0-rc2", "f0-rc6"],
    ["f0-rc6", "f0-rc4"],
    ["f0-rc4", "f0-rc5"],
    ["f0-rc4", "f0-rc3"],
    ["f0-rc3", "f0-rt"],
    ["f0-rb", "f0-rc5"],

    // 1e verdieping
    ["f1-mb2", "f1-mb"],
    ["f1-mb2", "f1-lb4"],
    ["f1-lb3", "f1-lb4"],
    ["f1-lb3", "f1-lb"],
    ["f1-mb", "f1-mb5"],
    ["f1-mb6", "f1-mb5"],
    ["f1-mb6", "f1-rb"],
    ["f1-rb", "f1-rb2"],
    ["f1-lc2", "f1-lc"],
    ["f1-lb2", "f1-lb"],
    ["f1-lb2", "f1-lc2"],
    ["f1-lc", "f1-mc"],
    ["f1-mc", "f1-mc2"],
    ["f1-mt", "f1-mt2"],
    ["f1-mc4", "f1-mt2"],
    ["f1-mc", "f1-lc"],
    ["f1-rb2", "f1-rc"],
    ["f1-rc", "f1-rc3"],
    ["f1-rc3", "f1-rc4"],
    ["f1-rc4", "f1-rt"],
    ["f1-mc2", "f1-mc5"],
    ["f1-mc5", "f1-mc4"],
    ["f1-mc3", "f1-mc4"],
    ["f1-mb3", "f1-mb"],
    ["f1-mb3", "f1-mb4"],
    ["f1-mb4", "f1-mc3"],

    // 2e verdieping deel 1
    ["f2-1-lb2", "f2-1-lb"],
    ["f2-1-lb", "f2-1-mb"],
    ["f2-1-mb", "f2-1-mb2"],
    ["f2-1-mb2", "f2-1-rb"],

    // 2e verdieping deel 2
    ["f2-2-rc", "f2-2-rc2"],
    ["f2-2-rc2", "f2-2-rt"],

    // 3e verdieping
    ["f3-mb", "f3-mc"],
    ["f3-mc", "f3-mt"],
    ["f3-mc", "f3-mc2"],
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
    const poiFloorId = `floor-${poi.floor_id}`; // poi.floor => poi.floor_id GAGA
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
export function computeRoute(vanPoi, naarPoi, _options = {}) { // Id weg beide GAGA
    // const vanPoi = ALL_POIS.find(p => p.id === vanPoiId); // GAGA
    // const naarPoi = ALL_POIS.find(p => p.id === naarPoiId); // GAGA
    // const transport = _options.transport === 'stairs' ? 'stairs': 'elevator' // trying to make transport idk work ig GAGA
    if (!vanPoi || !naarPoi) return null;
    // if (vanPoiId === naarPoiId) return null; // GAGA

    const vanNode = vindDichtstbijzijndeNode(vanPoi);
    const naarNode = vindDichtstbijzijndeNode(naarPoi);
    if (!vanNode || !naarNode) return null;

    const resultaat = dijkstra(vanNode, naarNode);
    console.log(resultaat);
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
        waypoints.push({ x: vanPoi.x, y: vanPoi.y, floor: vanPoi.floor_id }); // vanPoi.floor => vanPoi.floor_id GAGA
    }

    // Graph-nodes
    for (const nodeId of pad) {
        const node = graphNodes[nodeId];
        waypoints.push({ x: node.x, y: node.y, floor: floorNummer(node.floorId) });
    }

    // Eindpunt: POI-positie als die afwijkt van de laatste node
    const laatsteNode = graphNodes[pad[pad.length - 1]];
    if (naarPoi.x !== laatsteNode.x || naarPoi.y !== laatsteNode.y) {
        waypoints.push({ x: naarPoi.x, y: naarPoi.y, floor: naarPoi.floor_id }); // naarPoi.floor => naarPoi.floor_id GAGA
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
    const multiFloor = vanPoi.floor_id !== naarPoi.floor_id; // floor beide naar floor_id GAGA

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
                floor: t < 0.5 ? seg.a.floor_id : seg.b.floor_id, // beide floor => floor.id GAGA
            };
        }
        resterend -= seg.len;
    }

    return { ...waypoints[waypoints.length - 1] };}