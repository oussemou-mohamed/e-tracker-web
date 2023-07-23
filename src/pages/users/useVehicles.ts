// useVehicles.ts
import {useApi} from "../../libs/useApi";
import {useQuery, useMutation} from "react-query";
import {Vehicle} from "./types";
import {queryClient} from "../../libs/queryClientConfig";

const keys = {
    getVehicles: ['vehicles'],
};

export const useVehicles = () => {
    const api = useApi();

    const {isLoading, error, data: vehicles} = useQuery({
        queryFn: async () => {
            const response = await api.current.get<Vehicle[]>('/api/vehicles');
            return response.data;
        },
        queryKey: keys.getVehicles,
    });

    const deleteVehicle = useMutation(
        async (id: number) => {
            await api.current.delete(`/api/vehicles/${id}`);
        },
        {
            // Mettre à jour les données locales après la suppression réussie
            onSuccess: () => {
                // Invalider la requête pour rafraîchir les données
                queryClient.invalidateQueries(keys.getVehicles);
            },
        }
    );
    const updateVehicle = useMutation(
        async ({id, ...updatedVehicle}) => { // Utilisez la déstructuration pour extraire l'ID et les autres propriétés
            await api.current.put(`/api/vehicles/${id}`, updatedVehicle);
        },
        {
            // Mettre à jour les données locales après la mise à jour réussie
            onMutate: async (variables) => {
                await queryClient.cancelQueries(keys.getVehicles);

                const previousVehicles = queryClient.getQueryData<Vehicle[]>(keys.getVehicles);
                if (previousVehicles) {
                    const updatedVehicles = previousVehicles.map((vehicle) =>
                        vehicle.id === variables.id ? {...vehicle, ...variables} : vehicle
                    );
                    queryClient.setQueryData(keys.getVehicles, updatedVehicles);
                }

                return {previousVehicles};
            },
            onError: (error, variables, context) => {
                if (context?.previousVehicles) {
                    queryClient.setQueryData(keys.getVehicles, context.previousVehicles);
                }
            },
            // Rafraîchir les données après la mise à jour réussie
            onSettled: () => {
                queryClient.invalidateQueries(keys.getVehicles);
            },
        }
    );
    const addVehicle = useMutation(
        async (newVehicle) => {
            const response = await api.current.post('/api/vehicles', newVehicle);
            return response.data;
        },
        {
            // Mettre à jour les données locales après l'ajout réussi
            onSuccess: (data) => {
                queryClient.setQueryData(keys.getVehicles, (oldData) =>
                    oldData ? [...oldData, data] : [data]
                );
            },
        }
    );



    return {isLoading, error, data: vehicles, deleteVehicle, updateVehicle, addVehicle };
};
