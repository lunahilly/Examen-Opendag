function Student({data}){
    return(
        <article className="student">
            <img src={data.image ?? ''} alt={data.name} className="student__image" />
            <div className="student__details">
                <h3 className="student__details--name">{data.name}</h3>
                <h3 className="student__details--course">{data.course.name}</h3>
                <p className="student__details--story">{data.story}</p>
            </div>
        </article>
    );
}

export default Student;