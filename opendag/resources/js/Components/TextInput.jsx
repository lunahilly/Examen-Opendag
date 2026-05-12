import { forwardRef, useEffect, useRef } from "react";

const TextInput = forwardRef(function TextInput(
    { className = "", isFocused = false, type = "text", ...props },
    ref,
) {
    const inputRef = ref ?? useRef(null);

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [inputRef, isFocused]);

    return (
        <input
            {...props}
            type={type}
            ref={inputRef}
            className={`rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 ${className}`.trim()}
        />
    );
});

export default TextInput;
