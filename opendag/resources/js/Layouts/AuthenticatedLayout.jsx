import Navigation from "./Navigation";

function AuthenticatedLayout({children}){
    return(
        <>
            <Navigation/>
            {children}
        </>
    );
}

export default AuthenticatedLayout;