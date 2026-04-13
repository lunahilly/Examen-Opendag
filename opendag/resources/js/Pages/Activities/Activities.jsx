import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, usePage } from "@inertiajs/react";

function Activities(){
    const activities = usePage().props.activities;

    return(
        <GuestLayout>
            <Head title="Activiteiten"/>
            <PageTitle title="Activiteiten"/>
            <section className="activities">
                {/* div.activities__ */}
            </section>
        </GuestLayout>
    );
}

export default Activities;