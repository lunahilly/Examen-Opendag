<<<<<<< HEAD
import Button from "@/Components/Button";
import { usePage } from "@inertiajs/react";

function Navigation(){
    const user = usePage().props.auth.user;
    const url = usePage().url;
    return(
        <header className="header">
            <a href="/" className="header__logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGobTVE5BMJp30ofGiKWwKsfLzzDcZ5MQQQ&s" alt="MA logo" className="header__logo--image" />
            </a>
            <nav className="header__navigation">
                <a href="" className={`header__navigation--link ${url == '/' ? 'header__navigation--link-active' : null} `}>Home</a>
                <a href={route('information.index')} className={`header__navigation--link ${url == '/information' ? 'header__navigation--link-active' : null} `}>Opleidingen</a>
                <a href={route('stories.index')} className={`header__navigation--link ${url == '/stories' ? 'header__navigation--link-active' : null} `}>Verhalen van studenten</a>
                <a href={route('activities.index')} className={`header__navigation--link ${url == '/activities' ? 'header__navigation--link-active' : null} `}>Activiteiten</a>
                <a href={route('contact.index')} className={`header__navigation--link ${url == '/contact' ? 'header__navigation--link-active' : null} `}>Contact</a>
                {
                    user != null ? <Button label="CMS"/> : null
                }
            </nav>
=======
import { Link, usePage } from "@inertiajs/react";

const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Opleidingen", href: route("information.index") },
    { label: "Verhalen van studenten", href: route("stories.index") },
    { label: "Activiteiten", href: route("activities.index") },
    { label: "Contact", href: route("contact.index") },
];

function Navigation() {
    const { url, props } = usePage();

    const isActive = (href) => {
        const path = href.startsWith("http") ? new URL(href).pathname : href;

        if (href === "/") {
            return url === "/";
        }

        return url.startsWith(path);
    };

    return (
        <header className="header">
            <Link href="/" className="header__logo" aria-label="Mediacollege Amsterdam home">
                <img className="header__logo--image" src="/malogo.png" alt="MA logo" />
            </Link>

            <div className="header__right">
                <nav className="header__navigation">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`header__navigation--link ${isActive(item.href) ? "header__navigation--link-active" : ""}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                {props.auth?.user ? (
                    <Link href={route("dashboard")} className="header__admin">
                        Dashboard
                    </Link>
                ) : null}
            </div>
>>>>>>> 6a55dfd6116a833f51a2318bef8902c8beb852f4
        </header>
    );
}

export default Navigation;
