import { usePage } from "@inertiajs/react";
import Navigation from "./Navigation";
import Footer from "./Footer";

function GuestLayout({children}){
    return(
        <>
            <Navigation/>
            <main className="main">
                {children}
            </main>
            <Footer/>
        </>
    );
}

export default GuestLayout;