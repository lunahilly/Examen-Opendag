// dit is een test


function Course({ course }) {
    return (
        <div className="course">
            <p className="course__info">
                {course.information}
            </p>
            <span className="course__wrapper">
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
                        <span className="course__details--item">
                            <p className="course__details--item-text">Stages:</p>
                            <p className="course__details--item-text">{course.internships}</p>
                        </span>
                        <span className="course__details--item">
                            <p className="course__details--item-text">Code:</p>
                            <p className="course__details--item-text">{course.code}</p>
                        </span>
                    </article>
                </div>
                <img src={course.image} alt="" className="course__image" />
            </span>
        </div>
    );
}

export default Course;