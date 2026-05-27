import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Form, Head } from "@inertiajs/react";
import Button from "@/Components/Button";
import { useState } from "react";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

function NFC() {
    const [status, setStatus] = useState("");
    const [Message, setMessage] = useState("");
    const [inputValue, setInputValue] = useState("");

    async function Read() {
        setStatus("scanning...");
        setMessage("");

        if ("NDEFReader" in window) {
            try {
                const ndef = new window.NDEFReader();
                await ndef.scan();

                setStatus("Houd de tag tegen de telefoon...");

                ndef.onreadingerror = (e) => {
                    setMessage("There was a reading error: " + e);
                    setStatus("Reading error");
                };

                ndef.onreading = (e) => {
                    setStatus("decoding...");

                    const utf8decoder = new TextDecoder('utf-8');
                    let url = "";

                    for (var i = 0; i < e.message.records.length; ++i) {
                        var record = e.message.records[i];

                        if (record.data) {
                            let part = utf8decoder.decode(record.data);

                            url = url.concat(part);
                        }
                    }
                    url = url.replace(/^[\x01-\x06]/, "");

                    setMessage(url);
                    setStatus("Scanned");
                };
            } catch (error) {
                console.log(`scan error: ${error}.`);
                setStatus("Scan error");
                setMessage(`${error}`);
            }
        } else {
            setStatus("no nfc found");
        }
    }

    async function Write(url) {
        setStatus("Writing...");
        setMessage("");

        if ("NDEFReader" in window) {
            try {
                const ndef = new window.NDEFReader();
                setStatus("Houd de tag tegen de telefoon om te schrijven...");

                await ndef.write({
                    records: [{ recordType: "url", data: url }]
                });
                setStatus("Writing succesfull")
                setMessage(url)
            }
            catch (error) {
                console.log(`scan error: ${error}.`);
                setStatus("Scan error");
                setMessage(`${error}`);
            }
        }
        else {
            setStatus("no nfc found");
        }
    };

    function handleForm(e) {
        e.preventDefault();

        if (inputValue.trim()) {
            Write(inputValue);
        }
        else {
            setStatus("Voer eerst een geldige URL in.");
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="NFC" />

            <div className="nfc__container">
                <PageTitle title="NFC instellen" />


                <form className="nfc__form" onSubmit={handleForm}>
                    <p>Fill in the data and click write to set NFC tag</p>
                    <TextInput
                        name="data"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="https://example.com"
                    />

                    <div className="nfc__buttons">
                        <Button label={'write'} type="submit" />
                        <Button label={'Read NFC tag'} onClick={Read} />
                    </div>

                    <div className="nfc__textContainer">
                        <p>Status: {status}</p>
                        <p>NFC data: {Message}</p>
                    </div>
                </form>
            </div>

        </AuthenticatedLayout>
    );
}

export default NFC;