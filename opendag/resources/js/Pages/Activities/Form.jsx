import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import InputField from "@/Components/Input";
import PageTitle from "@/Components/Title";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

function ActivitiesForm() {
    const activity = usePage().props.activity;
    console.log(activity);
    const { data, setData, post, patch, processing, errors } = useForm({
        title: activity ? activity.title : '',
        is_general: activity ? activity.is_general : false,
        image: activity ? activity.image : null,
        description: activity ? activity.description : null
    });
    const ref = useRef(null);
    // const courses = usePage().props.courses;
    // const types = usePage().props.types;

    const submit = (event) => {
        event.preventDefault();
        if(ref.current){
            console.log('changes');
            const descriptionContent = ref.current.getContent();
            setData('description', descriptionContent);
        }
        if(activity){
            patch(route('activity.update', activity.id));
        }
        else{
            post(route('activity.store'));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="New activity" />
            <main className="main">
                <PageTitle title="New activity" />
                <form onSubmit={submit} className="form">
                    <InputField label="Title" value={data.title} onChange={(event) => setData('title', event.target.value)} error={errors.title} required />
                    <span className="form__wrapper">
                        <Checkbox label="Algemene activiteit" value={data.is_general} onChange={(event) => setData('is_general', event.target.checked)} />
                    </span>
                    {

                        data.is_general ? 
                        <>
                            <input type="file" onChange={(event) => setData('image', event.target.files[0])} className="form__file" />
                            <Editor
                                tinymceScriptSrc='public/src/js/tinymce_8.6.0/tinymce/js/tinymce/tinymce.min.js'
                                licenseKey="gpl"
                                value={data.description}
                                onEditorChange={(value, editor) => setData('description', value)}
                                onInit={(evt, editor) => {
                                    ref.current = editor;
                                }}
                                init={{
                                    menubar: false,
                                    width: '100%',
                                    plugins: ['link'],
                                    toolbar: 'blocks | bold italic link',
                                    content_style: 'body {font-family: aeonik, sans-serif}'
                                }}
                            />
                        </> : null
                    }

                    {/* <select onChange={(event) => setData('course_id', event.target.value == 'Geen opleiding' ? null : event.target.value)} className="dropdown">
                    <option value={null} className="dropdown__option">Geen opleiding</option>
                    {
                        courses.map((item, index) =>
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select> */}
                    {/* <select value={data.activity_type_id} onChange={(event) => setData('activity_type_id', event.target.value)} className="dropdown">
                    {
                        types.map((item, index) =>
                            <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                        )
                    }
                </select> */}
                    {/* <InputField label="Activity" value={data.activity} onChange={(event) => setData('activity', event.target.value)}/> */}
                    {
                        // data.course_id !== null ? <input type="time" value={data.time} onChange={(event) => setData('time', event.target.value)} className="form__time" /> : null
                    }

                    <Button type="submit" label='send' isDisabled={processing} />
                </form>
            </main>
        </AuthenticatedLayout>
    );
}

export default ActivitiesForm;