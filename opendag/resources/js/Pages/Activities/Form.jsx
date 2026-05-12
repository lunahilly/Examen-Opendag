import Button from "@/Components/Button";
import InputField from "@/Components/Input";
import PageTitle from "@/Components/Title";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

function ActivitiesForm(){
    const {data, setData, post, processing, errors} = useForm({
        course_id: null,
        activity_type_id: 0,
        // activity: '',
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
                <select value={data.activity_type_id} onChange={(event) => setData('activity_type_id', event.target.value)} className="dropdown">
                    {
                        types.map((item, index) => 
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select>
                {/* <InputField label="Activity" value={data.activity} onChange={(event) => setData('activity', event.target.value)}/> */}
                {
                    data.course_id !== null ? <input type="time" value={data.time} onChange={(event) => setData('time', event.target.value)} className="form__time" /> : null
                }
                
                <Button type="submit" label='send' isDisabled={processing}/>
            </form>
        </AuthenticatedLayout>
    );
}

export default ActivitiesForm;