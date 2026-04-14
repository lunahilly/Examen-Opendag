import Navigation from "./Navigation";

function GuestLayout({children}){
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