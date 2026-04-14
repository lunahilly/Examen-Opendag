import Button from "@/Components/Button";
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

    console.log(data);
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
                    <option value="Other" className="dropdown__option">other</option>
                </select>
                <input type="time" value={data.time} onChange={(event) => setData('time', new Date().toTimeString(event.target.value))} className="form__time" />
                <Button type="submit" label='send'/>
            </form>
        </AuthenticatedLayout>
    );
}

export default ActivitiesForm;