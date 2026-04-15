import { useEffect, useState } from "react";
import {
    defaultDestinationId,
    defaultStartId,
    floors,
    getRoute,
    locationColumns,
    locations,
} from "@/data/campusWayfinding";

function renderWalkableShape(shape, index) {
    if (shape.type === "rect") {
        return (
            <rect
                key={`walkable-${index}`}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
            />
        );
    }

    if (shape.type === "polygon") {
        return <polygon key={`walkable-${index}`} points={shape.points} />;
    }

    if (shape.type === "polyline") {
        return <polyline key={`walkable-${index}`} points={shape.points} />;
    }

    if (shape.type === "path") {
        return <path key={`walkable-${index}`} d={shape.d} />;
    }

    return null;
}

function Map() {
    const [selectedStartId, setSelectedStartId] = useState(defaultStartId);
    const [selectedDestinationId, setSelectedDestinationId] = useState(defaultDestinationId);
    const [wallOverlayMarkup, setWallOverlayMarkup] = useState("");
    const [selectedFloorId, setSelectedFloorId] = useState(
        getRoute(defaultStartId, defaultDestinationId)?.floorsInRoute[0] ?? floors[0].value,
    );

    const route = getRoute(selectedStartId, selectedDestinationId);
    const activeFloor = floors.find((floor) => floor.value === selectedFloorId) ?? floors[0];
    const currentLocations = locations.filter(
        (location) => location.floorId === activeFloor.value,
    );
    const floorRoute = route?.path.filter((point) => point.floorId === activeFloor.value) ?? [];
    const floorRouteNodes = floorRoute.filter((point) => point.isNode);
    const walkableClipId = `wayfinding-walkable-${activeFloor.value}`;
    const routeClipPath =
        activeFloor.walkableAreas?.length > 0
            ? `url(#${walkableClipId})`
            : undefined;

    useEffect(() => {
        const nextRoute = getRoute(selectedStartId, selectedDestinationId);

        if (!nextRoute) {
            return;
        }

        setSelectedFloorId((currentFloorId) =>
            nextRoute.floorsInRoute.includes(currentFloorId)
                ? currentFloorId
                : nextRoute.floorsInRoute[0] ?? nextRoute.destination.floorId,
        );
    }, [selectedDestinationId, selectedStartId]);

    useEffect(() => {
        let cancelled = false;

        async function loadWallOverlay() {
            if (!activeFloor.image || !activeFloor.wallStrokeClass) {
                setWallOverlayMarkup("");
                return;
            }

            try {
                const response = await fetch(activeFloor.image);
                const svgSource = await response.text();

                if (cancelled) {
                    return;
                }

                const parser = new DOMParser();
                const svgDocument = parser.parseFromString(svgSource, "image/svg+xml");
                const wallElements = svgDocument.querySelectorAll(`.${activeFloor.wallStrokeClass}`);
                const serializer = new XMLSerializer();
                const markup = Array.from(wallElements)
                    .map((element) => serializer.serializeToString(element))
                    .join("");

                setWallOverlayMarkup(markup);
            } catch {
                if (!cancelled) {
                    setWallOverlayMarkup("");
                }
            }
        }

        loadWallOverlay();

        return () => {
            cancelled = true;
        };
    }, [activeFloor.image, activeFloor.wallStrokeClass]);

    const handleDestinationSelect = (locationId) => {
        setSelectedDestinationId(locationId);
    };

    return (
        <section className="wayfinding">
            <div className="wayfinding__canvas-shell">
                <div className="wayfinding__canvas">
                    <p className="wayfinding__canvas-label">Mediacollege plattegrond</p>
                    <img
                        className="wayfinding__image"
                        src={activeFloor.image}
                        alt={`Plattegrond van ${activeFloor.label}`}
                    />

                    <svg
                        className="wayfinding__overlay"
                        viewBox={activeFloor.viewBox}
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden="true"
                    >
                        {activeFloor.walkableAreas?.length ? (
                            <defs>
                                <clipPath id={walkableClipId} clipPathUnits="userSpaceOnUse">
                                    {activeFloor.walkableAreas.map(renderWalkableShape)}
                                </clipPath>
                            </defs>
                        ) : null}

                        <g clipPath={routeClipPath}>
                            {floorRoute.length > 1 ? (
                                <polyline
                                    className="wayfinding__route-line"
                                    points={floorRoute
                                        .map((point) => `${point.x},${point.y}`)
                                        .join(" ")}
                                />
                            ) : null}

                            {floorRouteNodes.map((point, index) => (
                                <circle
                                    key={`${point.id}-${index}`}
                                    className="wayfinding__route-node"
                                    cx={point.x}
                                    cy={point.y}
                                    r={index === floorRouteNodes.length - 1 ? 18 : 12}
                                />
                            ))}
                        </g>

                        {wallOverlayMarkup ? (
                            <g
                                className="wayfinding__wall-overlay"
                                dangerouslySetInnerHTML={{ __html: wallOverlayMarkup }}
                            />
                        ) : null}

                        {currentLocations.map((location) => {
                            const isStart = location.id === selectedStartId;
                            const isDestination = location.id === selectedDestinationId;
                            const isActive = isStart || isDestination;

                            return (
                                <g
                                    key={location.id}
                                    className={`wayfinding__marker wayfinding__marker--${location.kind} ${isActive ? "wayfinding__marker--active" : ""}`}
                                    onClick={() => handleDestinationSelect(location.id)}
                                >
                                    <circle
                                        className="wayfinding__marker-ring"
                                        cx={location.marker.x}
                                        cy={location.marker.y}
                                        r={isActive ? 24 : 17}
                                    />
                                    <circle
                                        className="wayfinding__marker-core"
                                        cx={location.marker.x}
                                        cy={location.marker.y}
                                        r={isActive ? 10 : 7}
                                    />
                                </g>
                            );
                        })}
                    </svg>

                    <div className="wayfinding__floors" aria-label="Verdiepingen">
                        {floors.map((floor) => {
                            const isActive = floor.value === activeFloor.value;
                            const hasRoute = route?.floorsInRoute.includes(floor.value);

                            return (
                                <button
                                    key={floor.value}
                                    type="button"
                                    className={`wayfinding__floor-button ${isActive ? "wayfinding__floor-button--active" : ""} ${hasRoute ? "wayfinding__floor-button--route" : ""}`}
                                    onClick={() => setSelectedFloorId(floor.value)}
                                >
                                    {floor.shortLabel}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="wayfinding__controls">
                <label className="wayfinding__field">
                    <span className="wayfinding__field-title">
                        <span className="wayfinding__field-dot" />
                        Vanaf
                    </span>
                    <select
                        className="wayfinding__select"
                        value={selectedStartId}
                        onChange={(event) => setSelectedStartId(event.target.value)}
                    >
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="wayfinding__field">
                    <span className="wayfinding__field-title">
                        <span className="wayfinding__field-dot" />
                        Naar
                    </span>
                    <select
                        className="wayfinding__select"
                        value={selectedDestinationId}
                        onChange={(event) => setSelectedDestinationId(event.target.value)}
                    >
                        {locations.map((location) => (
                            <option key={location.id} value={location.id}>
                                {location.label}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="wayfinding__directory">
                {locationColumns.map((column) => (
                    <section key={column.id} className="wayfinding__directory-column">
                        <div className="wayfinding__directory-list">
                            {locations
                                .filter((location) => location.columnId === column.id)
                                .map((location) => {
                                    const isActive = location.id === selectedDestinationId;

                                    return (
                                        <button
                                            key={location.id}
                                            type="button"
                                            className={`wayfinding__directory-item ${isActive ? "wayfinding__directory-item--active" : ""}`}
                                            onClick={() => handleDestinationSelect(location.id)}
                                        >
                                            <span className="wayfinding__directory-checkbox" />
                                            <span className="wayfinding__directory-copy">{location.label}</span>
                                        </button>
                                    );
                                })}
                        </div>
                    </section>
                ))}
            </div>
        </section>
    );
}

export default Map;
