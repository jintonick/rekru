import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MainLayout from './layout/main-layout';
import './App.css';
import { AuthProvider } from './auth/auth_context';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AuthProvider>
                    <MainLayout />
                </AuthProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;

