// dit is een test


function Course({ course }) {
    return (
        <div className="course">
            <h2 className="course__name">{course.name}</h2>
            <div className="course__wrapper">

                <div className="course__info">
                    <p className="course__text">
                        {course.information}
                    </p>
                    <span>
                        <div className="course__details">
                            <article className="course__details--career">
                                <h3 className="course__details--career-head">Carriere mogelijkheden:</h3>
                                <ul className="course__details--career-list">
                                    {
                                        course.careers.map((item, index) =>
                                            <li className="course__details--career-item" key={index}>{item}</li>
                                        )
                                    }
                                </ul>
                            </article>
                            <article className="course__details--wrapper">
                                <span className="course__details--item">
                                    <p className="course__details--item-text">Duur:</p>
                                    <p className="course__details--item-text">{course.duration}</p>
                                </span>
                                {/* <span className="course__details--item">
                                    <p className="course__details--item-text">Stages:</p>
                                    <p className="course__details--item-text">{course.internships}</p>
                                </span>
                                <span className="course__details--item">
                                    <p className="course__details--item-text">Code:</p>
                                    <p className="course__details--item-text">{course.code}</p>
                                </span> */}
                            </article>
                        </div>
                    </span>
                </div>
                <div className="course__right">
                    <img src={course.image} alt="" className="course__image" />
                    <button className="course__button">Bekijk  <span className="course__button__highlighted">{course.name}</span>    op de plattegrond!</button>
                </div>
            </div>
        </div>
    );
}

export default Course;