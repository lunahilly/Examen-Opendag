import Map from "@/Components/Map";
import Navigation from "@/Layouts/Navigation";
import { Head } from "@inertiajs/react";


function Welcome() {

    return (
        <>
            <Head title="welcome" />
            <Navigation />
            <main className="welcome">
                <Map/>
            </main>
        </>
    );
}

export default Welcome;
