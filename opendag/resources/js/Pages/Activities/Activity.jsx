import image from "../../../../img/image.jpg"

function Activity({ data, index }) {
    return (
        <article className="activity">
<<<<<<< HEAD
            <img className="activity__img" src={data.image} alt="vul in" />
=======
            <img className="activity__img" src={image} alt="vul in" />
>>>>>>> 7aae4e705cde5a72c1a1538b453c9a3634c96e0a
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