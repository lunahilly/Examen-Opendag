import Map from "@/Components/Map";
import Navigation from "@/Layouts/Navigation";
import { Head, usePage } from "@inertiajs/react";


function Welcome() {
    console.log(usePage().props.pois);
    return (
        <>
            <Head title="Home" />
            <Navigation />
            <main className="welcome">
                <Map />

            </main>
        </>
    );
}

export default Welcome;
