import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

function Contact(){
    return(
        <GuestLayout>
            <Head title="Contact"/>
            <PageTitle title="Contact"/>
        </GuestLayout>
    );
}

export default Contact;