
const VehicleModal = ({
                          selectedVehicle,
                          modifiedMarque,
                          modifiedModele,
                          modifiedMatricule,
                          handleMarqueChange,
                          handleModeleChange,
                          handleMatriculeChange,
                          handleCloseModal,
                          handleSubmitModification,
                      }) => {
    return (
        <div className="modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Contenu du formulaire de modification */}
                    <div className="modal-header">
                        <h5 className="modal-title">Modifier le véhicule {selectedVehicle}</h5>
                        <button onClick={handleCloseModal} type="button" className="btn-close button-text" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    {/* ici les champs de modification et les boutons de soumission/annulation */}
                    <div className="modal-body">
                        <label htmlFor="marqueModif" className="form-label" >Marque:</label>
                        <input
                            type="text"
                            id="marqueModif"
                            name="marque"
                            value={modifiedMarque}
                            onChange={handleMarqueChange}
                            className="form-control"
                        />
                    </div>
                    <div className="modal-body">
                        <label htmlFor="modele" className="form-label">Modèle :</label>
                        <input
                            type="text"
                            id="modele"
                            name="modele"
                            value={modifiedModele}
                            onChange={handleModeleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="modal-body">
                        <label htmlFor="matricule" className="form-label">Matricule :</label>
                        <input
                            type="text"
                            id="matricule"
                            name="matricule"
                            value={modifiedMatricule}
                            onChange={handleMatriculeChange}
                            className="form-control"
                        />
                    </div>
                    {/* Ajoutez ici d'autres champs pour les autres informations à modifier */}
                    <div className="modal-footer">
                        <button onClick={handleCloseModal} type="button" className="btn btn-secondary button-text" data-bs-dismiss="modal">Annuler</button>
                        <button onClick={handleSubmitModification}  type="button" className="btn btn-primary button-text">Sauvegarder</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default VehicleModal;
