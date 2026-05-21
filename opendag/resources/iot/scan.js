async function scanVoorBeacon() {
    try {
        console.log('Zoeken naar beacons...');
        
        // Vraag toegang tot Bluetooth-apparaten
        const device = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true, // Of filter op specifieke services van jouw beacon
            optionalServices: ['battery_service'] // Voeg hier eventueel beacon-specifieke services toe
        });

        console.log(`Beacon gevonden! Naam: ${device.name}, ID: ${device.id}`);

        // Als het apparaat succesvol is gevonden, sturen we het door naar Laravel
        meldBeaconBijLaravel(device.id, device.name);

    } catch (error) {
        console.error('Er ging iets mis bij het scannen:', error);
    }
}

function meldBeaconBijLaravel(beaconId, beaconName) {
    fetch('/api/beacon-check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            beacon_id: beaconId,
            name: beaconName
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            // Stuur de gebruiker bijvoorbeeld door naar de gekoppelde link
            window.location.href = data.redirect_url;
        }
    });
}

// Wacht tot de hele pagina is geladen
document.addEventListener('DOMContentLoaded', function () {
    
    const scanKnop = document.getElementById('scanBeaconBtn');
    const statusDiv = document.getElementById('scanStatus');

    // Controleer of de knop daadwerkelijk op deze pagina aanwezig is
    if (scanKnop) {
        scanKnop.addEventListener('click', async function () {
            // Update de status op het scherm
            statusDiv.innerText = "Bluetooth scanner wordt geopend...";
            statusDiv.style.color = "blue";

            try {
                // Start de ingebouwde browser Bluetooth-promp
                const device = await navigator.bluetooth.requestDevice({
                    acceptAllDevices: true
                });

                statusDiv.innerText = `Beacon gevonden: ${device.name}. Data wordt verwerkt...`;
                statusDiv.style.color = "orange";

                // Stuur de gegevens door naar de Laravel controller
                meldBeaconBijLaravel(device.id, device.name);

            } catch (error) {
                // Als de gebruiker op 'Annuleren' klikt of Bluetooth staat uit
                statusDiv.innerText = "Scannen geannuleerd of mislukt: " + error.message;
                statusDiv.style.color = "red";
                console.error('Scan fout:', error);
            }
        });
    }
});

// De functie die de fetch-call naar Laravel doet
function meldBeaconBijLaravel(beaconId, beaconName) {
    const statusDiv = document.getElementById('scanStatus');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    fetch('/api/beacon-check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({
            beacon_id: beaconId,
            name: beaconName
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server reageerde niet goed.');
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            statusDiv.innerText = "Succes! Je wordt nu doorgestuurd...";
            statusDiv.style.color = "green";
            // Stuur de gebruiker door naar de URL die in je Laravel database gekoppeld staat
            window.location.href = data.redirect_url;
        } else {
            statusDiv.innerText = "Deze beacon is niet gekoppeld aan een actie.";
            statusDiv.style.color = "red";
        }
    })
    .catch(error => {
        statusDiv.innerText = "Er ging iets mis bij het communiceren met de server.";
        statusDiv.style.color = "red";
    });
}