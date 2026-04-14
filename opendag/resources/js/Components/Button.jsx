const Button = ({label, onClick, route, type}) => {
    return (
        <button onClick={onClick} type={type} className="button">
            {label}
        </button>
    );
}

export default Button;