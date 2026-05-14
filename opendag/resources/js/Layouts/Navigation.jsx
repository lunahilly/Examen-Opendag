import Button from "@/Components/Button";
import { usePage } from "@inertiajs/react";

function Navigation(){
    const user = usePage().props.auth.user;
    const url = usePage().url;
    const settings = usePage().props.settings;
    return(
        <header className="header">
            <a href="/" className="header__logo">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGobTVE5BMJp30ofGiKWwKsfLzzDcZ5MQQQ&s" alt="MA logo" className="header__logo--image" />
            </a>
            <nav className="header__navigation">
                <a href="/" className={`header__navigation--link ${url == '/' ? 'header__navigation--link-active' : null} `}>Home</a>
                {
                    settings.courses ? 
                        <a href={route('information.index')} className={`header__navigation--link ${url == '/information' ? 'header__navigation--link-active' : null} `}>Opleidingen</a>
                    : null
                }
                {
                    settings.stories ? 
                        <a href={route('stories.index')} className={`header__navigation--link ${url == '/stories' ? 'header__navigation--link-active' : null} `}>Verhalen van studenten</a>
                    : null
                }
                {
                    settings.activities ? 
                        <a href={route('activities.index')} className={`header__navigation--link ${url == '/activities' ? 'header__navigation--link-active' : null} `}>Activiteiten</a>
                    : null
                }
                {
                    settings.contact ? 
                        <a href={route('contact.index')} className={`header__navigation--link ${url == '/contact' ? 'header__navigation--link-active' : null} `}>Contact</a>
                    : null
                }
                {
                    user != null ? 
                        <div className="header__dropdown">
                            <Button label="CMS"/>
                            <ul className="header__dropdown--list">
                                <li className="header__dropdown--item">
                                    <a href={route('course.create')} className="header__dropdown--item-link">New course</a>
                                </li>
                                <li className="header__dropdown--item">
                                    <a href={route('story.create')} className="header__dropdown--item-link">New story</a>
                                </li>
                                <li className="header__dropdown--item">
                                    <a href={route('activity.create')} className="header__dropdown--item-link">New activity</a>
                                </li>
                            </ul>
                        </div>
                    : null
                }
            </nav>
        </header>
    );
}

export default Navigation;
