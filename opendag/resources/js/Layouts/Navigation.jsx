import { usePage } from "@inertiajs/react";

function Navigation(){
    const url = usePage().url;
    return(
        <header className="header">
            <a href="/" className="header__logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGobTVE5BMJp30ofGiKWwKsfLzzDcZ5MQQQ&s" alt="MA logo" className="header__logo--image" />
            </a>
            <nav className="header__navigation">
                <a href="" className={`header__navigation--link ${url == '/' ? 'header__navigation--link-active' : null} `}>Home</a>
                <a href={route('information.index')} className={`header__navigation--link ${url == '/information' ? 'header__navigation--link-active' : null} `}>Opleidingen</a>
                <a href="" className={`header__navigation--link ${url == '' ? 'header__navigation--link-active' : null} `}>Verhalen van studenten</a>
                <a href="" className={`header__navigation--link ${url == '' ? 'header__navigation--link-active' : null} `}>Activiteiten</a>
                <a href="" className={`header__navigation--link ${url == '' ? 'header__navigation--link-active' : null} `}>Contact</a>
            </nav>
        </header>
    );
}

export default Navigation;