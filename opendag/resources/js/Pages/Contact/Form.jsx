import Button from "@/Components/Button";
import InputField from "@/Components/Input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

function Form() {
    // 1. Haal een eventuele bestaande beacon op (als je gaat bewerken in de toekomst)
    const beacon = usePage().props.beacon;

    // 2. Lokale state voor de feedbackboodschap van de browser Bluetooth-scanner
    const [scanStatus, setScanStatus] = useState('');
    const [statusColor, setStatusColor] = useState('gray');

    // 3. De Inertia form-hook, exact zoals in jouw StoryForm
    const { data, setData, post, patch, processing, errors } = useForm({
        bluetooth_id: beacon ? beacon.bluetooth_id : '',
        name: beacon ? beacon.name : '',
        redirect_url: beacon ? beacon.redirect_url : ''
    });

    // 4. De asynchrone Bluetooth-scanfunctie
    const scanVoorBeaconId = async () => {
        setScanStatus("Breng de beacon dichtbij en selecteer hem in de lijst...");
        setStatusColor("#2563eb"); // Blauw

        try {
            // Start de native browser Bluetooth-prompt
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
            });

            // Gevonden unieke ID direct in de Inertia form state zetten
            setData('bluetooth_id', device.id);

            // Als de beacon een fabrieksnaam meestuurt én de naam is nog leeg, vul hem alvast in
            if (device.name && !data.name) {
                setData(prevData => ({
                    ...prevData,
                    bluetooth_id: device.id,
                    name: device.name
                }));
            }

            setScanStatus(`Succesvol gescand! ID: ${device.id}`);
            setStatusColor("#16a34a"); // Groen

        } catch (error) {
            setScanStatus("Scannen geannuleerd of mislukt: " + error.message);
            setStatusColor("#dc2626"); // Rood
        }
    };

    // 5. De submit-handler die de boel naar Laravel stuurt
const submit = (event) => {
        event.preventDefault();
        
        console.log("Submit getriggerd!");
        console.log("Data die we versturen:", data);

        if (beacon != null) {
            patch(route('beacons.update', beacon.id));
        } else {
            console.log("Inertia POST verzoek wordt nu verzonden naar beacons.store...");
            post(route('beacons.store'));
        }
    };

return (
        <AuthenticatedLayout>
            <Head title={beacon ? "Edit beacon" : "New beacon"} />
            <main className="main">
                
                <form onSubmit={submit} className="form">
                    
                    {/* STAP 1: Bluetooth Scanknop */}
                    <div className="form__wrapper" style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <span style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                            Stap 1: Scan de fysieke beacon
                        </span>
                        
                        <Button 
                            type="button" 
                            label="Start Bluetooth Scan" 
                            onClick={scanVoorBeaconId}
                        />
                        
                        {scanStatus && (
                            <p style={{ marginTop: '10px', color: statusColor, fontSize: '14px', fontWeight: 'bold' }}>
                                {scanStatus}
                            </p>
                        )}
                    </div>

                    <hr style={{ border: '0', borderTop: '1px solid #e5e7eb', margin: '20px 0' }} />

                    {/* GEFIXT: onChange toegevoegd om de console warning op te lossen */}
                    <InputField 
                        label="Gescand Beacon ID" 
                        value={data.bluetooth_id} 
                        onChange={() => {}} 
                        placeholder="Scan eerst een beacon via de knop hierboven..."
                        error={errors.bluetooth_id}
                    />

                    <InputField 
                        label="Beacon Naam (Locatie)" 
                        value={data.name} 
                        onChange={(event) => setData('name', event.target.value)} 
                        placeholder="Bijv. Ingang Kantine of Grote Hal"
                        error={errors.name}
                    />

                    <InputField 
                        label="Gekoppelde Actie (Link URL)" 
                        value={data.redirect_url} 
                        onChange={(event) => setData('redirect_url', event.target.value)} 
                        placeholder="https://jouwwebsite.nl/bestemming"
                        error={errors.redirect_url}
                    />

                    <Button 
                        type="submit" 
                        label={beacon ? 'Update' : 'Save'} 
                        isDisabled={processing || !data.bluetooth_id}
                    />
                </form>

            </main>
        </AuthenticatedLayout>
    );
}

export default Form;