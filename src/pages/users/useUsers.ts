import { useApi } from "../../libs/useApi"
import { useQuery } from "react-query";
import { User } from "./types";


const keys = {
  getUsers : ['users']
}

export const useUsers = () => {
  const api = useApi();

  return useQuery({
    queryFn: async () => {
      const response = await api.current.get<User[]>('/api/users');
      return response.data;
    },
    queryKey: keys.getUsers
  })
}