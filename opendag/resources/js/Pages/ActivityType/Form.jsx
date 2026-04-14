import Button from "@/Components/Button";
import InputField from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";

function ActivityTypeForm(){
    const {data, setData, post, processing, errors} = useForm({
        name: ''
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('type.store'));
    }

    return (
        <AuthenticatedLayout>
            <form onSubmit={submit} className="form">
                <InputField label="Name" value={data.name} onChange={(event) => setData('name', event.target.value)} />
                <Button label="send" type="submit"/>
            </form>
        </AuthenticatedLayout>
    );
}

export default ActivityTypeForm;