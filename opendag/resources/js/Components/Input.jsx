const InputField = ({label, value, onChange, type, error}) => {
    return(
        <div className="input">
            <label className="input__label">{label}</label>
            <input type={type != null ? type : 'text'} value={value} onChange={onChange} className="input__field" />
            {
                error ? <p className="input__error">{error}</p> : null
            }
        </div>
    );
}

export default InputField;