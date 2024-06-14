export type UserType = 'user' | 'recruiter';

export interface AuthData {
    token: string;
    userType: UserType;
}

const mockTokens: { [key: string]: AuthData } = {
    user: {
        token: 'user-token-123',
        userType: 'user',
    },
    recruiter: {
        token: 'recruiter-token-456',
        userType: 'recruiter',
    },
};

export const login = (userType: UserType): AuthData => {
    return mockTokens[userType];
};

export const isLoggedIn = (): boolean => {
    return !!localStorage.getItem('authToken');
};

export const getUserType = (): UserType | null => {
    return localStorage.getItem('userType') as UserType | null;
};

export const logout = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
};
