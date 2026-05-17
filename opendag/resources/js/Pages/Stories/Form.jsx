import Button from "@/Components/Button";
import InputField from "@/Components/Input";
import Textarea from "@/Components/Textarea";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

function StoryForm(){
    const story = usePage().props.story;
    const path = usePage().props.status;
    const {data, setData, post, patch, processing, errors} = useForm({
        name: story ? story.name : '',
        course_id: story ? story.course_id : '',
        // image: story ? story.image : '',
        image: path != null ? `storage/${path}` : story ? story.image : '',
        story: story ? story.story : ''
    });
    const courses = usePage().props.courses;
    const submit = (event) => {
        event.preventDefault();
        // if(path != null && disable){
            if(story != null){
                patch(route('story.update', story.id));
            }
            else{
                post(route('story.store'));
            }
        // }
        // else{
        //     post(route('image.store', 'students'), {
        //         forceFormData: true
        //     });
        // }
    }

    // useEffect(() => {
    //     if(path != null){
    //         console.log('changed');
    //         setData('image', `storage/${path}`);
    //     }
    // }, [path]);

    // console.log(data.image.type);
    // useEffect(() => {
    //     if(data.image.type == "image/png"){
    //         console.log('grjo');
            
    //         post(route('image.store', 'students'), {
    //             forceFormData: true
    //         });path != null ? '' : 
    //     }
    // }, [data.image]);
    
    

    return (
        <AuthenticatedLayout>
            <Head title="New story"/>
            <main className="main">
                <form onSubmit={submit} className="form" encType={'multipart/form-data'}>
                    <InputField label="Name" value={data.name} onChange={(event) => setData('name', event.target.value)} error={errors.name}/>
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
                    <Textarea value={data.story} onChange={(event) => setData('story', event.target.value)} formatChange={(value) => setData('story', value)}/>
                    {/* <InputField label="Image" value={data.image} onChange={(event) => setData('image', event.target.value)} error={errors.image}/> */}
                    {/* <InputField label="Story" value={data.story} onChange={(event) => setData('story', event.target.value)} error={errors.story}/> */}
                    <Button type="submit" label={story ? 'Update' : 'Save'} isDisabled={processing}/>
                </form>
            </main>
        </AuthenticatedLayout>
    );
}

export default StoryForm;