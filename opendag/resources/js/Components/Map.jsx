import { useState } from "react";
import floorZero from "../../../Plattegrond/Plattegrond_begane-grond.svg"
import floorOne from "../../../Plattegrond/Plattegrond_verdieping1.svg";
import floorTwo from "../../../Plattegrond/Plattegrond_verdieping2.svg";
import floorThree from "../../../Plattegrond/Plattegrond_verdieping3.svg";

const floors = [
    {
        value: "floor-0",
        label: "Begane grond",
        image: floorZero,
    },
    {
        value: "floor-1",
        label: "Vloer 1",
        image: floorOne,
    },
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
];


function Map(){
    const [selectedFloor, setSelectedFloor] = useState(floors[0].value);

    const activeFloor =
        floors.find((floor) => floor.value === selectedFloor) ?? floors[0];
    return (
        <>
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
                </>
    );
}

export default Map;