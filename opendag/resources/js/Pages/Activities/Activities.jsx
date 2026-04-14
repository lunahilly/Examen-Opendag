import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Activity from "./Activity";
import { list } from "postcss";

function Activities(){
    const activities = usePage().props.activities;
    console.log(activities);

    const withCourse = activities.filter((item) =>  item.course_id != null);
    const withoutCourse = activities.filter((item) => item.course_id == null);
    

    return(
        <GuestLayout>
            <Head title="Activiteiten"/>
            <PageTitle title="Activiteiten"/>
            <section className="activities__general">
                {
                    withoutCourse.map((activity, index) =>
                        <>
                            <Activity data={activity} key={index}/>
                        </>
                    )
                }
            </section>
            <section className="activities__line">
                <div className="activities__timeline" />
                {
                    withCourse.map((activity, index) =>
                        <>
                            <Activity data={activity} key={index}/>
                        </>
                    )
                }
            </section>
        </GuestLayout>
    );
}

export default Activities;