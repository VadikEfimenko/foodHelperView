import './style.css';
import React, { useCallback } from 'react';
import signout from '../../assets/signout.svg'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthProvider';

export const Header: React.FC = () => {
    const { isAuthenticated, onLogout } = useAuthContext();
    const navigate = useNavigate();

    const onLogoClick = useCallback(() => {
        navigate(`/`);
    }, []);

    return (
        <div className='header'>
            <div className='headerWrapper'>
                <div onClick={onLogoClick} className='logo' />
                {isAuthenticated && <div onClick={onLogout} className='logout'>Выйти <img src={signout} /></div>}
            </div>
        </div>
    );
}