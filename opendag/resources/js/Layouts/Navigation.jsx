import Button from "@/Components/Button";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

function Navigation() {
    const user = usePage().props.auth.user;
    const url = usePage().url;
    const settings = usePage().props.settings;
    const [isSmaller, setIsSmaller] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);

    const screenSize = () => {
        if (isSmaller == false && window.innerWidth < 750) {
            setIsSmaller(true);
        }
        else {
            setIsSmaller(false);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', screenSize);
    }, []);

    useEffect(() => {
        if (openMenu == true) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "unset";
        }
    }, [openMenu]);

    return isSmaller ? (
        <header className="header">
            <span className="header__menu">
                <button onClick={() => setOpenMenu(!openMenu)} className="header__menu--button">X</button>
                <a href="/" className="header__menu--logo">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGobTVE5BMJp30ofGiKWwKsfLzzDcZ5MQQQ&s" alt="MA logo" className="header__logo--image" />
                </a>
            </span>
            {
                openMenu ?
                    <>
                        <div onClick={() => setOpenMenu(!openMenu)} className="background"></div>
                        <nav className="header__sidebar">
                            <span className="header__sidebar--wrapper">
                                <button onClick={() => setOpenMenu(!openMenu)} className="header__sidebar--button">X</button>
                            </span>
                            <ul className="header__sidebar--list">
                                <li className="header__sidebar--item">
                                    <a href="/" className={`header__sidebar--item-link ${url == '/' ? 'header__navigation--link-active' : null} `}>Home</a>
                                </li>
                                {
                                    settings.courses ?
                                        <li className="header__sidebar--item">
                                            <a href={route('information.index')} className={`header__sidebar--item-link ${url == '/information' ? 'header__navigation--link-active' : null} `}>Opleidingen</a>
                                        </li>
                                        : null
                                }
                                {
                                    settings.stories ?
                                        <li className="header__sidebar--item">
                                            <a href={route('stories.index')} className={`header__sidebar--item-link ${url == '/stories' ? 'header__navigation--link-active' : null} `}>Verhalen van studenten</a>
                                        </li>
                                        : null
                                }
                                {
                                    settings.activities ?
                                        <li className="header__sidebar--item">
                                            <a href={route('activities.index')} className={`header__sidebar--item-link ${url == '/activities' ? 'header__navigation--link-active' : null} `}>Activiteiten</a>
                                        </li>
                                        : null
                                }
                                {
                                user != null ? 
                                    <Button label="Dashboard" route={route('dashboard', 'courses')}/>
                                : null
                            }
                            </ul>
                        </nav>
                    </>
                    : null
            }
        </header>
    ) : (
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
                    user != null ?
                        <Button label="Dashboard" route={route('dashboard', 'courses')} />
                        // <div className="header__dropdown">
                        //     <Button label="CMS"/>
                        //     <ul className="header__dropdown--list">
                        //         <li className="header__dropdown--item">
                        //             <a href={route('course.create')} className="header__dropdown--item-link">New course</a>
                        //         </li>
                        //         <li className="header__dropdown--item">
                        //             <a href={route('story.create')} className="header__dropdown--item-link">New story</a>
                        //         </li>
                        //         <li className="header__dropdown--item">
                        //             <a href={route('activity.create')} className="header__dropdown--item-link">New activity</a>
                        //         </li>
                        //     </ul>
                        // </div>
                        : null
                }
            </nav>
        </header>
    );
}

export default Navigation;
