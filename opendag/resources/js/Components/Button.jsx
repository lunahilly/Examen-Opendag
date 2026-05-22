const Button = ({label, onClick, route, type, isDisabled, arrow}) => {
    return route == null ? (
        <button onClick={onClick} type={type} disabled={isDisabled} className="button">
            {label}
            {arrow && <span className="button__arrow">→</span>}
        </button>
    ) : (
        <a href={route} className="button">{label}</a>
    )
    
    ;
}

export default Button;