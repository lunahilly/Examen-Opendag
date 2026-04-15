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
        </header>
    );
}

export default Navigation;
