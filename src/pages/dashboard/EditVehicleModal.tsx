import {useAuth} from 'react-oidc-context';
import {useEffect, useState} from 'react';
import { Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './modal.css';
import { Button } from 'react-bootstrap';

const EditVehicleModal = ({
                              showModal,
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
        <>
            {showModal && selectedVehicle && (
                <div className="modal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modifier le véhicule {selectedVehicle}</h5>
                                <button
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="btn-close button-text"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                {/* Le reste du code pour le formulaire de modification */}
                            </div>
                            <div className="modal-footer">
                                <button
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="btn btn-secondary button-text"
                                    data-bs-dismiss="modal"
                                >
                                    Annuler
                                </button>
                                <button onClick={handleSubmitModification} type="button" className="btn btn-primary button-text">
                                    Sauvegarder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditVehicleModal;
