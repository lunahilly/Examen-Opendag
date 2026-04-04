const Checkbox = ({label, value, onChange}) => {
    return(
        <label className="checkbox">
            <input type="checkbox" checked={value} onChange={onChange} className="checkbox__input" />
            {label}
        </label>
    );
}

export default Checkbox;