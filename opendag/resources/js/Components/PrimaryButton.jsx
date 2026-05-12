export default function PrimaryButton({
    className = "",
    disabled = false,
    children,
    type = "submit",
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            disabled={disabled}
            className={`inline-flex items-center rounded-md border border-transparent bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${className}`.trim()}
        >
            {children}
        </button>
    );
}
