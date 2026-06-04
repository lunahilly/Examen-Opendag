import JSZip from "jszip";
import { useRef, useState } from "react";
import styles from "../../../scss/indoorMap.module.scss";
import { usePage } from "@inertiajs/react";
import { QRCodeSVG } from "qrcode.react";

function QRModal({ onClose }) {
    const base = `${window.location.origin}${window.location.pathname}`;
    const qrRefs = useRef({});
    const [downloading, setDownloading] = useState(false);
    const pois = usePage().props.pois;
    const gridpois = pois.filter((p) => p.category.name !== "transport");
    const floors = usePage().props.floors;

    const renderQRBlob = async (poi) => {
        const svg = qrRefs.current[poi.id];
        if (!svg) return null;

        let svgString = new XMLSerializer().serializeToString(svg);
        svgString = svgString.replace(/currentColor/g, "#000000");

        const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
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

        const floor = floors.find((f) => f.id === poi.floor_id);
        if (floor) {
            ctx.font = "28px sans-serif";
            ctx.fillStyle = "#666666";
            ctx.fillText(floor.name, SIZE / 2, SIZE + 100);
        }

        return new Promise((resolve) =>
            canvas.toBlob((blob) => resolve(blob), "image/png"),
        );
    };

    const triggerDownload = (blob, filename) => {
        const link = document.createElement("a");
        link.download = filename;
        link.href = URL.createObjectURL(blob);
        link.click();
        setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    const safeName = (poi) =>
        poi.label
            .replace(/[^a-z0-9]+/gi, "-")
            .toLowerCase()
            .replace(/^-|-$/g, "");

    const downloadOne = async (poi) => {
        const blob = await renderQRBlob(poi);
        if (blob) triggerDownload(blob, `qr-${safeName(poi)}.png`);
    };

    const downloadAll = async () => {
        if (downloading) return;
        setDownloading(true);
        const zip = new JSZip();
        const folder = zip.folder("qr-codes");
        for (const poi of gridpois) {
            const blob = await renderQRBlob(poi);
            if (blob) folder.file(`qr-${safeName(poi)}.png`, blob);
        }
        const zipBlob = await zip.generateAsync({ type: "blob" });
        triggerDownload(zipBlob, "Ma-OpenDag-QR-codes.zip");
        setDownloading(false);
    };

    return (
        <div
            className={styles.qrOverlay}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className={styles.qrModal}>
                <div className={styles.qrModalHeader}>
                    <div>
                        <div className={styles.qrModalTitle}>📱 QR-codes per ruimte</div>
                        <div className={styles.qrModalSub}>
                            Download alle QR-codes als ZIP en plak ze op de deur van elke
                            ruimte. Bezoekers scannen de code en de kaart opent automatisch
                            met die ruimte als startpunt. Klik op één code voor losse download.
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
                        <button className={styles.qrCloseBtn} onClick={onClose}>✕</button>
                    </div>
                </div>
                <div className={styles.qrGrid}>
                    {gridpois.map((poi) => {
                        const url = `${base}?hier=${poi.id}`;
                        const floor = floors.find((f) => f.id === poi.floor_id);
                        return (
                            <div
                                key={poi.id}
                                className={styles.qrItem}
                                onClick={() => downloadOne(poi)}
                                style={{ cursor: "pointer" }}
                                title={`Download QR voor ${poi.label}`}
                            >
                                <QRCodeSVG
                                    ref={(el) => { if (el) qrRefs.current[poi.id] = el; }}
                                    value={url}
                                    size={130}
                                    bgColor="transparent"
                                    fgColor="currentColor"
                                    level="M"
                                />
                                <span className={styles.qrItemIcon}>
                                    <img src={`/icons/${poi.icon}.webp`} alt="" style={{ width: 16, height: 16, verticalAlign: 'middle' }} />
                                </span>
                                <span className={styles.qrItemName}>{poi.label}</span>
                                <span className={styles.qrItemFloor}>{floor?.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default QRModal;