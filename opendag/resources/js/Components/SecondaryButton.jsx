export default function SecondaryButton({
    className = "",
    disabled = false,
    children,
    type = "button",
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${className}`.trim()}
        >
            {children}
        </button>
    );
}
