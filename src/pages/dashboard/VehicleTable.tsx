import { Button, Table } from 'react-bootstrap';

const VehicleTable = ({ vehicles, supprimerVehicule, handleModifierVehicule }) => {

    return (                <Table striped bordered hover >
            <thead>
            <tr>
                <th>ID</th>
                <th>Marque</th>
                <th>Modéle</th>
                <th>Matricule</th>
                {/*<th>Année de fabrication</th>
                <th>Couleur </th>
                <th>Type </th>
                <th>Kilométrage </th>
                <th>Carburant </th>
                <th>Matricule</th>
                <th>Puissance </th>*/}
            </tr>
            </thead>

            <tbody>
            {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.name}</td>
                    <td>{vehicle.modele}</td>
                    <td>{vehicle.matricule}</td>
                    {/*<td>{vehicle.anneeFabrication}</td>
                    <td>{vehicle.couleur}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.kilometrage}</td>
                    <td>{vehicle.carburant}</td>
                    <td>{vehicle.puissance}</td>*/}
                    <td>
                        <Button onClick={() => supprimerVehicule(vehicle.id)} className="btn btn-danger button-text">Supprimer</Button>
                        <Button onClick={() => handleModifierVehicule(vehicle.id)} className="btn btn-info button-text">Modifier</Button>                            </td>
                </tr>
            ))}
            </tbody>
        </Table>

    );
};

export default VehicleTable;
