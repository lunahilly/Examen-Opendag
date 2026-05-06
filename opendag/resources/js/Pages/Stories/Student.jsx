import { usePage } from "@inertiajs/react";

function Student({data}){
    const user = usePage().props.auth.user;
    console.log(user);
    return(
        <article className="student">
            <figure className="student__figure">
                <img src={data.image ?? ''} alt={data.name} className="student__figure--image" />
                {
                    user != null ? 
                        <a href={route('story.edit', data.id)} className="student__figure--link">Edit</a>
                    : null
                }
            </figure>
            <div className="student__details">
                <h3 className="student__details--name">{data.name}</h3>
                <h3 className="student__details--course">{data.course.name}</h3>
                <p className="student__details--story">{data.story}</p>
            </div>
        </article>
    );
}

export default Student;