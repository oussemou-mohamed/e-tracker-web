import {Alert, Empty, Skeleton, message, Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
import {useAuth} from 'react-oidc-context';
import {useEffect, useState} from 'react';
import {Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import './modal.css';
import AddVehicleForm from './AddVehicleForm';
import VehicleTable from './VehicleTable';
import VehicleModal from './VehicleModal';
import { useVehicles } from '../users/useVehicles';
export const DashboardPage = () => {
    // Importer les hooks d'état nécessaires depuis le useVehicles
    const { isLoading: isLoadingVehicles, error: errorVehicles, data: vehiclesData,deleteVehicle,addVehicle, } = useVehicles();
    // Hook d'authentification
    const auth = useAuth();//console.log(auth.user?.profile);
    // Autres hooks d'état

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
    const { updateVehicle } = useVehicles();


    // Mettre à jour le state avec les données des véhicules récupérées
    useEffect(() => {
        if (vehiclesData) {
            setVehicles(vehiclesData);
        }
    }, [vehicles]);
    if (errorVehicles) {
        return (
            <>
                <Alert
                    message="Error Text"
                    description={`${errorVehicles}`}
                    type="error"
                    closable
                />
                <Empty description={false} />
            </>
        );
    }
    if (isLoadingVehicles) {
        return <Skeleton active />;
    }
    // Fonction pour supprimer un véhicule
    const supprimerVehicule = (id) => {
        // Afficher la boîte de dialogue de confirmation
        confirm({
            title: 'Confirmation',
            icon: <ExclamationCircleOutlined />,
            content: 'Êtes-vous sûr de vouloir supprimer ce véhicule ?',
            okText: 'Oui',
            cancelText: 'Annuler',
            onOk: () => {
                // Suppression réussie
                deleteVehicle.mutate(id);
                // Afficher le message de succès
                message.success('Le véhicule a été supprimé avec succès.', 2);
            },
        });
        // Appelez la fonction de suppression avec l'ID du véhicule à supprimer

    };
    const handleModifierVehicule = (id) => {
        setSelectedVehicle(id);
        const selectedVehiclelocal = vehiclesData.find((vehicle) => vehicle.id === id);
        setModifiedMarque(selectedVehiclelocal ? selectedVehiclelocal.name : '');
        setModifiedModele(selectedVehiclelocal ? selectedVehiclelocal.modele: '');
        setModifiedMatricule(selectedVehiclelocal ? selectedVehiclelocal.matricule : '');
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
            /*setVehicles((prevVehicles) =>
                prevVehicles.map((vehicle) =>
                    vehicle.id === selectedVehicle
                        ? {
                            ...vehicle, marque: modifiedMarque,
                            modele: modifiedModele,
                            matricule: modifiedMatricule,
                        }
                        : vehicle
                )
            );*/
            // Mettre à jour les informations du véhicule avec les valeurs modifiées
            const updatedVehicle = {
                id: selectedVehicle,
                marque: modifiedMarque,
                modele: modifiedModele,
                matricule: modifiedMatricule,
            };
            // Appeler la fonction de mise à jour avec le véhicule mis à jour
            updateVehicle.mutate(updatedVehicle);
            // Fermer le modal après la soumission
            setShowModal(false);
            setSelectedVehicle(null);
        }
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
    // l'état qui contrôlera la visibilité du formulaire d'ajout.
    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        // Réinitialisez les valeurs des champs lorsque vous masquez le formulaire d'ajout
        if (!showAddForm) {
            setNewMarque('');
            setNewModele('');
            setNewMatricule('');
        }
    };
    // Fonction pour ajouter un véhicule
    const ajouterVehicule = () => {
        // Vérifier que les champs ne sont pas vides avant d'ajouter le véhicule
        if (newMarque && newModele && newMatricule) {
            const newVehicle = {
                name: newMarque,
            };

            // Appeler la fonction d'ajout de véhicule
            addVehicle.mutate(newVehicle);

            // Fermer le formulaire d'ajout
            toggleAddForm();
        } else {
            // Afficher un message d'erreur si l'un des champs est vide
            message.error('Veuillez remplir tous les champs du formulaire.');
        }
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


            <VehicleTable vehicles={vehiclesData} supprimerVehicule={supprimerVehicule}
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