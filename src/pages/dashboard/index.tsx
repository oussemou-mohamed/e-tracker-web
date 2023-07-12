
import { useAuth } from 'react-oidc-context';

export const DashboardPage = () => {
  const auth = useAuth();
  
  console.log(auth.user?.profile);
  return (
    <div>
      {auth.user?.scopes}
    </div>
  );
};
