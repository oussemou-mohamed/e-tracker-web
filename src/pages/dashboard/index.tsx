import {useAuth} from 'react-oidc-context';
import {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './modal.css';
import AddVehicleForm from './AddVehicleForm';
import VehicleTable from './VehicleTable';
import VehicleModal from './VehicleModal';

export const DashboardPage = () => {
    const auth = useAuth();//console.log(auth.user?.profile);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modifiedMarque, setModifiedMarque] = useState('');
    const [modifiedModele, setModifiedModele] = useState('');
    const [modifiedMatricule, setModifiedMatricule] = useState('');
    const [newMarque, setNewMarque] = useState('');
    const [newModele, setNewModele] = useState('');
    const [newMatricule, setNewMatricule] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const vehicles = [{id: 1, marque: 'Véhicule 1', matricule: '1212;33;33', modele: 'dacia'}, {
                id: 2,
                marque: 'Véhicule 2',
                matricule: '1212;33;33',
                modele: 'BMW'
            },];
            setVehicles(vehicles);
        } catch (error) {
            console.error(error);
        }
    };
    // Fonction pour supprimer un véhicule
    const supprimerVehicule = (id) => {
        setVehicles(vehicles.filter((vehicule) => vehicule.id !== id));
    };
    const handleModifierVehicule = (id) => {
        console.log("qqqqq");
        setSelectedVehicle(id);
        const selectedVehicle = vehicles.find((vehicle) => vehicle.id === id);
        setModifiedMarque(selectedVehicle ? selectedVehicle.marque : '');
        setModifiedModele(selectedVehicle ? selectedVehicle.modele : '');
        setModifiedMatricule(selectedVehicle ? selectedVehicle.matricule : '');
        setShowModal(true);
    };
    // Fonction pour mettre à jour l'état modifiedMarque lors de la modification du champ
    const handleMarqueChange = (event) => {
        setModifiedMarque(event.target.value);
    };
    // Fonction pour mettre à jour l'état modifiedModele lors de la modification du champ "Modele"
    const handleModeleChange = (event) => {
        setModifiedModele(event.target.value);
    };
    // Fonction pour mettre à jour l'état modifiedMatricule lors de la modification du champ "Matricule"
    const handleMatriculeChange = (event) => {
        setModifiedMatricule(event.target.value);
    };
    const handleCloseModal = () => {
        setSelectedVehicle(null);
        setShowModal(false);
    };
    // Fonction pour gérer la soumission du formulaire de modification
    const handleSubmitModification = () => {
        // Vérifier que l'ID du véhicule sélectionné est valide
        if (selectedVehicle) {
            // Mettre à jour les informations du véhicule avec les valeurs modifiées
            setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) =>
                    vehicle.id === selectedVehicle
                        ? {
                            ...vehicle, marque: modifiedMarque,
                            modele: modifiedModele,
                            matricule: modifiedMatricule,
                        }
                        : vehicle
                )
            );
        }
        // Fermer le modal après la soumission
        setShowModal(false);
        setSelectedVehicle(null);
    };
    //////////////////Ajouter//////////////
    // Fonction pour gérer les changements dans les champs du formulaire d'ajout
    const handleChangeMarque = (event) => {
        setNewMarque(event.target.value);
    };
    const handleChangeModele = (event) => {
        setNewModele(event.target.value);
    };
    const handleChangeMatricule = (event) => {
        setNewMatricule(event.target.value);
    };
    // Fonction pour ajouter un véhicule
    const ajouterVehicule = () => {
        // Vérifiez si les champs requis sont remplis avant d'ajouter le véhicule
        if (newMarque && newModele && newMatricule) {
            const nouvelId = vehicles.length + 1;
            setVehicles([...vehicles, {id: nouvelId, marque: newMarque, modele: newModele, matricule: newMatricule}]);
            // Réinitialiser le formulaire après l'ajout
            setNewMarque('');
            setNewModele('');
            setNewMatricule('');
            ////////////////////////////ajouter a la base de donner
        }
    };
    // l'état qui contrôlera la visibilité du formulaire d'ajout.
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
    };
    return (
        <div>            {/* Ajouter */}
            <div className="button-container">
                <Button onClick={toggleAddForm} className="btn btn-primary button-text">
                    {showAddForm ? "Annuler" : "Ajouter un véhicule"}</Button>
            </div>
            {/* Afficher le formulaire d'ajout si showAddForm est vrai */}
            {showAddForm && (
                <AddVehicleForm
                    newMarque={newMarque}
                    newModele={newModele}
                    newMatricule={newMatricule}
                    handleChangeMarque={handleChangeMarque}
                    handleChangeModele={handleChangeModele}
                    handleChangeMatricule={handleChangeMatricule}
                    ajouterVehicule={ajouterVehicule}
                />
            )}
            {/* Afficher */}
            <VehicleTable vehicles={vehicles} supprimerVehicule={supprimerVehicule}
                          handleModifierVehicule={handleModifierVehicule}/>
            {/* Modal de modification */}
            {showModal && selectedVehicle && (
                <VehicleModal
                    selectedVehicle={selectedVehicle}
                    modifiedMarque={modifiedMarque}
                    modifiedModele={modifiedModele}
                    modifiedMatricule={modifiedMatricule}
                    handleMarqueChange={handleMarqueChange}
                    handleModeleChange={handleModeleChange}
                    handleMatriculeChange={handleMatriculeChange}
                    handleCloseModal={handleCloseModal}
                    handleSubmitModification={handleSubmitModification}
                />)}
        </div>
    );
}