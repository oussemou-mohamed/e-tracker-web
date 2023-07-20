import { Button } from 'react-bootstrap';

const AddVehicleForm = ({
                            newMarque,
                            newModele,
                            newMatricule,
                            handleChangeMarque,
                            handleChangeModele,
                            handleChangeMatricule,
                            ajouterVehicule,
                        }) => {

    return (
        <div className="add-vehicle-form">
            <div className="form-group">
                <label className="form-label" htmlFor="marqueAjout">Marque :</label>
                <input
                    type="text"
                    id="marqueAjout"
                    name="marque"
                    value={newMarque}
                    onChange={handleChangeMarque}
                    className="form-control"
                />
                <div className="valid-feedback">Valid.</div>
                <div className="invalid-feedback">Please fill out this field.</div>
            </div>
            <div className="form-group">
                <label htmlFor="modele" className="form-label">Modèle :</label>
                <input
                    type="text"
                    id="modele"
                    name="modele"
                    value={newModele}
                    onChange={handleChangeModele}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="matricule" className="form-label">Matricule :</label>
                <input
                    type="text"
                    id="matricule"
                    name="matricule"
                    value={newMatricule}
                    onChange={handleChangeMatricule}
                    className="form-control"
                />
            </div>

            {/* Ajoutez d'autres champs pour d'autres informations à ajouter */}
            <Button onClick={ajouterVehicule} className="btn btn-primary button-text">
                Ajouter
            </Button>
        </div>
    );
};

export default AddVehicleForm;
