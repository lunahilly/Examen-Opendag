import InputField from "@/Components/Input";
import PageTitle from "@/Components/Title";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

function ActivitiesForm(){
    const {data, setData, post, processing, errors} = useForm({
        course_id: 0,
        activity: '',
        time: ''
    });
    const courses = usePage().props.courses;

    const submit = (event) => {
        event.preventDefault();
        post(route('activity.store'));
    }

    return(
        <AuthenticatedLayout>
            <Head title="New activity"/>
            <PageTitle title="New activity"/>
            <form onSubmit={submit} className="form">
                <select onChange={(event) => setData('course_id', event.target.value)} className="dropdown">
                    {
                        courses.map((item, index) => 
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select>
                <select onChange={(event) => setData('activity', event.target.value)} className="dropdown">
                    <option value="Voorlichting" className="dropdown__option">Voorlichting</option>
                </select>
                <input type="time" value={data.time} onChange={(event) => setData('time', event.target.value)} className="form__time" />
            </form>
        </AuthenticatedLayout>
    );
}

export default ActivitiesForm;