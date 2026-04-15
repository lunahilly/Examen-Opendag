function Activity({data}){
    return(
        <article className={`activity ${data.course_id != null   ? 'activity_timeline' : 'activity_general'}`}>
            <h2>
                {
                    data.course !== null ? `${data.course.name} : ` : null
                }
                {
                    data.activity_type.name
                }
            </h2>
        </article>
    )
}

export default Activity;