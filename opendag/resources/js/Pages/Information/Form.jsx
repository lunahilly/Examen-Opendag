import InputField from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

function InformationForm(){
    const [value, setValue] = useState('');
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        image: '',
        information: '',
        careers: [],
        duration: '',
        internships: '',
        code: 0
    });
    
    console.log(data.careers);

    const submit = (event) => {
        event.preventDefault();
        post(route('course.store'));
    }

    const addCareers = (event) => {
        console.log('thisa');
        event.preventDefault();
        if(!data.careers.includes(value)){
            setData('careers', [...data.careers, value]);
            setValue('');
        }
    }

    return(
        <AuthenticatedLayout>
            <Head title="New course"/>
            <form onSubmit={submit} className="form">
                <InputField label="Name" value={data.name} onChange={(event) => setData('name', event.target.value)} error={errors.name}/>
                <InputField label="Image" value={data.image} onChange={(event) => setData('image', event.target.value)} error={errors.image}/>
                <InputField label="Information" value={data.information} onChange={(event) => setData('information', event.target.value)} error={errors.information}/>
                <InputField label="Careers" value={value} onChange={(event) => setValue(event.target.value)} onClick={addCareers}>
                    <span className="input__data">
                        {
                            data.careers.map((item, index) => 
                                <button type="button" onClick={() => setData('careers', data.careers.filter((career) => career != item))} className="input__data--item" key={index}>{item}</button>
                            )
                        }
                    </span>
                </InputField>
                <InputField label="Duration" value={data.duration} onChange={(event) => setData('duration', event.target.value)} error={errors.duration}/>
                <InputField label="Internships" value={data.internships} onChange={(event) => setData('internships', event.target.value)} error={errors.internships}/>
                <InputField label="Code" value={data.code} onChange={(event) => setData('code', event.target.value)} error={errors.code}/>
                <button className="form__submit">submit</button>
            </form>
        </AuthenticatedLayout>
    );
}

export default InformationForm;