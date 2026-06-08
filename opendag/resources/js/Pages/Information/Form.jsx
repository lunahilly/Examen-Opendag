import Button from "@/Components/Button";
import InputField from "@/Components/Input";
import ActivityCourseModal from "@/Components/Modals/ActivityCourseModal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

function InformationForm() {
    const course = usePage().props.course;
    const path = usePage().props.status;
    const [value, setValue] = useState('');
    const status = usePage().props.status;
    const [openModal, setOpenModal] = useState(status !== null ? true : false);
    const { data, setData, post, patch, processing, errors } = useForm({
        name: course ? course.name : '',
        abbreviation: course ? course.abbreviation : '',
        // image: course ? course.image : '',
        image: path != null ? `storage/${path}` : course ? course.image : '',
        information: course ? course.information : '',
        careers: course ? course.careers : [],
        duration: course ? course.duration : '',
        internships: course ? course.internships : '',
        code: course ? course.code : 0
    });


    const submit = (event) => {
        event.preventDefault();
        if (course != null) {
            patch(route('course.update', course.id));
        }
        else {
            post(route('course.store'));
        }
    }

    const addCareers = (event) => {
        event.preventDefault();
        if (!data.careers.includes(value)) {
            setData('careers', [...data.careers, value]);
            setValue('');
        }
    }

    // useEffect(() => {
    //     if(openModal){

    //     }
    // }, [openModal]);

    return (
        <AuthenticatedLayout>
            <Head title="New course" />
            <main className="main">
                {/* <form onSubmit={submit} className="form"> */}
                <form onSubmit={submit} className="form" encType={'multipart/form-data'}>
                    <InputField label="Name" value={data.name} onChange={(event) => setData('name', event.target.value)} error={errors.name} />
                    <InputField readOnly={course != null} label="Abbreviation" value={data.abbreviation} onChange={(event) => setData('abbreviation', event.target.value)} error={errors.abbreviation} />
                    {/* <InputField label="Image" value={data.image} onChange={(event) => setData('image', event.target.value)} error={errors.image} /> */}
                    <input type="file" onChange={(event) => setData('image', event.target.files[0])} className="form__file" />
                    <InputField label="Information" value={data.information} onChange={(event) => setData('information', event.target.value)} error={errors.information} />
                    <InputField label="Careers" value={value} onChange={(event) => setValue(event.target.value)} onClick={addCareers}>
                        <span className="input__data">
                            {
                                data.careers.map((item, index) =>
                                    <button type="button" onClick={() => setData('careers', data.careers.filter((career) => career != item))} className="input__data--item" key={index}>{item}</button>
                                )
                            }
                        </span>
                    </InputField>
                    <InputField label="Duration" value={data.duration} onChange={(event) => setData('duration', event.target.value)} error={errors.duration} />
                    <InputField label="Internships" value={data.internships} onChange={(event) => setData('internships', event.target.value)} error={errors.internships} />
                    <InputField label="Code" value={data.code} onChange={(event) => setData('code', event.target.value)} error={errors.code} />
                    {/* <button className="form__submit">submit</button> */}
                    <span className="form__wrapper">
                        {/* {
                            course !== null ?
                                <Button onClick={() => setOpenModal(true)} type="button" label="Voeg" />
                                : null
                        } */}
                        <Button type="submit" label={course ? 'Update' : 'Save'} />
                    </span>
                </form>
            </main>
            {
                openModal && course ? <ActivityCourseModal course={course.id} onClick={() => setOpenModal(false)} /> : null
            }
        </AuthenticatedLayout>
    );
}

export default InformationForm;