function Activity({data}){
    return(
        <article>
            <h2>{data.course_id} : {data.activity_type_id}</h2>
        </article>
    )

}

export default Activity;