import { Result } from 'antd';
import { LayoutWrapper } from './layouts';
import { Link, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { DashboardPage } from './pages/dashboard';
import { PrivateRoute } from './routes/PrivateRoute';
import { HomePage } from './pages/home';
import { UsersPage } from './pages/users';

const ErrorPage = () => {
  return <Result status="500" title="500" subTitle="Sorry, something went wrong." extra={<Link to="/">Back Home</Link>} />;
};

const routerJSX = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LayoutWrapper />} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute>
              <UsersPage />
            </PrivateRoute>
          }
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={routerJSX} />;
}

export default App;
