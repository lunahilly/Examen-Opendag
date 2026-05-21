import React, { useState } from 'react';
import axios from 'axios'; // Of gebruik 'fetch' als je geen Axios gebruikt

const BeaconScanner = () => {
    const [status, setStatus] = useState('');
    const [statusColor, setStatusColor] = useState('gray');

    const scanVoorBeacon = async () => {
        setStatus('Bluetooth scanner wordt geopened...');
        setStatusColor('blue');

        try {
            // Start de ingebouwde browser Bluetooth-prompt
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
            });

            setStatus(`Beacon gevonden: ${device.name}. Data wordt verwerkt...`);
            setStatusColor('orange');

            // Stuur de gegevens door naar jouw Laravel API
            meldBeaconBijLaravel(device.id, device.name);

        } catch (error) {
            setStatus(`Scannen geannuleerd of mislukt: ${error.message}`);
            setStatusColor('red');
            console.error('Scan fout:', error);
        }
    };

    const meldBeaconBijLaravel = async (beaconId, beaconName) => {
        try {
            // Pas de URL aan naar de exacte route van je Laravel backend
            const response = await axios.post('https://jouw-laravel-backend.test/api/beacon-check', {
                beacon_id: beaconId,
                name: beaconName
            });

            if (response.data.success) {
                setStatus('Succes! Je wordt nu doorgestuurd...');
                setStatusColor('green');
                
                // Stuur de gebruiker door naar de URL die uit de Laravel database komt
                window.location.href = response.data.redirect_url;
            } else {
                setStatus('Deze beacon is niet gekoppeld aan een actie.');
                setStatusColor('red');
            }
        } catch (error) {
            setStatus('Er ging iets mis bij het communiceren met de server.');
            setStatusColor('red');
            console.error('API fout:', error);
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Beacon Scanner</h2>
            <p>Klik op de knop hieronder om te controleren of je in de buurt van een beacon bent.</p>
            
            {/* De React knop die de functie triggert */}
            <button 
                onClick={scanVoorBeacon} 
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
            >
                Scan naar Beacons
            </button>
            
            {/* Status terugkoppeling */}
            {status && (
                <div style={{ marginTop: '15px', color: statusColor, fontWeight: 'bold' }}>
                    {status}
                </div>
            )}
        </div>
    );
};

export default BeaconScanner;