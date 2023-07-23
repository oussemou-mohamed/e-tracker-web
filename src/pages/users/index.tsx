import { Alert, Empty, Skeleton } from 'antd';
import { useUsers } from './useUsers';
import { useVehicles } from './useVehicles';
export const UsersPage = () => {
  const { isLoading, error, data: users } = useUsers();
  const { isLoading: isLoadingVehicles, error: errorVehicles, data: vehicles,deleteVehicle } = useVehicles();
  if (error) {
    return (
      <>
        <Alert
          message="Error Text"
          description={`${error}`}
          type="error"
          closable
        />
        <Empty description={false} />
      </>
    );
  }
  if (isLoading) {
    return <Skeleton active />;
  }
  if (errorVehicles) {
    return (
        <>
          <Alert
              message="Error Text"
              description={`${error}`}
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
  return (
    <div>
      {users &&
        users.map((user, index) => (
          <div key={index}>
            {user.firstName} {user.lastName}
          </div>
        ))}
      {users &&
          vehicles.map((user, index) => (
              <div key={index}>
                {user.id} {user.name}
              </div>
          ))}

    </div>
  );
};
