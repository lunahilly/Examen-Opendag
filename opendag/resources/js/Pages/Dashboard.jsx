import Button from '@/Components/Button';
import Toggle from '@/Components/Toggle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const settings = usePage().props.settings;
    const {data, setData, patch, processing, errors} = useForm({
        courses: settings.courses,
        stories: settings.stories,
        activities: settings.activities,
        contact: settings.contact
    });

    const submit = (event) => {
        event.preventDefault();
        patch(route('settings.update', settings.id));
    }
    return (
        <AuthenticatedLayout>
            <Head title='dashboard'/>
            <section className="dashboard">
                <form onSubmit={submit} className='settings'>
                    <div className="settings__wrapper">
                        <span className="settings__input">
                            <label className="settings__label">Laat opleidingen zien</label>
                            <Toggle value={data.courses} onChange={(event) => setData('courses', event.target.checked)}/>
                        </span>
                        <span className="settings__input">
                            <label className="settings__label">Laat verhalen van studenten zien</label>
                            <Toggle value={data.stories} onChange={(event) => setData('stories', event.target.checked)}/>
                        </span>
                        <span className="settings__input">
                            <label className="settings__label">Laat activiteiten zien</label>
                            <Toggle value={data.activities} onChange={(event) => setData('activities', event.target.checked)}/>
                        </span>
                        <span className="settings__input">
                            <label className="settings__label">Laat contact zien</label>
                            <Toggle value={data.contact} onChange={(event) => setData('contact', event.target.checked)}/>
                        </span>
                    </div>
                    <Button label="Save" type="submit" isDisabled={processing}/>
                </form>
            </section>
        </AuthenticatedLayout>
    );
}
