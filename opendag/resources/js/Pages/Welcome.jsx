import Map from "@/Components/Map";
import Navigation from "@/Layouts/Navigation";
import { Head } from "@inertiajs/react";
import Footer from "@/Layouts/Footer";


function Welcome() {

    return (
        <>
            <Head title="Home" />
            <Navigation />
            <main className="welcome">

                <Map />

            </main>
            <Footer />

        </>
    );
}

export default Welcome;
