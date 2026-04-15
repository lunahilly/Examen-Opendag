import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Student from "./Student";
import { useEffect, useState } from "react";

function Stories(){
    const stories = usePage().props.stories;
    const courses = usePage().props.courses;
    console.log(stories);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        setFiltered(stories);
    }, []);

    const filterCourses = (event) => {
        console.log(event.target.value);
        if(event.target.value != ""){
            setFiltered(stories.filter((item) => item.course_id == event.target.value));
        }
        else{
            setFiltered(stories);
        }
    }
    
    return(
        <GuestLayout>
            <Head title="Verhalen van studenten"/>
            <PageTitle title="Verhalen van studenten"/>
            <section className="stories">
                <select onChange={filterCourses} name="" id="" className="dropdown">
                    <option value="" className="dropdown__option">Alle opleidingen</option>
                    {
                        courses.map((item, index) => 
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select>
                <div className="stories__students">
                    {
                        filtered.map((item, index) => 
                            <Student data={item} key={index}/>
                        )
                    }
                </div>
            </section>
        </GuestLayout>
    );
}

export default Stories;