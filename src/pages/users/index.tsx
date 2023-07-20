import { Alert, Empty, Skeleton } from 'antd';
import { useUsers } from './useUsers';

export const UsersPage = () => {
  const { isLoading, error, data: users } = useUsers();
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

  return (
    <div>
      {users &&
        users.map((user, index) => (
          <div key={index}>
            {user.firstName} {user.lastName}
          </div>
        ))}
        
    </div>
  );
};
