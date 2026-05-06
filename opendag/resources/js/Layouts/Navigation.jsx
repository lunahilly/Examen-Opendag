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
        </header>
    );
}

export default Navigation;
