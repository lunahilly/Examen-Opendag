import { useRef, useState } from "react";
import styles from "../../../../scss/indoorMap.module.scss";
import { usePage } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";
import JSZip from "jszip";

function QRModal({ onClose }) {
    const base = `${window.location.origin}${window.location.pathname}`;
    const qrRefs = useRef({});
    const [downloading, setDownloading] = useState(false);
    const floors = usePage().props.floors;
    const pois = usePage().props.pois;
    const gridpois = pois.filter((poi) => poi.category.value !== "transport");

    // Render one POI's SVG into a labeled PNG Blob
    const renderQRBlob = async (poi) => {
        const svg = qrRefs.current[poi.value]; //poi.id => poi.value GAGA
        if (!svg) return null;

        let svgString = new XMLSerializer().serializeToString(svg);
        svgString = svgString.replace(/currentColor/g, "#000000");

        const svgBlob = new Blob([svgString], {
            type: "image/svg+xml;charset=utf-8",
        });
        const svgUrl = URL.createObjectURL(svgBlob);

        const img = new Image();
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = svgUrl;
        });

        const SIZE = 1024;
        const PAD = 60;
        const canvas = document.createElement("canvas");
        canvas.width = SIZE;
        canvas.height = SIZE + 140;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, PAD, PAD, SIZE - 2 * PAD, SIZE - 2 * PAD);
        URL.revokeObjectURL(svgUrl);

        ctx.fillStyle = "#000000";
        ctx.font = "bold 40px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(poi.label, SIZE / 2, SIZE + 60);

        const floor = floors.find((f) => f.id === poi.floor_id); // FLOORS => floors n poi.floor => poi.floor_id GAGA
        if (floor) {
            ctx.font = "28px sans-serif";
            ctx.fillStyle = "#666666";
            ctx.fillText(floor.name, SIZE / 2, SIZE + 100); // floor.name => floor.label GAGA
        }

        return new Promise((resolve) =>
            canvas.toBlob((blob) => resolve(blob), "image/png"),
        );
    };

    // Trigger a file download from a Blob
    const triggerDownload = (blob, filename) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = URL.createObjectURL(blob);
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    // Build safe filename from POI label
    const safeName = (poi) =>
        poi.label
            .replace(/[^a-z0-9]+/gi, "-")
            .toLowerCase()
            .replace(/^-|-$/g, "");

    // Single QR download (per card click)
    const downloadOne = async (poi) => {
        const blob = await renderQRBlob(poi);
        if (blob) triggerDownload(blob, `qr-${safeName(poi)}.png`);
    };

    // Bundle all QRs into one ZIP
    const downloadAll = async () => {
        if (downloading) return;
        setDownloading(true);

        const zip = new JSZip();
        const folder = zip.folder("qr-codes");

        for (const poi of gridpois) { // GRID_POIS => gridpois GAGA
            const blob = await renderQRBlob(poi);
            if (blob) folder.file(`qr-${safeName(poi)}.png`, blob);
        }

        const zipBlob = await zip.generateAsync({ type: "blob" });
        triggerDownload(zipBlob, "wayfinder-qr-codes.zip");
        setDownloading(false);
    };

    return (
        <div
            className={styles.qrOverlay}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className={styles.qrModal}>
                {/* Header */}
                <div className={styles.qrModalHeader}>
                    <div>
                        <div className={styles.qrModalTitle}>📱 QR-codes per ruimte</div>
                        <div className={styles.qrModalSub}>
                            Download alle QR-codes als ZIP en plak ze op de deur van elke
                            ruimte. Bezoekers scannen de code en de kaart opent automatisch
                            met die ruimte als startpunt. Klik op één code voor losse
                            download.
                        </div>
                    </div>
                    <div className={styles.qrModalActions}>
                        <button
                            className={styles.qrPrintBtn}
                            onClick={downloadAll}
                            disabled={downloading}
                        >
                            {downloading ? "⏳ Bezig…" : "⬇️ Download alles (ZIP)"}
                        </button>
                        <button className={styles.qrCloseBtn} onClick={onClose}>
                            ✕
                        </button>
                    </div>
                </div>

                {/* Grid of QR codes — click any card to download just that one */}
                <div className={styles.qrGrid}>
                    {gridpois.map((poi) => { //GRID_POIS => gridpois GAGA
                        const url = `${base}?hier=${poi.value}`; // poi.id => poi.value GAGA
                        const floor = floors.find((f) => f.id === poi.floor_id); // FLOORS => floors poi.floor => poi.floor_id GAGA
                        return (
                            <div
                                key={poi.id}
                                className={styles.qrItem}
                                onClick={() => downloadOne(poi)}
                                style={{ cursor: "pointer" }}
                                title={`Download QR voor ${poi.label}`}
                            >
                                <QRCodeSVG
                                    ref={(el) => {
                                        if (el) qrRefs.current[poi.value] = el; // poi.id => poi.value GAGA
                                    }}
                                    value={url}
                                    size={130}
                                    bgColor="transparent"
                                    fgColor="currentColor"
                                    level="M"
                                />
                                <span className={styles.qrItemIcon}>{poi.icon}</span>
                                <span className={styles.qrItemName}>{poi.label}</span>
                                <span className={styles.qrItemFloor}>{floor?.label}</span> {/* floor?.name => floor?.label GAGA*/}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default QRModal;