export default function Modal({ show = false, onClose, children }) {
    if (!show) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            onClick={onClose}
        >
            <div
                className="w-full max-w-2xl rounded-lg bg-white shadow-xl"
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
