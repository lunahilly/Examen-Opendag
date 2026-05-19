import Button from "@/Components/Button";
import Toggle from "@/Components/Toggle";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

function Settings() {
    const settings = usePage().props.settings;
    const [isChanged, setIsChanged] = useState(false);
    const user = usePage().props.auth.user;
    const {data, setData, post, patch, processing, errors, delete: destroy} = useForm({
        courses: settings.courses,
        stories: settings.stories,
        activities: settings.activities,
        contact: settings.contact
    });
    
    useEffect(() => {
        if(data.courses == settings.courses && data.stories == settings.stories && data.activities == settings.activities && data.contact == settings.contact){
            setIsChanged(false);
        }
        else{
            setIsChanged(true);
        }
    }, [data, settings]);
    
    const submit = (event) => {
        event.preventDefault();
        patch(route('settings.update', settings.id));
    }

    const logout = (event) => {
        event.preventDefault();
        post(route('logout'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Settings"/>
            <main className="main">
                <span className="headlink">
                    <a href={route('dashboard', 'courses')} className="headlink__link">Dashboard</a>
                    <p className="headlink__title"> / Settings</p>
                </span>
                <section className="settings">
                    <span className="settings__profile">
                        <h2 className="settings__profile--name">Hallo, {user.name}</h2>
                        <form onSubmit={logout} className="settings__profile--form">
                            {/* <button className="settings__profile--logout">Log uit</button> */}
                            <Button label="Log uit" type="submit" isDisabled={processing}/>
                        </form>
                    </span>
                    <form onSubmit={submit} className='settings__form'>
                        <h2 className="settings__head">Instellingen</h2>
                        <div className="settings__wrapper">
                            <span className="settings__input">
                                <label className={`settings__label ${data.courses ? null : 'settings__label--blurred'}`}>Laat opleidingen zien</label>
                                <Toggle value={data.courses} onChange={(event) => setData('courses', event.target.checked)}/>
                            </span>
                            <span className="settings__input">
                                <label className={`settings__label ${data.stories ? null : 'settings__label--blurred'}`}>Laat verhalen van studenten zien</label>
                                <Toggle value={data.stories} onChange={(event) => setData('stories', event.target.checked)}/>
                            </span>
                            <span className="settings__input">
                                <label className={`settings__label ${data.activities ? null : 'settings__label--blurred'}`}>Laat activiteiten zien</label>
                                <Toggle value={data.activities} onChange={(event) => setData('activities', event.target.checked)}/>
                            </span>
                            <span className="settings__input">
                                <label className={`settings__label ${data.contact ? null : 'settings__label--blurred'}`}>Laat contact zien</label>
                                <Toggle value={data.contact} onChange={(event) => setData('contact', event.target.checked)}/>
                            </span>
                        </div>
                        <Button label="Opslaan" type="submit" isDisabled={isChanged == false ? true : processing}/>
                    </form>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}

export default Settings;