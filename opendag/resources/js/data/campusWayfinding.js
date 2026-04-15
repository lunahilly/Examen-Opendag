import floorZero from "../../../Plattegrond/Plattegrond_begane-grond.svg";
import floorOne from "../../../Plattegrond/Plattegrond_verdieping1.svg";
import floorTwo from "../../../Plattegrond/Plattegrond_verdieping2.svg";
import floorThree from "../../../Plattegrond/Plattegrond_verdieping3.svg";

export const floors = [
    {
        value: "floor-0",
        label: "Begane grond",
        shortLabel: "0",
        image: floorZero,
        viewBox: "0 0 1986.13 1704.1",
    },
    {
        value: "floor-1",
        label: "Verdieping 1",
        shortLabel: "1",
        image: floorOne,
        viewBox: "0 0 2050.72 1704.1",
    },
    {
        value: "floor-2",
        label: "Verdieping 2",
        shortLabel: "2",
        image: floorTwo,
        viewBox: "0 0 2050.723 1704.1",
    },
    {
        value: "floor-3",
        label: "Verdieping 3",
        shortLabel: "3",
        image: floorThree,
        viewBox: "0 0 2050.7234 1704.1",
    },
];

export const locationColumns = [
    {
        id: "column-1",
        label: "Opleidingen",
    },
    {
        id: "column-2",
        label: "Meer opleidingen",
    },
    {
        id: "column-3",
        label: "Startpunten & service",
    },
];

const graphNodes = {
    "f0-entrance": { floorId: "floor-0", x: 70.14, y: 600.17 },
    "f0-lobby": { floorId: "floor-0", x: 138.56, y: 661.1 },
    "f0-welcome": { floorId: "floor-0", x: 356.43, y: 661.1 },
    "f0-west-hall": { floorId: "floor-0", x: 356.43, y: 862.81 },
    "f0-west-lower": { floorId: "floor-0", x: 307.49, y: 939.4 },
    "f0-south-west": { floorId: "floor-0", x: 408.01, y: 969.87 },
    "f0-stairs-north": { floorId: "floor-0", x: 625.18, y: 862.81 },
    "f0-ruimtelijk-access": { floorId: "floor-0", x: 625.18, y: 971.58 },
    "f0-service": { floorId: "floor-0", x: 625.18, y: 1025.19 },
    "f0-stairs-center": { floorId: "floor-0", x: 829.01, y: 1021.61 },
    "f0-south-center": { floorId: "floor-0", x: 829.01, y: 1137.97 },
    "f0-main-center": { floorId: "floor-0", x: 1098.39, y: 1021.61 },
    "f0-main-east": { floorId: "floor-0", x: 1469.63, y: 1021.61 },
    "f0-east-center": { floorId: "floor-0", x: 1633.05, y: 1029.78 },
    "f0-upper-center": { floorId: "floor-0", x: 829.01, y: 899.06 },
    "f0-upper-main": { floorId: "floor-0", x: 1077.03, y: 899.06 },
    "f0-upper-east": { floorId: "floor-0", x: 1469.63, y: 899.06 },
    "f0-bpv": { floorId: "floor-0", x: 1633.05, y: 867.4 },
    "f0-kantine": { floorId: "floor-0", x: 1633.03, y: 1137.97 },
    "f1-stairs-north": { floorId: "floor-1", x: 375.77, y: 644.82 },
    "f1-west-turn": { floorId: "floor-1", x: 429.56, y: 644.82 },
    "f1-west-corridor-north": { floorId: "floor-1", x: 429.56, y: 665.25 },
    "f1-main-north": { floorId: "floor-1", x: 644.37, y: 665.25 },
    "f1-lab-access": { floorId: "floor-1", x: 644.37, y: 862.86 },
    "f1-lab": { floorId: "floor-1", x: 644.37, y: 862.86 },
    "f1-west-south": { floorId: "floor-1", x: 592.28, y: 973.33 },
    "f1-main": { floorId: "floor-1", x: 761.13, y: 863.03 },
    "f1-center": { floorId: "floor-1", x: 816.96, y: 863.03 },
    "f1-center-lower": { floorId: "floor-1", x: 816.96, y: 981.25 },
    "f1-main-south": { floorId: "floor-1", x: 931.01, y: 1024.01 },
    "f1-mid": { floorId: "floor-1", x: 1143.43, y: 1024.01 },
    "f1-connector": { floorId: "floor-1", x: 1331.69, y: 1049.08 },
    "f1-east": { floorId: "floor-1", x: 1468.62, y: 1077.25 },
    "f1-upper": { floorId: "floor-1", x: 931.01, y: 440.74 },
    "f2-stairs-west": { floorId: "floor-2", x: 344.39, y: 873.02 },
    "f2-west": { floorId: "floor-2", x: 438.35, y: 873.02 },
    "f2-west-south": { floorId: "floor-2", x: 438.35, y: 1173.62 },
    "f2-mid-west": { floorId: "floor-2", x: 699.71, y: 1097.7 },
    "f2-mid": { floorId: "floor-2", x: 699.71, y: 1172.94 },
    "f2-center": { floorId: "floor-2", x: 851.63, y: 1223.83 },
    "f2-east": { floorId: "floor-2", x: 1234.95, y: 1227.75 },
    "f2-top": { floorId: "floor-2", x: 1207.03, y: 1097.7 },
    "f2-bridge": { floorId: "floor-2", x: 1207.03, y: 1097.7 },
    "f3-entry": { floorId: "floor-3", x: 803.25, y: 439 },
    "f3-core": { floorId: "floor-3", x: 1059.63, y: 987.18 },
    "f3-lower": { floorId: "floor-3", x: 1189.63, y: 1273.49 },
    "f3-east": { floorId: "floor-3", x: 1592.5, y: 1317.49 },
};

const graphEdges = [
    [
        "f0-entrance",
        "f0-lobby",
        { points: [[70.14, 600.17], [70.14, 661.1], [138.56, 661.1]] },
    ],
    ["f0-lobby", "f0-welcome", { points: [[138.56, 661.1], [356.43, 661.1]] }],
    ["f0-welcome", "f0-west-hall", { points: [[356.43, 661.1], [356.43, 862.81]] }],
    [
        "f0-west-hall",
        "f0-west-lower",
        { points: [[356.43, 862.81], [307.49, 862.81], [307.49, 939.4]] },
    ],
    [
        "f0-west-lower",
        "f0-south-west",
        { points: [[307.49, 939.4], [356.44, 939.4], [408.01, 939.4], [408.01, 969.87]] },
    ],
    [
        "f0-south-west",
        "f0-ruimtelijk-access",
        { points: [[408.01, 969.87], [625.18, 969.87], [625.18, 971.58]] },
    ],
    ["f0-west-hall", "f0-stairs-north", { points: [[356.43, 862.81], [625.18, 862.81]] }],
    ["f0-ruimtelijk-access", "f0-service", { points: [[625.18, 971.58], [625.18, 1025.19]] }],
    [
        "f0-stairs-north",
        "f0-upper-center",
        { points: [[625.18, 862.81], [625.18, 872.13], [829, 872.13], [829.01, 899.06]] },
    ],
    ["f0-upper-center", "f0-upper-main", { points: [[829.01, 899.06], [1077.03, 899.06]] }],
    ["f0-upper-main", "f0-upper-east", { points: [[1077.03, 899.06], [1469.63, 899.06]] }],
    [
        "f0-upper-east",
        "f0-bpv",
        { points: [[1469.63, 899.06], [1469.63, 867.4], [1633.05, 867.4]] },
    ],
    ["f0-upper-center", "f0-stairs-center", { points: [[829.01, 899.06], [829.01, 1021.61]] }],
    [
        "f0-stairs-center",
        "f0-service",
        { points: [[829.01, 1021.61], [829.01, 1137.97], [625.18, 1137.97], [625.18, 1025.19]] },
    ],
    ["f0-stairs-center", "f0-south-center", { points: [[829.01, 1021.61], [829.01, 1137.97]] }],
    [
        "f0-south-center",
        "f0-ruimtelijk-access",
        { points: [[829.01, 1137.97], [625.18, 1137.97], [625.18, 971.58]] },
    ],
    ["f0-stairs-center", "f0-main-center", { points: [[829.01, 1021.61], [1098.39, 1021.61]] }],
    ["f0-main-center", "f0-main-east", { points: [[1098.39, 1021.61], [1469.63, 1021.61]] }],
    [
        "f0-main-east",
        "f0-east-center",
        {
            points: [
                [1469.63, 1021.61],
                [1469.63, 1060.42],
                [1573.8, 1060.42],
                [1573.8, 1029.78],
                [1633.05, 1029.78],
            ],
        },
    ],
    ["f0-east-center", "f0-kantine", { points: [[1633.05, 1029.78], [1633.03, 1137.97]] }],
    ["f0-east-center", "f0-bpv", { points: [[1633.05, 1029.78], [1633.05, 867.4]] }],
    ["f1-stairs-north", "f1-west-turn", { points: [[375.77, 644.82], [429.56, 644.82]] }],
    ["f1-west-turn", "f1-west-corridor-north", { points: [[429.56, 644.82], [429.56, 665.25]] }],
    ["f1-west-corridor-north", "f1-main-north", { points: [[429.56, 665.25], [644.37, 665.25]] }],
    ["f1-main-north", "f1-lab-access", { points: [[644.37, 665.25], [644.37, 862.86]] }],
    ["f1-lab-access", "f1-lab", { points: [[644.37, 862.86], [644.37, 862.86]] }],
    ["f1-lab", "f1-west-south", { points: [[644.37, 862.86], [592.28, 862.86], [592.28, 973.33]] }],
    [
        "f1-west-south",
        "f1-center-lower",
        { points: [[592.28, 973.33], [592.96, 973.33], [592.96, 1024.01], [816.96, 1024.01], [816.96, 981.25]] },
    ],
    ["f1-main", "f1-center", { points: [[761.13, 863.03], [816.96, 863.03]] }],
    ["f1-center", "f1-center-lower", { points: [[816.96, 863.03], [816.96, 981.25]] }],
    [
        "f1-center-lower",
        "f1-main-south",
        { points: [[816.96, 981.25], [931.01, 981.25], [931.01, 1024.01]] },
    ],
    ["f1-main-south", "f1-mid", { points: [[931.01, 1024.01], [1143.43, 1024.01]] }],
    [
        "f1-mid",
        "f1-connector",
        { points: [[1143.43, 1024.01], [1307.18, 1024.01], [1307.18, 1049.08], [1331.69, 1049.08]] },
    ],
    [
        "f1-connector",
        "f1-east",
        { points: [[1331.69, 1049.08], [1331.69, 1074.18], [1468.62, 1074.18], [1468.62, 1077.25]] },
    ],
    ["f1-lab-access", "f1-main", { points: [[644.37, 862.86], [761.13, 863.03]] }],
    [
        "f1-center",
        "f1-upper",
        {
            points: [
                [816.96, 863.03],
                [816.96, 554.1],
                [788.71, 554.1],
                [788.71, 497.18],
                [746.84, 497.18],
                [746.84, 440.74],
                [931.01, 440.74],
            ],
        },
    ],
    ["f2-stairs-west", "f2-west", { points: [[344.39, 873.02], [438.35, 873.02]] }],
    ["f2-west", "f2-west-south", { points: [[438.35, 873.02], [438.35, 1173.62]] }],
    ["f2-west-south", "f2-mid", { points: [[438.35, 1173.62], [699.71, 1173.62], [699.71, 1172.94]] }],
    ["f2-mid", "f2-mid-west", { points: [[699.71, 1172.94], [699.71, 1097.7]] }],
    ["f2-mid", "f2-center", { points: [[699.71, 1172.94], [699.71, 1223.83], [851.63, 1223.83]] }],
    [
        "f2-center",
        "f2-east",
        { points: [[851.63, 1223.83], [954.27, 1223.83], [954.27, 1227.75], [1234.95, 1227.75]] },
    ],
    ["f2-east", "f2-top", { points: [[1234.95, 1227.75], [1207.03, 1227.75], [1207.03, 1097.7]] }],
    ["f2-top", "f2-bridge", { points: [[1207.03, 1097.7], [1207.03, 1097.7]] }],
    ["f3-entry", "f3-core", { points: [[803.25, 439], [1059.63, 987.18]] }],
    ["f3-core", "f3-lower", { points: [[1059.63, 987.18], [1103.07, 1079.52], [1146.35, 1176.51], [1189.63, 1273.49]] }],
    ["f3-lower", "f3-east", { points: [[1189.63, 1273.49], [1504.64, 1123.61], [1592.5, 1317.49]] }],
    ["f0-stairs-north", "f1-stairs-north", { label: "Trap Noord", weight: 340 }],
    ["f0-stairs-center", "f1-center-lower", { label: "Trap Midden", weight: 310 }],
    ["f1-center-lower", "f2-stairs-west", { label: "Trap Zuid", weight: 340 }],
    ["f1-east", "f2-bridge", { label: "Trap Oost", weight: 360 }],
    ["f2-bridge", "f3-entry", { label: "Trap Atelier", weight: 320 }],
];

export const locations = [
    {
        id: "audiovisueel-specialist",
        label: "Audiovisueel specialist",
        floorId: "floor-1",
        nodeId: "f1-lab-access",
        columnId: "column-1",
        kind: "course",
        area: "Noordblok",
        description: "Ontdek camera, montage en productie op de set.",
        marker: { x: 592, y: 863 },
    },
    {
        id: "software-development",
        label: "Software development",
        floorId: "floor-1",
        nodeId: "f1-upper",
        columnId: "column-1",
        kind: "course",
        area: "Studiohoek",
        description: "Code, games en interactieve tools bouwen.",
        marker: { x: 931, y: 441 },
    },
    {
        id: "podium-en-event-techniek",
        label: "Podium en event techniek",
        floorId: "floor-1",
        nodeId: "f1-east",
        columnId: "column-1",
        kind: "course",
        area: "Oostvleugel",
        description: "Licht, geluid en techniek achter producties.",
        marker: { x: 1521, y: 981 },
    },
    {
        id: "sign-specialist",
        label: "Sign specialist",
        floorId: "floor-0",
        nodeId: "f0-upper-main",
        columnId: "column-1",
        kind: "course",
        area: "Middenhal",
        description: "Werk aan wayfinding, print en visuele signing.",
        marker: { x: 1077, y: 899 },
    },
    {
        id: "media-redactie",
        label: "Media redactie",
        floorId: "floor-1",
        nodeId: "f1-connector",
        columnId: "column-1",
        kind: "course",
        area: "Redactiezone",
        description: "Schrijven, interviewen en verhalen redigeren.",
        marker: { x: 1331, y: 1049 },
    },
    {
        id: "creatieve-productie",
        label: "Creatieve productie",
        floorId: "floor-2",
        nodeId: "f2-center",
        columnId: "column-1",
        kind: "course",
        area: "Projectvloer",
        description: "Van concept tot productieplanning en uitvoering.",
        marker: { x: 851, y: 1224 },
    },
    {
        id: "filmacteur",
        label: "Filmacteur",
        floorId: "floor-1",
        nodeId: "f1-mid",
        columnId: "column-1",
        kind: "course",
        area: "Scenelab",
        description: "Performance, camera-acting en scenespel.",
        marker: { x: 1143, y: 1024 },
    },
    {
        id: "immersive-designer",
        label: "Immersive designer",
        floorId: "floor-3",
        nodeId: "f3-core",
        columnId: "column-2",
        kind: "course",
        area: "Atelier 3",
        description: "XR, ruimtelijke installaties en interactieve beleving.",
        marker: { x: 1059, y: 987 },
    },
    {
        id: "allround-mediamaker",
        label: "Allround mediamaker",
        floorId: "floor-1",
        nodeId: "f1-main",
        columnId: "column-2",
        kind: "course",
        area: "Makerstraat",
        description: "Video, social content en snelle producties.",
        marker: { x: 761, y: 863 },
    },
    {
        id: "ruimtelijk-vormgever",
        label: "Ruimtelijk vormgever",
        floorId: "floor-0",
        nodeId: "f0-ruimtelijk-access",
        columnId: "column-2",
        kind: "course",
        area: "Presentatieruimte",
        description: "Werk aan exposities, sets en ruimtelijke concepten.",
        marker: { x: 592, y: 970 },
    },
    {
        id: "media-vormgever",
        label: "Media vormgever",
        floorId: "floor-2",
        nodeId: "f2-mid",
        columnId: "column-2",
        kind: "course",
        area: "Studio 2",
        description: "Branding, interfaces en visuele concepten.",
        marker: { x: 699, y: 1173 },
    },
    {
        id: "e-commerce-design",
        label: "E-commerce design",
        floorId: "floor-2",
        nodeId: "f2-east",
        columnId: "column-2",
        kind: "course",
        area: "Commerce lab",
        description: "Ontwerp storefronts, campagnes en customer journeys.",
        marker: { x: 1235, y: 1228 },
    },
    {
        id: "game-artist",
        label: "Game artist",
        floorId: "floor-2",
        nodeId: "f2-top",
        columnId: "column-2",
        kind: "course",
        area: "Visual lab",
        description: "Characters, werelden en 3D-assets voor games.",
        marker: { x: 1436, y: 502 },
    },
    {
        id: "welkombalie",
        label: "Welkombalie",
        floorId: "floor-0",
        nodeId: "f0-welcome",
        columnId: "column-3",
        kind: "start",
        area: "Hoofdhal",
        description: "Startpunt voor ontvangst, vragen en routehulp.",
        marker: { x: 356, y: 661 },
    },
    {
        id: "ingang",
        label: "Ingang",
        floorId: "floor-0",
        nodeId: "f0-entrance",
        columnId: "column-3",
        kind: "service",
        area: "Begane grond",
        description: "De hoofdingang aan de straatzijde.",
        marker: { x: 70, y: 600 },
    },
    {
        id: "aanmelden",
        label: "Aanmelden",
        floorId: "floor-0",
        nodeId: "f0-service",
        columnId: "column-3",
        kind: "service",
        area: "Servicepunt",
        description: "Check-in en registratie voor bezoekers.",
        marker: { x: 625, y: 1025 },
    },
    {
        id: "kantine",
        label: "Kantine",
        floorId: "floor-0",
        nodeId: "f0-kantine",
        columnId: "column-3",
        kind: "service",
        area: "Oostvleugel",
        description: "Koffie, lunch en korte pauzes tijdens de open dag.",
        marker: { x: 1633, y: 1138 },
    },
    {
        id: "bpv-bureau",
        label: "BPV-bureau",
        floorId: "floor-0",
        nodeId: "f0-bpv",
        columnId: "column-3",
        kind: "service",
        area: "Routepunt",
        description: "Vragen over stages, begeleiding en praktijkleren.",
        marker: { x: 1633, y: 867 },
    },
    {
        id: "decaan",
        label: "Decaan",
        floorId: "floor-0",
        nodeId: "f0-upper-east",
        columnId: "column-3",
        kind: "service",
        area: "Adviespunt",
        description: "Studiekeuze en begeleiding bespreken.",
        marker: { x: 1469, y: 899 },
    },
];

export const defaultStartId = "welkombalie";
export const defaultDestinationId = "ruimtelijk-vormgever";

const floorLookup = Object.fromEntries(
    floors.map((floor) => [floor.value, floor]),
);

const locationLookup = Object.fromEntries(
    locations.map((location) => [location.id, location]),
);

function calculateDistance(fromId, toId) {
    const from = graphNodes[fromId];
    const to = graphNodes[toId];

    if (!from || !to) {
        return 1;
    }

    return Math.hypot(to.x - from.x, to.y - from.y);
}

function toPathPoint(point, fallbackFloorId) {
    if (Array.isArray(point)) {
        return {
            x: point[0],
            y: point[1],
            floorId: fallbackFloorId,
        };
    }

    return {
        x: point.x,
        y: point.y,
        floorId: point.floorId ?? fallbackFloorId,
    };
}

function buildEdgePoints(fromId, toId, rawPoints = null) {
    const from = graphNodes[fromId];
    const to = graphNodes[toId];

    if (!from || !to) {
        return [];
    }

    if (!rawPoints || rawPoints.length === 0) {
        return [
            { x: from.x, y: from.y, floorId: from.floorId },
            { x: to.x, y: to.y, floorId: to.floorId },
        ];
    }

    const floorId = from.floorId;

    return rawPoints.map((point) => toPathPoint(point, floorId));
}

function reverseEdgePoints(points) {
    return [...points]
        .reverse()
        .map((point) => ({ ...point }));
}

function calculatePathLength(points) {
    if (points.length < 2) {
        return 0;
    }

    return points.slice(1).reduce((total, point, index) => {
        const previous = points[index];

        if (previous.floorId !== point.floorId) {
            return total;
        }

        return total + Math.hypot(point.x - previous.x, point.y - previous.y);
    }, 0);
}

function createAdjacencyList() {
    const adjacency = {};

    Object.keys(graphNodes).forEach((nodeId) => {
        adjacency[nodeId] = [];
    });

    graphEdges.forEach(([from, to, options = {}]) => {
        const points = buildEdgePoints(from, to, options.points);
        const edge = {
            from,
            to,
            label: options.label ?? null,
            points,
            weight: options.weight ?? calculatePathLength(points) ?? calculateDistance(from, to),
        };

        adjacency[from].push(edge);
        adjacency[to].push({
            ...edge,
            from: to,
            to: from,
            points: reverseEdgePoints(points),
        });
    });

    return adjacency;
}

const adjacencyList = createAdjacencyList();

function findShortestPath(startNodeId, endNodeId) {
    const distances = {};
    const previous = {};
    const queue = new Set(Object.keys(graphNodes));

    Object.keys(graphNodes).forEach((nodeId) => {
        distances[nodeId] = Number.POSITIVE_INFINITY;
        previous[nodeId] = null;
    });

    distances[startNodeId] = 0;

    while (queue.size > 0) {
        let currentNodeId = null;
        let bestDistance = Number.POSITIVE_INFINITY;

        queue.forEach((nodeId) => {
            if (distances[nodeId] < bestDistance) {
                bestDistance = distances[nodeId];
                currentNodeId = nodeId;
            }
        });

        if (!currentNodeId || currentNodeId === endNodeId) {
            break;
        }

        queue.delete(currentNodeId);

        adjacencyList[currentNodeId].forEach((edge) => {
            if (!queue.has(edge.to)) {
                return;
            }

            const nextDistance = distances[currentNodeId] + edge.weight;

            if (nextDistance < distances[edge.to]) {
                distances[edge.to] = nextDistance;
                previous[edge.to] = currentNodeId;
            }
        });
    }

    if (distances[endNodeId] === Number.POSITIVE_INFINITY) {
        return [];
    }

    const path = [];
    let pointer = endNodeId;

    while (pointer) {
        path.unshift(pointer);
        pointer = previous[pointer];
    }

    return path;
}

function getEdgeBetween(fromNodeId, toNodeId) {
    return adjacencyList[fromNodeId]?.find((edge) => edge.to === toNodeId) ?? null;
}

export function getLocationById(locationId) {
    return locationLookup[locationId] ?? null;
}

export function getFloorById(floorId) {
    return floorLookup[floorId] ?? null;
}

export function getRoute(startLocationId, destinationLocationId) {
    const start = getLocationById(startLocationId);
    const destination = getLocationById(destinationLocationId);

    if (!start || !destination) {
        return null;
    }

    const nodePath =
        start.nodeId === destination.nodeId
            ? [start.nodeId]
            : findShortestPath(start.nodeId, destination.nodeId);

    const path = [];

    nodePath.forEach((nodeId, index) => {
        const node = graphNodes[nodeId];

        if (!node) {
            return;
        }

        if (index === 0) {
            path.push({
                id: nodeId,
                ...node,
                isNode: true,
            });
            return;
        }

        const previousNodeId = nodePath[index - 1];
        const edge = getEdgeBetween(previousNodeId, nodeId);
        const edgePoints = edge?.points ?? [
            { x: graphNodes[previousNodeId].x, y: graphNodes[previousNodeId].y, floorId: graphNodes[previousNodeId].floorId },
            { x: node.x, y: node.y, floorId: node.floorId },
        ];

        edgePoints.forEach((point, pointIndex) => {
            if (index > 0 && pointIndex === 0) {
                return;
            }

            const lastPoint = path[path.length - 1];

            if (
                lastPoint &&
                lastPoint.x === point.x &&
                lastPoint.y === point.y &&
                lastPoint.floorId === point.floorId
            ) {
                return;
            }

            path.push({
                id: `${previousNodeId}-${nodeId}-${pointIndex}`,
                ...point,
                isNode: pointIndex === edgePoints.length - 1,
            });
        });
    });

    const floorsInRoute = [];
    const transitions = [];

    nodePath.forEach((nodeId, index) => {
        const node = graphNodes[nodeId];

        if (!node) {
            return;
        }

        if (!floorsInRoute.includes(node.floorId)) {
            floorsInRoute.push(node.floorId);
        }

        const nextNodeId = nodePath[index + 1];

        if (!nextNodeId) {
            return;
        }

        const nextNode = graphNodes[nextNodeId];
        const edge = getEdgeBetween(nodeId, nextNodeId);

        if (nextNode && nextNode.floorId !== node.floorId) {
            transitions.push({
                fromFloorId: node.floorId,
                toFloorId: nextNode.floorId,
                label: edge?.label ?? "Verdiepingswissel",
            });
        }
    });

    return {
        start,
        destination,
        path,
        floorsInRoute,
        transitions,
    };
}
