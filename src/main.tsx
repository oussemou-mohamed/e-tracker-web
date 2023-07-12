import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ConfigProvider, theme } from 'antd';
import { AuthProvider } from 'react-oidc-context';
import { User } from 'oidc-client-ts';
import { StyleProvider } from '@ant-design/cssinjs';
import './index.css';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './libs/queryClientConfig.ts';

const oidcConfig = {
  onSignIn: async (user: User) => {
    console.log('onSignIn');
    window.location.hash = '';
  },
  onSignOut: async () => {
    console.log('onSignOut');
  },
  authority: 'http://localhost:8080/realms/e-tracker-web/',
  client_id: 'frontend',
  redirect_uri: 'http://localhost:5173',
  onSigninCallback: async (user: void | User) => {
    console.log('onSigninCallback');
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <StyleProvider hashPriority="high">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2b6cb0',
            },
            algorithm: theme.defaultAlgorithm,
          }}
        >
          <AuthProvider {...oidcConfig}>
            <App />
          </AuthProvider>
        </ConfigProvider>
      </StyleProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
