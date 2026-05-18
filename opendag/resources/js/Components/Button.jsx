const Button = ({label, onClick, route, type, isDisabled, arrow}) => {
    return (
        <button onClick={onClick} type={type} disabled={isDisabled} className="button">
            {label}
            {arrow && <span className="button__arrow">→</span>}
        </button>
    );
}

export default Button;