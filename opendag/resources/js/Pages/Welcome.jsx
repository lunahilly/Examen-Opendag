import Navigation from "@/Layouts/Navigation";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import floorTwo from "../../../Plattegrond/Plattegrond voorbeeld Vloer 2.svg";
import floorThree from "../../../Plattegrond/Plattegrond voorbeeld Vloer 3.svg";
import floorFour from "../../../Plattegrond/Plattegrond voorbeeld Vloer 4.svg";

const floors = [
    {
        value: "floor-2",
        label: "Vloer 2",
        image: floorTwo,
    },
    {
        value: "floor-3",
        label: "Vloer 3",
        image: floorThree,
    },
    {
        value: "floor-4",
        label: "Vloer 4",
        image: floorFour,
    },
];

function Welcome() {
    const [selectedFloor, setSelectedFloor] = useState(floors[0].value);

    const activeFloor =
        floors.find((floor) => floor.value === selectedFloor) ?? floors[0];

    return (
        <>
            <Head title="welcome" />
            <Navigation />
            <main className="welcome">
                <section className="welcome__content">
                    <h1 className="welcome__title">Plattegrond</h1>
                    <select
                        className="welcome__dropdown"
                        id="plattegrond-floor"
                        value={selectedFloor}
                        onChange={(event) =>
                            setSelectedFloor(event.target.value)
                        }
                    >
                        {floors.map((floor) => (
                            <option key={floor.value} value={floor.value}>
                                {floor.label}
                            </option>
                        ))}
                    </select>
                    <img
                        className="welcome__image"
                        src={activeFloor.image}
                        alt={`Plattegrond van ${activeFloor.label}`}
                    />
                </section>
            </main>
        </>
    );
}

export default Welcome;
