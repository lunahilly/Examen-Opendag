import { useForm, usePage } from "@inertiajs/react";

function ActivityCourseModal({course, onClick}){
    const activities = usePage().props.activities;
    console.log(activities);
    const {data, setData, post, patch, processing, reset} = useForm({
        activity_id: null,
        course_id: course
    });

    const submit = (event) => {
        event.preventDefault();
        
    }

    return (
        <dialog className="modal" open>
            dWDWDW
            <span className="modal__header">
                <button onClick={onClick} className="modal__header--button">
                    <i className="fa-solid fa-close modal__header--button-icon"/>
                </button>
            </span>
            <form onSubmit={submit} className="modal__form">
                {
                    activities.map((item, index) => 
                        <label className="modal__form--label">
                            <input type="checkbox" className="modal__form--checkbox" />
                            {item.title}
                        </label>
                    )
                }
            </form>
        </dialog>
    );
}

export default ActivityCourseModal;