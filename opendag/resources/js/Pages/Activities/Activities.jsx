import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";
import Activity from "./Activity";

function Activities(){
    const activities = usePage().props.activities;

    return(
        <GuestLayout>
            <Head title="Activiteiten"/>
            <PageTitle title="Activiteiten"/>
            <section className="activities">
                
                {
                    activities.map((activity, index) =>
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