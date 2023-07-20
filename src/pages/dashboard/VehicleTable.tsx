import { Button, Table } from 'react-bootstrap';

const VehicleTable = ({ vehicles, supprimerVehicule, handleModifierVehicule }) => {
    return (                <Table striped bordered hover >
            <thead>
            <tr>
                <th>ID</th>
                <th>Marque</th>
                <th>Modéle</th>
                <th>Matricule</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.marque}</td>
                    <td>{vehicle.modele}</td>
                    <td>{vehicle.matricule}</td>
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
