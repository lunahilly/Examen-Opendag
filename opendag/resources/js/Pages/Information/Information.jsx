import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import Course from "./Course";

function Information() {
    const courses = usePage().props.courses;
    console.log(courses);
    const [open, setOpen] = useState(null);

    const openCourse = (id) => {
        if (open == id) {
            setOpen(null);
            return;
        }
        setOpen(id);
    }
    console.log(open);
    return (
        <GuestLayout>
            <div className="wrapper courses__wrapper">
                <PageTitle title="Informatie per opleiding" />
                <section className="courses">
                    <Head title="Informatie per opleiding" />
                    {
                        courses.map((course, index) =>
                            <>
                                <div className="courses__item" key={index}>
                                    <button onClick={() => openCourse(index)} className={`courses__item--dropdown ${open == index ? 'courses__item--dropdown-active' : null}`}>{course.name}
                                        {
                                            open == index ?
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="turn_180 bi bi-chevron-left" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                                </svg>
                                                :
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="rotate_180 bi bi-chevron-left" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                                                </svg>
                                        }
                                    </button>
                                    {
                                        open == index ?
                                            <Course course={courses[open]} />
                                            : null
                                    }
                                </div >
                                {/* {
                                index == 11 ? <span className="break"></span> : null
                            } */}
                            </>
                        )
                    }
                </section>
            </div>

        </GuestLayout >
    );
}

export default Information; 