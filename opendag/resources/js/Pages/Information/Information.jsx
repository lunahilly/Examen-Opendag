import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";
import Course from "./Course";

function Information(){
    const courses = usePage().props.courses;
    console.log(courses);
    const [open, setOpen] = useState(null);

    const openCourse = (id) => {
        if(open == id){
            setOpen(null);
            return;
        }
        setOpen(id);
    }
    console.log(open);
    return(
        <GuestLayout>
            <PageTitle title="Informatie per opleiding"/>
            <section className="courses">
                {
                    courses.map((course, index) => 
                        <div className="courses__item" key={index}>
                            <button onClick={() => openCourse(index)} className={`courses__item--dropdown ${open == index ? 'courses__item--dropdown-active' : null}`}>{course.name}
                                {
                                    open == index ? <p>^</p> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                                    </svg>
                                }
                            </button>
                            {
                                open == index ?
                                <Course course={courses[open]}/>
                                : null
                            }
                        </div>
                    )
                }
                
            </section>
        </GuestLayout>
    );
}

export default Information; 