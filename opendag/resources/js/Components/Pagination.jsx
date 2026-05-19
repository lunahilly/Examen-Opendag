const Pagination = ({data}) => {
    return(
        <span className="pagination">
            <a href={data.prev_page_url} className="pagination__link">Vorige</a>
            <span className="pagination__pages">
                {
                    data.links.map((item, index) =>
                        index == 0 || index == data.links.length - 1 ? null :
                        <a href={item.url} className={`pagination__pages--link ${item.active ? 'pagination__pages--link-active' : null}`} key={index}>{item.page}</a>
                    )
                }
            </span>
            <a href={data.next_page_url} className="pagination__link">Volgende</a>
        </span>
    );
}

export default Pagination;