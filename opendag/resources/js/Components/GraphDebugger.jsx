import { useState } from "react";
import { graphNodes, graphEdges } from "../data/campusWayfinding";

const W = 800, H = 500;
const floorIdFromNum = (n) => `floor-${n}`;

// Transparante SVG-overlay die nodes en edges over de kaart tekent
export default function GraphDebugger({ floor = 0 }) {
    const [hovered, setHovered] = useState(null);
    const [showEdges, setShowEdges] = useState(true);
    const [showLabels, setShowLabels] = useState(true);

    const activeFloor = floorIdFromNum(floor);

    const floorNodes = Object.entries(graphNodes)
        .filter(([, n]) => n.floorId === activeFloor);

    const floorEdges = graphEdges.filter(([a, b, opts]) => {
        const na = graphNodes[a], nb = graphNodes[b];
        if (!na || !nb) return false;
        if (opts?.label) return false;
        return na.floorId === activeFloor && nb.floorId === activeFloor;
    });

    const verticalEdges = graphEdges.filter(([a, b, opts]) => {
        if (!opts?.label) return false;
        const na = graphNodes[a], nb = graphNodes[b];
        if (!na || !nb) return false;
        return na.floorId === activeFloor || nb.floorId === activeFloor;
    });

    return (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 50 }}>
            <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 6, zIndex: 51, pointerEvents: "auto" }}>
                <button onClick={() => setShowEdges(v => !v)} style={{
                    padding: "3px 8px", fontSize: 11, fontFamily: "monospace",
                    background: showEdges ? "rgba(224,64,251,0.2)" : "rgba(0,0,0,0.5)",
                    border: `1px solid ${showEdges ? "#e040fb" : "#555"}`,
                    color: showEdges ? "#e040fb" : "#888", borderRadius: 4, cursor: "pointer",
                }}>{showEdges ? "●" : "○"} Edges</button>
                <button onClick={() => setShowLabels(v => !v)} style={{
                    padding: "3px 8px", fontSize: 11, fontFamily: "monospace",
                    background: showLabels ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.5)",
                    border: `1px solid ${showLabels ? "#ccc" : "#555"}`,
                    color: showLabels ? "#fff" : "#888", borderRadius: 4, cursor: "pointer",
                }}>{showLabels ? "●" : "○"} Labels</button>
            </div>

            <svg viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} preserveAspectRatio="xMidYMid meet">
                {showEdges && floorEdges.map(([a, b], i) => {
                    const na = graphNodes[a], nb = graphNodes[b];
                    return <line key={`e${i}`} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#e040fb" strokeWidth={2.5} strokeLinecap="round" opacity={0.8} />;
                })}

                {verticalEdges.map(([a, b, opts], i) => {
                    const na = graphNodes[a], nb = graphNodes[b];
                    const local = na.floorId === activeFloor ? na : nb;
                    const isLift = opts?.label?.includes("Lift");
                    const color = isLift ? "#38bdf8" : "#f59e0b";
                    return (
                        <g key={`v${i}`}>
                            <circle cx={local.x} cy={local.y} r={14} fill="none" stroke={color} strokeWidth={1.5} opacity={0.5} strokeDasharray="4 3" />
                            <text x={local.x} y={local.y - 20} textAnchor="middle" fontSize={7} fontWeight={700} fill={color} fontFamily="monospace">{opts.label}</text>
                        </g>
                    );
                })}

                {floorNodes.map(([id, node]) => {
                    const isHov = hovered === id;
                    const lw = id.length * 6 + 10;
                    return (
                        <g key={id} style={{ pointerEvents: "auto", cursor: "pointer" }} onMouseEnter={() => setHovered(id)} onMouseLeave={() => setHovered(null)}>
                            {isHov && <circle cx={node.x} cy={node.y} r={14} fill="none" stroke="#e040fb" strokeWidth={1} opacity={0.6} />}
                            <circle cx={node.x} cy={node.y} r={isHov ? 7 : 5} fill="rgba(224,64,251,0.3)" stroke="#e040fb" strokeWidth={2} />
                            {(showLabels || isHov) && (
                                <g transform={`translate(${node.x}, ${node.y - 12})`}>
                                    <rect x={-lw / 2} y={-7} width={lw} height={13} rx={3} fill="rgba(15,15,26,0.9)" stroke={isHov ? "#e040fb" : "#444"} strokeWidth={0.5} />
                                    <text textAnchor="middle" dominantBaseline="central" fontSize={8} fontWeight={isHov ? 700 : 500} fill={isHov ? "#e040fb" : "#ddd"} fontFamily="monospace">{id}</text>
                                </g>
                            )}
                            {isHov && <text x={node.x} y={node.y + 16} textAnchor="middle" fontSize={7} fill="#888" fontFamily="monospace">({node.x}, {node.y})</text>}
                        </g>
                    );
                })}
            </svg>

            {hovered && (
                <div style={{ position: "absolute", bottom: 8, left: 8, right: 8, padding: "6px 10px", background: "rgba(15,15,26,0.95)", border: "1px solid #333", borderRadius: 6, fontSize: 11, fontFamily: "monospace", color: "#ddd", pointerEvents: "none" }}>
                    <strong style={{ color: "#e040fb" }}>{hovered}</strong>
                    <span style={{ color: "#666", margin: "0 6px" }}>→</span>
                    {graphEdges.filter(([a, b]) => a === hovered || b === hovered).map(([a, b, opts]) => {
                        const other = a === hovered ? b : a;
                        const label = opts?.label;
                        const isLift = label?.includes("Lift");
                        return (
                            <span key={other} style={{
                                display: "inline-block", margin: "1px 2px", padding: "1px 5px",
                                background: label ? (isLift ? "rgba(56,189,248,0.15)" : "rgba(245,158,11,0.15)") : "rgba(224,64,251,0.12)",
                                border: `1px solid ${label ? (isLift ? "rgba(56,189,248,0.4)" : "rgba(245,158,11,0.4)") : "rgba(224,64,251,0.3)"}`,
                                borderRadius: 3, fontSize: 10,
                                color: label ? (isLift ? "#38bdf8" : "#f59e0b") : "#e040fb",
                            }}>{other}{label ? ` (${label})` : ""}</span>
                        );
                    })}
                </div>
            )}
        </div>
    );
}