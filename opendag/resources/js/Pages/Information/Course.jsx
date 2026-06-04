// dit is een test

import { usePage } from "@inertiajs/react";
import { filter } from "jszip";

function Course({ course }) {

    const pois = usePage().props.pois;
    console.log("pois :", pois);
    console.log("name :", course.name);
    const poi = pois.find((poi) => poi?.label == course.name);
    console.log("value :", poi.value);

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
                    <a
                        className="course__button"
                        href={`/?naar=${poi.value}`}
                    >
                        Bekijk <span className="course__button__highlighted">{course.name}</span> op de plattegrond!
                    </a>                </div>
            </div>
        </div>
    );
}

export default Course;