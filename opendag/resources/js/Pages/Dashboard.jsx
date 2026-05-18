import Button from '@/Components/Button';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const settings = usePage().props.settings;
    const items = usePage().props.data;
    const type = usePage().props.type;
    const {delete: destroy} = useForm();

    const submit = (event) => {
        event.preventDefault();
        patch(route('settings.update', settings.id));
    }

    const format = (value, toDutch) => {
        if(value == 'courses'){
            return toDutch ? 'Opleidingen' : 'course';
        }
        else if(value == 'stories'){
            return toDutch ? 'Verhalen' : 'story';
        }
        else if(value == 'activities'){
            return toDutch ? 'Activiteiten' : 'activity';
        }
    }
    const deleteItem = (event, id) => {
        event.preventDefault();
        destroy(route(`${format(type, false)}.destroy`, id));
    }

    return (
        <AuthenticatedLayout>
            <main className="main">
                <Head title='Dashboard'/>
                <span className="headlink">
                    <p className="headlink__title">Dashboard / </p>
                    <a href={route('settings.index')} className="headlink__link">Settings</a>
                </span>
                <section className="dashboard">
                    <span className="dashboard__options">
                        <a href={route('dashboard', 'courses')} className={`dashboard__options--button ${type == 'courses' ? 'dashboard__options--button-active' : null}`}>Opleidingen</a>
                        <a href={route('dashboard', 'stories')} className={`dashboard__options--button ${type == 'stories' ? 'dashboard__options--button-active' : null}`}>Verhalen</a>
                        <a href={route('dashboard', 'activities')} className={`dashboard__options--button ${type == 'activities' ? 'dashboard__options--button-active' : null}`}>Activiteiten</a>
                    </span>
                    <div className="dashboard__wrapper">
                        <div className="dashboard__header">
                            <h3 className="dashboard__header--text">Beheer {format(type, true)}</h3>
                            <Button label="+ Nieuwe aanmaken" route={route(`${format(type, false)}.create`)}/>
                        </div>
                        <table className="dashboard__table">
                            <thead className="dashboard__head">
                                <tr className="dashboard__head--wrapper">
                                    <th className="dashboard__head--item">Naam</th>
                                    <th className="dashboard__head--item">Wijzigen</th>
                                    <th className="dashboard__head--item">Verwijderen</th>
                                </tr>
                            </thead>
                            <tbody className="dashboard__body">
                                {
                                    items.data.map((item, index) => 
                                        <tr className="dashboard__row" key={index}>
                                            <td className="dashboard__row--title">{item.name ?? item.activity_type.name}</td>
                                            <td className="dashboard__row--edit">
                                                <a href={route(`${format(type, false)}.edit`, item.id)} className="dashboard__row--edit-link">X</a>
                                            </td>
                                            <td className="dashboard__row--delete">
                                                <form onSubmit={(event) => deleteItem(event, item.id)} className="dashboard__row--delete-form">
                                                    <button className="dashboard__row--delete-submit" type='submit'>X</button>
                                                </form>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {
                            items.last_page == 1 ? null : <Pagination data={items}/>
                        }
                    </div>
                </section>
            </main>
        </AuthenticatedLayout>
    );
}
