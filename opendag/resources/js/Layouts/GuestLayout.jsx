import { usePage } from "@inertiajs/react";
import Navigation from "./Navigation";
import Footer from "./Footer";

function GuestLayout({ children }) {
    return (
        <div className="layout">
            <Navigation />

            <main className="main">
                {children}
            </main>

            <Footer />
        </div>
    );
}

export default GuestLayout;