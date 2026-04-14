import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

function Activities(){
    const activities = usePage().props.activities;
    console.log(activities);
    return(
        <GuestLayout>
            <Head title="Activiteiten"/>
            <PageTitle title="Activiteiten"/>
            <section className="activities">
                {/* div.activities__ */}
                {activities[1].time}
            </section>
        </GuestLayout>
    );
}

export default Activities;