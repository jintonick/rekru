import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserType = 'APPLICANT' | 'RECRUITER';

export interface AuthData {
    token: string;
    userType: UserType;
}

interface AuthContextType {
    authData: AuthData | null;
    login: (token: string, userType: UserType) => void;
    logout: () => void;
    isLoggedIn: boolean;
    userType: UserType | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authData, setAuthData] = useState<AuthData | null>(null);
    const [userType, setUserType] = useState<UserType | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const userType = localStorage.getItem('userType') as UserType | null;
        if (token && userType) {
            setAuthData({ token, userType });
            setUserType(userType);
        }
    }, []);

    const loginHandler = (token: string, userType: UserType) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('userType', userType);
        setAuthData({ token, userType });
        setUserType(userType);
    };

    const logoutHandler = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userType');
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



