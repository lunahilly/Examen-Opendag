const InputField = ({label, value, onChange, type, error, onClick, children, required}) => {
    return(
        <div className="input">
            <label className={required ? 'input__label input__label--required' : 'input__label'} data-end={required ? ' *' : null}>{label}</label>
            <span className="input__wrapper">
                <input type={type != null ? type : 'text'} value={value} onChange={onChange} className="input__field" />
                {
                    onClick != undefined ? <button type="button" onClick={onClick} className="input__button">+</button> : null
                }
            </span>
            {children}
            {
                error ? <p className="input__error">{error}</p> : null
            }
        </div>
    );
}

export default InputField;