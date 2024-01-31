import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import { BASE_URL } from '../http';
import {useLocation, useNavigate} from "react-router-dom";
import AuthService from "../services/AuthService";

type AuthContextType = {
    isAuthenticated: boolean;
    setAuth: (auth: boolean) => void;
    onLogout: () => void;
    onLogin: (password: string, login: string) => void;
    onRegistration: (password: string, login: string, secretKey: string) => void;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    setAuth: () => {},
    onLogout: () => {},
    onRegistration: () => {},
    onLogin: () => {},
    loading: true,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setAuth] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [checkAuthStatus, setCheckAuth] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/admin';

    const checkAuth = useCallback(async () => {
        try {
            const response = await axios.get<AuthResponse>(`${BASE_URL}/refresh`, { withCredentials: true });

            localStorage.setItem('token', response.data.accessToken);
            setAuth(true);
            setLoading(false);
            setCheckAuth(true);
            navigate(from, { replace: true });
        } catch (e) {
            setLoading(false);
            console.error(e);
        }
    }, []);

    const onLogout = useCallback(async () => {
        try {
            await AuthService.logout();

            localStorage.removeItem('token');
            setAuth(false);
            navigate('/admin/login', { replace: true });
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.error(e.response?.data?.message);
        }
    }, []);

    const onLogin = useCallback(async (password: string, login: string) => {
        try {
            const response = await AuthService.login(login, password);

            localStorage.setItem('token', response.data.accessToken);
            setAuth(true);
            navigate(from, { replace: true });
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.error(e.response?.data?.message);
        }
    }, []);

    const onRegistration = useCallback(async (password: string, login: string, secretKey: string) => {
        try {
            const response = await AuthService.registration(login, password, secretKey);

            localStorage.setItem('token', response.data.accessToken);
            setAuth(true);
            navigate(from, { replace: true });
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.error(e.response?.data?.message);
        }
    }, []);

    useEffect(() => {
        if (!checkAuthStatus) {
            checkAuth();
        }
    }, [checkAuthStatus]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setAuth, loading, onLogout, onLogin, onRegistration }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};