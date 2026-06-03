import { ALL_POIS } from './building'

export const floors = [
    { value: "floor-0", label: "Begane grond", shortLabel: "0", image: '/maps/Plattegrond_begane-grond.svg', viewBox: "0 0 1986.13 1704.1", wallStrokeClass: "cls-21" },
    { value: "floor-1", label: "Verdieping 1", shortLabel: "1", image: '/maps/Plattegrond_verdieping1.svg', viewBox: "0 0 2050.72 1704.1", wallStrokeClass: "cls-14" },
    { value: "floor-2", label: "Verdieping 2", shortLabel: "2", image: '/maps/Plattegrond_verdieping2.svg', viewBox: "0 0 2050.723 1704.1", wallStrokeClass: "cls-7" },
    { value: "floor-3", label: "Verdieping 3", shortLabel: "3", image: '/maps/Plattegrond_verdieping3.svg', viewBox: "0 0 2050.7234 1704.1", wallStrokeClass: "cls-2" },
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

const FLOOR_CHANGE_PENALTY = 2000;

function buildTransportNodesAndEdges() {
    const trapPOIs = ALL_POIS.filter(p => p.category === 'transport' && p.id.startsWith("trap"));
    const extraNodes = {};
    const extraEdges = [];

    for (const poi of trapPOIs) {
        extraNodes[poi.id] = { floorId: `floor-${poi.floor}`, x: poi.x, y: poi.y };
    }

    const trapGroups = {};

    // groepeer traps per nummer
    for (const poi of trapPOIs) {
        const group = getTrapGroup(poi.id);
        trapGroups[group] ??= [];
        trapGroups[group].push(poi);
    }

    // verbind traps per groep over floors
    for (const group of Object.values(trapGroups)) {
        const sorted = group.sort((a, b) => a.floor - b.floor);

        for (let i = 0; i < sorted.length - 1; i++) {
            extraEdges.push([sorted[i].id, sorted[i + 1].id, {
                label: "trap",
                isLift: false,
                weight: 2000
            }]);
        }
    }

    for (const poi of trapPOIs) {
        let dichtstbij = null;
        let kortste = Infinity;
        for (const [id, node] of Object.entries(graphNodes)) {
            if (node.floorId !== `floor-${poi.floor}`) continue;
            const d = afstand(node.x, node.y, poi.x, poi.y);
            if (d < kortste) {
                kortste = d;
                dichtstbij = id;
            }
        }
        if (dichtstbij) extraEdges.push([poi.id, dichtstbij]);
    }

    function getTrapGroup(id) {
        // trap-21 → "1"
        return id.split('-')[1][1];
    }

    return { extraNodes, extraEdges };
}

const verdiepingOpzoektabel = Object.fromEntries(floors.map(f => [f.value, f]));

function afstand(punt1x, punt1y, punt2x, punt2y) {
    return Math.hypot(punt2x - punt1x, punt2y - punt1y);
}

const { extraNodes, extraEdges } = buildTransportNodesAndEdges();

const allGraphNodes = { ...graphNodes, ...extraNodes };

function bouwVerbindingenOverzicht() {
    const overzicht = {};
    Object.keys(allGraphNodes).forEach(id => { overzicht[id] = []; });

    const allEdges = [...graphEdges, ...extraEdges];

    allEdges.forEach(([van, naar, opties = {}]) => {
        const kruispuntVan = allGraphNodes[van];
        const kruispuntNaar = allGraphNodes[naar];
        const reisgewicht = opties.weight ?? afstand(kruispuntVan.x, kruispuntVan.y, kruispuntNaar.x, kruispuntNaar.y);

        overzicht[van].push({ naar, gewicht: reisgewicht, label: opties.label ?? null, isLift: opties.isLift ?? false });
        overzicht[naar].push({ naar: van, gewicht: reisgewicht, label: opties.label ?? null, isLift: opties.isLift ?? false });
    });

    return overzicht;
}

const verbindingenOverzicht = bouwVerbindingenOverzicht();

function vindDichtsteKruispunt(locatie) {
    const verdiepingId = `floor-${locatie.floor}`;
    let besteKruispunt = null;
    let kortsteAfstand = Infinity;

    for (const [kruispuntId, kruispunt] of Object.entries(allGraphNodes)) {
        if (kruispunt.floorId !== verdiepingId) continue;
        const d = afstand(locatie.x, locatie.y, kruispunt.x, kruispunt.y);
        if (d < kortsteAfstand) {
            kortsteAfstand = d;
            besteKruispunt = kruispuntId;
        }
    }

    return besteKruispunt;
}

function kortsteRoute(startId, eindId) {
    const afstandPerKruispunt = {};
    const vorigeKruispunt = {};
    const alBezocht = new Set();

    Object.keys(verbindingenOverzicht).forEach(id => { afstandPerKruispunt[id] = Infinity; });
    afstandPerKruispunt[startId] = 0;

    const wachtrij = [{ id: startId, afstand: 0 }];

    while (wachtrij.length > 0) {
        wachtrij.sort((a, b) => a.afstand - b.afstand);
        const { id: huidigKruispunt } = wachtrij.shift();

        if (huidigKruispunt === eindId) break;
        if (alBezocht.has(huidigKruispunt)) continue;
        alBezocht.add(huidigKruispunt);

        for (const buur of verbindingenOverzicht[huidigKruispunt] ?? []) {
            if (alBezocht.has(buur.naar)) continue;

            const nieuweAfstand = afstandPerKruispunt[huidigKruispunt] + buur.gewicht;
            if (nieuweAfstand < afstandPerKruispunt[buur.naar]) {
                afstandPerKruispunt[buur.naar] = nieuweAfstand;
                vorigeKruispunt[buur.naar] = huidigKruispunt;
                wachtrij.push({ id: buur.naar, afstand: nieuweAfstand });
            }
        }
    }

    if (afstandPerKruispunt[eindId] === Infinity) return null;

    const pad = [];
    let stap = eindId;
    while (stap) {
        pad.unshift(stap);
        stap = vorigeKruispunt[stap];
    }

    return { pad, afstand: afstandPerKruispunt[eindId] };
}

export function computeRoute(vanLocatieId, naarLocatieId, _opties = {}) {
    const vanLocatie = ALL_POIS.find(p => p.id === vanLocatieId);
    const naarLocatie = ALL_POIS.find(p => p.id === naarLocatieId);
    if (!vanLocatie || !naarLocatie) return null;
    if (vanLocatieId === naarLocatieId) return null;

    const startKruispunt = vindDichtsteKruispunt(vanLocatie);
    const eindKruispunt = vindDichtsteKruispunt(naarLocatie);
    if (!startKruispunt || !eindKruispunt) return null;

    const routeResultaat = kortsteRoute(startKruispunt, eindKruispunt);
    if (!routeResultaat) return null;

    const { pad, afstand: totaleAfstand } = routeResultaat;

    const verdiepingNummer = (verdiepingId) => parseInt(verdiepingId.replace("floor-", ""), 10);

    const waypoints = [];

    const eersteKruispunt = allGraphNodes[pad[0]];
    if (vanLocatie.x !== eersteKruispunt.x || vanLocatie.y !== eersteKruispunt.y) {
        waypoints.push({ x: vanLocatie.x, y: vanLocatie.y, floor: vanLocatie.floor });
    }

    for (const kruispuntId of pad) {
        const kruispunt = allGraphNodes[kruispuntId];
        waypoints.push({ x: kruispunt.x, y: kruispunt.y, floor: verdiepingNummer(kruispunt.floorId) });
    }

    const laatsteKruispunt = allGraphNodes[pad[pad.length - 1]];
    if (naarLocatie.x !== laatsteKruispunt.x || naarLocatie.y !== laatsteKruispunt.y) {
        waypoints.push({ x: naarLocatie.x, y: naarLocatie.y, floor: naarLocatie.floor });
    }

    // Bouw de navigatiestappen op.
    // Trappen zijn als opeenvolgende kanten gekoppeld (verdieping 1 → 0, verdieping 2 → 1, …).
    // Als het pad zo'n keten gebruikt, willen we precies ÉÉN instructie die het
    // vervoermiddel en de verdieping waar de gebruiker echt uitkomt benoemt.
    // Aanpak: bij een verdiepingswisseling verder scannen door eventuele volgende stappen
    // met hetzelfde vervoerlabel en de verdieping van het laatste knooppunt gebruiken.
    const navigatieStappen = [];
    navigatieStappen.push({ icon: "start", text: `Start bij ${vanLocatie.label}`, type: "start" });

    const gebruikteTransport = new Set();

    for (let i = 0; i < pad.length - 1; i++) {
        const huidig = allGraphNodes[pad[i]];
        const volgende = allGraphNodes[pad[i + 1]];

        if (huidig.floorId === volgende.floorId) continue;

        const verbinding = (verbindingenOverzicht[pad[i]] ?? []).find(b => b.naar === pad[i + 1]);
        if (!verbinding?.label) continue;

        // Sla over als er al een stap voor deze trap/lift is aangemaakt.
        if (gebruikteTransport.has(verbinding.label)) continue;
        gebruikteTransport.add(verbinding.label);

        // Vooruitkijken: volg alle opeenvolgende stappen met hetzelfde vervoerlabel
        // om de verdieping te vinden waar de gebruiker echt uitkomt.
        let eindFloorId = volgende.floorId;
        for (let j = i + 1; j < pad.length - 1; j++) {
            const vNext = (verbindingenOverzicht[pad[j]] ?? []).find(b => b.naar === pad[j + 1]);
            if (vNext?.label === verbinding.label && allGraphNodes[pad[j]].floorId !== allGraphNodes[pad[j + 1]].floorId) {
                eindFloorId = allGraphNodes[pad[j + 1]].floorId;
            } else {
                break;
            }
        }

        const doelVerdieping = verdiepingOpzoektabel[eindFloorId]?.label ?? eindFloorId;
        const isLift = verbinding.label.includes("Lift");
        navigatieStappen.push({
            icon: isLift ? "elevator" : "stairs",
            text: `${verbinding.label} naar ${doelVerdieping}`,
            type: isLift ? "elevator" : "stairs",
        });
    }

    navigatieStappen.push({ icon: "arrive", text: `Aangekomen bij ${naarLocatie.label}`, type: "arrive" });

    const afstandInMeters = Math.max(1, Math.round(totaleAfstand * 0.08));
    const reistijdInMinuten = Math.max(1, Math.round(afstandInMeters / 60));
    const meerdereVerdiepingen = vanLocatie.floor !== naarLocatie.floor;

    return { waypoints, steps: navigatieStappen, totalDistance: afstandInMeters, totalMinutes: reistijdInMinuten, multiFloor: meerdereVerdiepingen };
}

export function getPosisieOpRoute(waypoints, voortgang) {
    if (!waypoints || waypoints.length < 2) return null;
    if (voortgang <= 0) return { ...waypoints[0] };
    if (voortgang >= 1) return { ...waypoints[waypoints.length - 1] };

    let totaaleLengte = 0;
    const segmenten = [];
    for (let i = 1; i < waypoints.length; i++) {
        const a = waypoints[i - 1], b = waypoints[i];
        const lengte = Math.max(Math.hypot(b.x - a.x, b.y - a.y), 1);
        segmenten.push({ a, b, lengte });
        totaaleLengte += lengte;
    }

    let resterend = voortgang * totaaleLengte;
    for (const segment of segmenten) {
        if (resterend <= segment.lengte) {
            const t = resterend / segment.lengte;
            return {
                x: segment.a.x + (segment.b.x - segment.a.x) * t,
                y: segment.a.y + (segment.b.y - segment.a.y) * t,
                floor: t < 0.5 ? segment.a.floor : segment.b.floor,
            };
        }
        resterend -= segment.lengte;
    }

    return { ...waypoints[waypoints.length - 1] };
}