import { usePage } from "@inertiajs/react";
import Navigation from "./Navigation";

function GuestLayout({children}){
    console.log(usePage());
    return(
        <>
            <Navigation/>
            <main className="main">
                {children}
            </main>
        </>
    );
}

export default GuestLayout;