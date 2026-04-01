import Navigation from "./Navigation";

function AuthenticatedLayout({children}){
    return(
        <>
            <Navigation/>
            this is authenticated
            {children}
        </>
    );
}

export default AuthenticatedLayout;