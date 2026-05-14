import Button from "@/Components/Button";
import InputField from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

function StoryForm(){
    const story = usePage().props.story;
    const path = usePage().props.status;
    console.log(usePage());
    const {data, setData, post, patch, processing, errors} = useForm({
        name: story ? story.name : '',
        course_id: story ? story.course_id : '',
        // image: story ? story.image : '',
        image: path != null ? `storage/${path}` : story ? story.image : '',
        story: story ? story.story : ''
    });
    console.log(usePage().props);
    console.log(data.image);
    const courses = usePage().props.courses;
    console.log(courses);
    console.log(data);
    console.log(path);
    const submit = (event) => {
        event.preventDefault();
        console.log('this');
        // if(path != null && disable){
            if(story != null){
                console.log('hoho');
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
    console.log(usePage());
    

    return (
        <AuthenticatedLayout>
            <Head title="New story"/>
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
                <input type="file" onChange={(event) => setData('image', event.target.files[0])} />
                {/* <InputField label="Image" value={data.image} onChange={(event) => setData('image', event.target.value)} error={errors.image}/> */}
                <InputField label="Story" value={data.story} onChange={(event) => setData('story', event.target.value)} error={errors.story}/>
                <Button type="submit" label={story ? 'Update' : 'Save'} isDisabled={processing}/>
            </form>
        </AuthenticatedLayout>
    );
}

export default StoryForm;