import React, { useState } from 'react';
import axios from 'axios';
import PageTitle from "@/Components/Title";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head } from "@inertiajs/react";

function Contact() {
    // State om de statusberichten en kleuren bij te houden
    const [status, setStatus] = useState('');
    const [statusColor, setStatusColor] = useState('gray');

    const scanVoorBeacon = async () => {
        setStatus("Bluetooth scanner wordt geopend...");
        setStatusColor("blue");

        try {
            // Start de ingebouwde browser Bluetooth-prompt
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
            });

            setStatus(`Beacon gevonden: ${device.name}. Data wordt verwerkt...`);
            setStatusColor("orange");

            // Stuur de gegevens direct door naar de Laravel API
            meldBeaconBijLaravel(device.id, device.name);

        } catch (error) {
            setStatus("Scannen geannuleerd of mislukt: " + error.message);
            setStatusColor("red");
            console.error('Scan fout:', error);
        }
    };

    const meldBeaconBijLaravel = async (beaconId, beaconName) => {
        try {
            // Verzoek naar de Laravel backend controller
            const response = await axios.post('/api/beacon-check', {
                beacon_id: beaconId,
                name: beaconName
            });

            if (response.data.success) {
                setStatus("Succes! Je wordt nu doorgestuurd...");
                setStatusColor("green");
                
                // Stuur de gebruiker door naar de URL uit je database
                window.location.href = response.data.redirect_url;
            } else {
                setStatus("Deze beacon is niet gekoppeld aan een actie.");
                setStatusColor("red");
            }
        } catch (error) {
            setStatus("Er ging iets mis bij het communiceren met de server.");
            setStatusColor("red");
            console.error(error);
        }
    };

    return (
        <GuestLayout>
            <Head title="Contact" />
            <PageTitle title="Contact" />

            {/* De Beacon Scanner Sectie */}
            <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <p style={{ marginBottom: '20px' }}>
                    Klik op de knop hieronder om te controleren of je in de buurt van een beacon bent.
                </p>

                {/* De actieve knop met onClick koppeling */}
                <button 
                    onClick={scanVoorBeacon} 
                    className="btn btn-primary"
                    style={{ 
                        padding: '12px 24px', 
                        fontSize: '16px', 
                        cursor: 'pointer',
                        borderRadius: '6px',
                        fontWeight: 'bold'
                    }}
                >
                    Scan naar Beacons
                </button>

                {/* Status terugkoppeling voor de gebruiker (alleen zichtbaar als er status is) */}
                {status && (
                    <div style={{ marginTop: '20px', color: statusColor, fontWeight: 'bold' }}>
                        {status}
                    </div>
                )}
            </div>
        </GuestLayout>
    );
}

export default Contact;