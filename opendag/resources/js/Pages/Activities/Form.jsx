import Button from "@/Components/Button";
import PageTitle from "@/Components/Title";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

function ActivitiesForm(){
    const {data, setData, post, processing, errors} = useForm({
        course_id: null,
        activity_type_id: 0,
        activity: '',
        time: null
    });
    const courses = usePage().props.courses;
    const types = usePage().props.types;

    const submit = (event) => {
        event.preventDefault();
        post(route('activity.store'));
    }

    console.log(data);
    return(
        <AuthenticatedLayout>
            <Head title="New activity"/>
            <PageTitle title="New activity"/>
            <form onSubmit={submit} className="form">
                <select onChange={(event) => setData('course_id', event.target.value == 'Geen opleiding' ? null : event.target.value)} className="dropdown">
                    <option value={null} className="dropdown__option">Geen opleiding</option>
                    {
                        courses.map((item, index) => 
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select>
                <select onChange={(event) => setData('type_id', event.target.value)} className="dropdown">
                    {
                        types.map((item, index) => 
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select>
                {
                    data.course_id !== null ? <input type="time" value={data.time} onChange={(event) => setData('time', new Date().toTimeString(event.target.value))} className="form__time" /> : null
                }
                
                <Button type="submit" label='send'/>
            </form>
        </AuthenticatedLayout>
    );
}

export default ActivitiesForm;