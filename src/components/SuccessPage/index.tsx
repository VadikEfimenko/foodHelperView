import React from "react";
import success from '../../assets/success.png'
import './style.css';

export const SuccessPage: React.FC = () => {
    return (
        <div className="successWrapper">
            <img className='successImage' src={success} alt="My Image" />
            <div className='successText'>Отлично, записала!</div>
        </div>
    )
}