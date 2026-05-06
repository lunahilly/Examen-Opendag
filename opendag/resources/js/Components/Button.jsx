const Button = ({label, onClick, route, type, isDisabled}) => {
    return (
        <button onClick={onClick} type={type} disabled={isDisabled} className="button">
            {label}
        </button>
    );
}

export default Button;