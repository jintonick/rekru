import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './layout/main-layout';
import './App.css';
import { AuthProvider } from './auth/auth_context';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <MainLayout />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;

