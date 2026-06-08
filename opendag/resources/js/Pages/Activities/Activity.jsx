import parse from "html-react-parser";

function Activity({ data, index }) {
    return (
        <article className="activity">
            <img className="activity__img" src={data.image} alt="vul in" />
            <div className="activity__text">
                <h2 className="activity__title">{data.title}</h2>
                <p className="activity__description">{parse(data.description)}</p>
            </div>
            {/* Dit is een knop om te linken naar de plattegrond, hiervoor moet eerst toegevoegd worden dat je ee plek op de map kan toevoegen. */}
            {/* <button className="activity__button">
                Bekijk <p>{data.title}</p> op de plattegrond!
            </button> */}
        </article>
    )
}

export default Activity;