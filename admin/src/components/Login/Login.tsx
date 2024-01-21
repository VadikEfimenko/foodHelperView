import { useAuthContext } from "../../context/AuthProvider";
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import './style.css';

enum AuthTypes {
    Registration = 'registration',
    Login = 'login',
}

export const Login = () => {
    const { onLogin, onRegistration } = useAuthContext();
    const [password, setPassword] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [secretKey, setSecretKey] = useState<string>('');
    const [disabled, setDisabled] = useState<boolean>(true);
    const [authType, setAuthType] = useState<AuthTypes>(AuthTypes.Login);

    const onPasswordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }, []);

    const onLoginChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }, []);

    const onSecretKeyChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSecretKey(event.target.value);
    }, []);

    useEffect(() => {
        if (password && login) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [login, password]);

    return (
        <div className='loginFormWrapper'>
            <div className='loginForm'>
                <div className='title'>{authType === AuthTypes.Login ? 'Вход' : 'Регистрация'}</div>
                <input
                    className='loginInput'
                    type='text'
                    value={login}
                    name="login"
                    onChange={onLoginChange}
                    placeholder='Логин'
                />
                <input
                    className='loginInput'
                    type='password'
                    value={password}
                    name="password"
                    onChange={onPasswordChange}
                    placeholder='Пароль'
                />

                {authType === AuthTypes.Registration && (
                    <input
                        className='loginInput'
                        type='text'
                        value={secretKey}
                        name="secretKey"
                        onChange={onSecretKeyChange}
                        placeholder='Ключ'
                    />
                )}

                <div>
                    <button
                        className='button'
                        disabled={disabled}
                        onClick={authType === AuthTypes.Login ?
                            () => onLogin(password, login) :
                            () => onRegistration(password, login, secretKey)
                        }
                    >
                        {authType === AuthTypes.Login ? 'Войти' : 'Продолжить'}
                    </button>

                    <div className='auth'>
                        {authType === AuthTypes.Login ? (
                            <>
                                Нет аккаунта? &nbsp;
                                <div
                                    className='authLink'
                                    onClick={() => setAuthType(AuthTypes.Registration)}
                                >
                                    Зарегистрироваться
                                </div>
                            </>
                        ) : (
                            <>
                                Уже есть аккаунт? &nbsp;
                                <div
                                    className='authLink'
                                    onClick={() => setAuthType(AuthTypes.Login)}
                                >
                                    Войти
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}