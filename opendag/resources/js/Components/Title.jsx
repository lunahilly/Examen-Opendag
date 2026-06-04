const PageTitle = ({title}) => {
    return (
        <span className="head">
            {
                title == 'Verhalen van studenten' ? 
                <i className="fa-regular fa-message head__icon"/>
                : null
            }
            {title}
        </span>
    );
}

export default PageTitle;