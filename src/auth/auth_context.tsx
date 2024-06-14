import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthData, login, logout as logoutFn, isLoggedIn, getUserType, UserType } from './auth';

interface AuthContextType {
    authData: AuthData | null;
    login: (userType: UserType) => void;
    logout: () => void;
    isLoggedIn: boolean;
    userType: UserType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [userType, setUserType] = useState<UserType | null>(null);

    useEffect(() => {
        if (isLoggedIn()) {
            const storedUserType = getUserType();
            if (storedUserType) {
                setAuthData({ token: localStorage.getItem('authToken')!, userType: storedUserType });
                setUserType(storedUserType);
            }
        }
    }, []);

    const loginHandler = (userType: UserType) => {
        const data = login(userType);
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userType', data.userType);
        setAuthData(data);
        setUserType(data.userType);
    };

    const logoutHandler = () => {
        logoutFn();
        setAuthData(null);
        setUserType(null);
    };

    return (
        <AuthContext.Provider value={{ authData, login: loginHandler, logout: logoutHandler, isLoggedIn: !!authData, userType }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
