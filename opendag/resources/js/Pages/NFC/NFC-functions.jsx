async function Scan(){
    if ("NDEFReader" in window) {
        try {
            const ndef = new window.NDEFReader();
            await ndef.scan();

            ndef.onreading = (event) => {
                console.log("NDEF message read.");
                onReading(event);
            };

            ndef.onreadingerror = () => {
                console.log("Reading error");
            };

        } catch (error) {
            console.log(`scan error:  ${error}.`);
        }
    }
}

export default Scan;

const onReading = ({ message, serialNumber }) => {
    console.log(serialNumber);
    for (const record of message.records) {
        switch (record.recordType) {
            case "text":
                const textDecoder = new TextDecoder(record.encoding);
                console.log("Message:", textDecoder.decode(record.data));
                break;
            case "url":
                const urlDecoder = new TextDecoder(record.encoding);
                console.log("Message:", textDecoder.decode(record.data));
                break;
            default:
                break;
        }
    }
};