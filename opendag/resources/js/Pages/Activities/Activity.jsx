function Activity({data}){
    return(
        <article>
            <h2>{data.course !== null ? `${data.course.name} : ` : null} {data.activity_type.name}</h2>
        </article>
    )

}

export default Activity;