import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Form, Head } from "@inertiajs/react";
import Button from "@/Components/Button";
import { useState } from "react";
import TextInput from "@/Components/TextInput";

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
                    records: [{ recordType: "url", data:  url  }]
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
        <GuestLayout>
            <Head title="NFC" />
            <PageTitle title="NFC instellen" />

            <Button label={'Scan'} onClick={Read} />
            <form onSubmit={handleForm} className="space-y-4">
                <h2>Fill in the data and click write to set NFC tag</h2>
                <TextInput
                    name="data"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="https://example.com"
                />
                <Button label={'write'} type="submit"/>
            </form>



            <p>Status: {status}</p>
            <p>NFC data: {Message}</p>
        </GuestLayout>
    );
}

export default NFC;