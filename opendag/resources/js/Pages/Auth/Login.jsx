import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import InputField from "@/Components/Input";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

function Login(){
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password')
        });
    }
    return(
        <GuestLayout>
            <Head title="Login"/>
            <form onSubmit={submit} className="form">
                <h2 className="form__title" data-end="." >Login</h2>
                <InputField label="Email" value={data.email} onChange={(event) => setData('email', event.target.value)} error={errors.email} type="email"/>
                <InputField label="Password" value={data.password} onChange={(event) => setData('password', event.target.value)} error={errors.password} type="password"/>
                <Checkbox label="Remember me" value={data.remember} onChange={(event) => setData('remember', event.target.checked)}/>
                {/* <button className="form__button">login</button> */}
                <Button label="Login"/>
            </form>
        </GuestLayout>
    );
}

export default Login;