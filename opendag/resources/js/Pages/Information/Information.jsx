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
                <PageTitle id="info__title" title="Informatie per opleiding" />
                {
                    open != null ? (
                        <article className="course__article">
                            <Course course={courses[open]} />
                        </article>
                    ) : (
                        <article className="course__article">
                            <h2 className="course__name">
                                Klik op een opleiding voor meer informatie!
                            </h2>
                        </article>
                    )
                }
                <section className="courses">
                    <Head title="Informatie per opleiding" />
                    {
                        courses.map((course, index) =>
                            <>
                                <div className="courses__item" key={index}>
                                    <button onClick={() => openCourse(index)} className={`courses__item--dropdown ${open == index ? 'courses__item--dropdown-active' : null}`}>
                                        <p>{course.name}</p>
                                    </button>
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