import { Row, Col, Spin } from "antd";
import { useAuth } from "react-oidc-context";
import { useLocation, Navigate } from "react-router-dom";

// un composant de route privée  vérifie l'authentification de l'utilisateur avant de rendre son contenu

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isLoading) {
    return (
      <Row>
        <Col>
          <Spin />
        </Col>
      </Row>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};