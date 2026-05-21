function Activity({ data, index }) {
    return (
        <article className="activity">
            <img className="activity__img" src={data.image} alt="vul in" />
            <div className="activity__text">
                <h2 className="activity__title">{data.title}</h2>
                <p className="activity__description">{data.description}</p>
            </div>
            <button className="activity__button">
                Bekijk <p>{data.title}</p> op de plattegrond!
            </button>
        </article>
    )
}

export default Activity;