import { Head, useForm } from "@inertiajs/react";

function InformationForm(){
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        image: '',
        information: '',
        careers: [],
        duration: '',
        internships: '',
        code: 0
    });
    

    const submit = (event) => {
        event.preventDefault();
        post(route('course.store'));
    }

    return(
        <>
            <Head title="New course"/>
        </>
    );
}

export default InformationForm;