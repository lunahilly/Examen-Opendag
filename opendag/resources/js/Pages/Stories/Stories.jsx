import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Student from "./Student";
import { useEffect, useState } from "react";

function Stories() {
    const stories = usePage().props.stories;
    const courses = usePage().props.courses;
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        setFiltered(stories);
    }, []);

    console.log(courses);

    const filterCourses = (event) => {
        if (event.target.value != "") {
            setFiltered(stories.filter((item) => item.course_id == event.target.value));
        }
        else {
            setFiltered(stories);
        }
    }

    return (
        <GuestLayout>
            <Head className="wrapper" title="Verhalen van studenten" />
            <main className="main wrapper">
                <PageTitle title="Verhalen van studenten" />
                <section className="stories">
                    <div className="stories__dropdown">
                        <select onChange={filterCourses} name="" id="" className="dropdown">
                            <option value="" className="dropdown__option">Alle opleidingen</option>
                            {
                                courses.map((item, index) =>
                                    <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="stories__students">
                        {
                            filtered.map((item, index) =>
                                <Student data={item} key={index} />
                            )
                        }
                    </div>
                </section>
            </main>
        </GuestLayout>
    );
}

export default Stories;