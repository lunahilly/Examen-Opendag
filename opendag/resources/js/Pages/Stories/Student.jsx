import { usePage } from "@inertiajs/react";

function Student({data}){
    const user = usePage().props.auth.user;
    return(
        <article className="student">
            <figure className="student__figure">
                <img src={data.image} alt={data.name} className="student__figure--image" />
            </figure>
            <div className="student__wrapper">
                <article className="student__details">
                    <h3 className="student__details--name">{data.name}</h3>
                    <p className="student__details--course">{data.course.name}</p>
                </article>
                <a href={route('stories.show', data.id)} className="student__link">
                    Lees het verhaal van {data.name} <i className="fa-solid fa-arrow-right student__link--icon"/>
                </a>
            </div>
        </article>
    );
}

export default Student;