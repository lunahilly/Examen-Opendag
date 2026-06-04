import Button from "@/Components/Button";
import InputField from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
function StoryForm() {
    const story = usePage().props.story;
    const path = usePage().props.status;
    const { data, setData, post, patch, processing, errors } = useForm({
        name: story ? story.name : '',
        course_id: story ? story.course_id : '',
        image: path != null ? `storage/${path}` : story ? story.image : '',
        story: story ? story.story : ''
    });
    const courses = usePage().props.courses;
    const ref = useRef(null);
    const submit = (event) => {
        event.preventDefault();
        console.log(ref.current);
        if(ref.current){
            console.log('changes');
            const storyContent = ref.current.getContent();
            setData('story', storyContent);
        }
        if (story != null) {
            patch(route('story.update', story.id));
        }
        else {
            post(route('story.store'));
        }
    }
    console.log(data);

    return (
        <AuthenticatedLayout>
            <Head title={story == null ? "New story" : `Edit ${data.name}`} />
            <main className="main">
                <form onSubmit={submit} className="form" encType={'multipart/form-data'}>
                    <InputField label="Name" value={data.name} onChange={(event) => setData('name', event.target.value)} error={errors.name} />
                    <span className="form__wrapper">
                        <select value={data.course_id} onChange={(event) => setData('course_id', event.target.value)} className="dropdown">
                            {
                                courses.map((item, index) =>
                                    <option value={item.id} key={index} className="dropdown__option">{item.name}</option>
                                )
                            }
                        </select>
                    </span>
                    <input type="file" onChange={(event) => setData('image', event.target.files[0])} className="form__file" />
                    <Editor
                        tinymceScriptSrc='public/src/js/tinymce_8.6.0/tinymce/js/tinymce/tinymce.min.js'
                        licenseKey="gpl"
                        value={data.story}
                        onEditorChange={(value, editor) => setData('story', value)}
                        onInit={(evt, editor) => {
                            console.log(editor);
                            console.log(ref.current);
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
                    <Button type="submit" label={story ? 'Update' : 'Save'} isDisabled={processing} />
                </form>
            </main>
        </AuthenticatedLayout>
    );
}

export default StoryForm;