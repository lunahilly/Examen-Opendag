import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Activity from "./Activity";

import { useState } from "react";

function Activities(){
    const activities = usePage().props.activities;
    console.log(activities);

    const withCourse = activities.filter((item) =>  item.course_id != null);
    const withoutCourse = activities.filter((item) => item.course_id == null);
    const [open, setOpen] = useState(null);
    // const [openline, setOpenline] = useState(null);
    
    const openList = (id) => {
        if(open == id){
            setOpen(null);
            return;
        }
        setOpen(id);
    }
    

    return(
        <GuestLayout>
            <Head title="Activiteiten"/>
            <PageTitle title="Activiteiten"/>
            <section className="activities__general">
                <button onClick={() => openList(withoutCourse[0].id)} className={`courses__item--dropdown ${open == withCourse[0].id ? 'courses__item--dropdown-active' : null}`}>Algemene activiteiten
                    {
                        open == withoutCourse[0].id ? <p>^</p> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                        </svg>
                    }
                </button>
                {
                    withoutCourse.map((activity, index) =>
                        <>
                            {
                                open == withoutCourse[0].id ?
                                <Activity data={activity} key={index}/>
                                : null
                            }
                        </>
                    )
                }
            </section>
            
            <section className="activities__line">
                <button onClick={() => openList(withCourse[0].id)} className={`courses__item--dropdown ${open == withCourse[0].id ? 'courses__item--dropdown-active' : null}`}>Activiteiten tijdlijn
                    {
                        open == withCourse[0].id ? <p>^</p> :
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                            </svg>
                    }
                </button>
                {
                    open == withCourse[0].id ?
                    <div className="activities__timeline" /> : null
                }
                {
                    withCourse.map((activity, index) =>
                        <>
                            {
                                open == withCourse[0].id ?
                                <Activity data={activity} key={index}/>
                                : null
                            }
                        </>
                    )
                }
            </section>
        </GuestLayout>
    );
}

export default Activities;