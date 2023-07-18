import {useAuth} from 'react-oidc-context';
import "./index.css";
import {useEffect, useState} from 'react';


export const DashboardPage = () => {
    const auth = useAuth();
    console.log(auth.user?.profile);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const vehicles = [{id: 1, name: 'kamal'}, {id: 2, name: 'maryam'}, {id: 3, name: 'mohamed'}, {id: 4, name: 'sana'}];
            setVehicles(vehicles);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div>
            <div className="vehicle-menu">
                <h3>Vehicles</h3>
                <ul>
                    {vehicles.map((vehicle) => (
                        <li
                            key={vehicle.id}
                            onClick={() => setSelectedVehicle(vehicle)}
                            className={selectedVehicle === vehicle ? "selected" : ""}
                        >
                            {vehicle.id} {vehicle.name}

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}