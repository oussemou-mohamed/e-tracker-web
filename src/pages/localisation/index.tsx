import {useAuth} from 'react-oidc-context';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import L from 'leaflet';
import "./index.css";
import {useEffect, useState} from 'react';

export const Localisation = () => {
    const auth = useAuth();
    const position = [33.2077013173306, -8.003519857990653];
    console.log(auth.user?.profile);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const DefaultIcon = L.icon({
        iconUrl: "/marker-icon.png",
    });
    const [vehicles, setVehicles] = useState([]);
    const [showAllVehicles, setShowAllVehicles] = useState(true);
    const changerVehicule = (vehi) => {
        setSelectedVehicle(vehi);
        setShowAllVehicles(false);
    };
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const vehicl = [{id: 1, name: 'kamal',lon:31.67285992947886,tit:-8.004939132997952}, {id: 2, name: 'maryam',lon:32.12123439560203,tit:-8.641209027398343}];
            setVehicles(vehicl);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="container" >
            <div className="vehicle-menu">
                <h3>Vehicles</h3>
                <ul>
                    {vehicles.map((vehicle) => (
                        <li
                            key={vehicle.id}
                            onClick={() => changerVehicule(vehicle)}
                            className={selectedVehicle === vehicle ? "selected" : ""}
                        >
                            {vehicle.id} {vehicle.name}
                        </li>
                    ))}
                </ul>
            </div >
            <div className="map-container">
            <MapContainer center={position} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {  showAllVehicles && vehicles.map((item) => (
                    <Marker key={item.id} position={[item.lon, item.tit]} icon={DefaultIcon}>
                            <Popup>
                                <h3>{item.id}</h3>
                                <p>Latitude: {item.lon}</p>
                                <p>Longitude: {item.tit}</p>
                            </Popup>
                    </Marker>
                ))}
                {!showAllVehicles && selectedVehicle && (
                    <Marker
                        key={selectedVehicle.id}
                        position={[selectedVehicle.lon, selectedVehicle.tit]}
                        icon={DefaultIcon}
                    >
                        <Popup>
                            <h3>{selectedVehicle.id}</h3>
                            <p>Latitude: {selectedVehicle.lon}</p>
                            <p>Longitude: {selectedVehicle.tit}</p>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
            </div>

        </div>
    );
}