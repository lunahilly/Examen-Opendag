import InputField from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

function Register(){
    const {data, setData, post, processing, errors, reset} = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation')
        });
    }

    return(
        <GuestLayout>
            <Head title="Register"/>
            <form onSubmit={submit} className="auth">
                <InputField label="Name" value={data.name} onChange={(event) => setData('name', event.target.value)} error={errors.name}/>
                <InputField label="Email" value={data.email} onChange={(event) => setData('email', event.target.value)} type="email" error={errors.email}/>
                <InputField label="Password" value={data.password} onChange={(event) => setData('password', event.target.value)} type="password" error={errors.password}/>
                <InputField label="Confirm password" value={data.password_confirmation} onChange={(event) => setData('password_confirmation', event.target.value)} type="password" error={errors.password_confirmation}/>
                <button className="auth__button">register</button>
            </form>
        </GuestLayout>
    );
}

export default Register;