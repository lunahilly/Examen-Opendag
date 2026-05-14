const Toggle = ({value, onChange}) => {
    return(
        <label className="toggle">
            <input type="checkbox" value={value} checked={value} onChange={onChange} className="toggle__checkbox" />
            <span className="toggle__slider"></span>
        </label>
    );
}

export default Toggle;