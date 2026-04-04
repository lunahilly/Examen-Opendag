import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

function Stories(){
    return(
        <GuestLayout>
            <Head title="Verhalen van studenten"/>
            <PageTitle title="Verhalen van studenten"/>
            <section className="stories">
                
            </section>
        </GuestLayout>
    );
}

export default Stories;