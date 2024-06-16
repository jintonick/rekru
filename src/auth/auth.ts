export type UserType = 'APPLICANT' | 'RECRUITER';

export interface AuthData {
    token: string;
    userType: UserType;
}

const mockTokens: { [key: string]: AuthData } = {
    user: {
        token: 'user-token-123',
        userType: 'APPLICANT',
    },
    recruiter: {
        token: 'recruiter-token-456',
        userType: 'RECRUITER',
    },
};

export const login = (token: string, userType: UserType): AuthData => {
    return { token, userType };
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

