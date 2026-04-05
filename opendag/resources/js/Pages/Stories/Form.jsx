import InputField from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

function StoryForm(){
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        course_id: '',
        image: '',
        story: ''
    });
    const courses = usePage().props.courses;
    console.log(courses);
    console.log(data);

    const submit = (event) => {
        event.preventDefault();
        post(route('story.store'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="New story"/>
            <form onSubmit={submit} className="form">
                <InputField label="Name" value={data.name} onChange={(event) => setData('name', event.target.value)} error={errors.name}/>
                <select value={data.course_id} onChange={(event) => setData('course_id', event.target.value)} className="dropdown">
                    {
                        courses.map((item, index) => 
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select>
                <InputField label="Image" value={data.image} onChange={(event) => setData('image', event.target.value)} error={errors.image}/>
                <InputField label="Story" value={data.story} onChange={(event) => setData('story', event.target.value)} error={errors.story}/>
                <button className="form__submit">submit</button>
            </form>
        </AuthenticatedLayout>
    );
}

export default StoryForm;