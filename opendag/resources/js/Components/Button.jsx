const Button = ({label, onClick, route, type, isDisabled}) => {
    return route == null ? (
        <button onClick={onClick} type={type} disabled={isDisabled} className={label == 'Log uit' ? 'button button__logout' : 'button'}>
            {label}
        </button>
    ) : (
        <a href={route} className="button">{label}</a>
    )
    
    ;
}

export default Button;