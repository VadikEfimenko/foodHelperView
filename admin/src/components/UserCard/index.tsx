import './style.css';
import React from "react";

interface IUserProps {
    onClick: () => void;
    user: {
        name: string
        email: string;
        _id: string;
    };
}

export const UserCard: React.FC<IUserProps> = ({ user, onClick }) => {
    return (
        <div onClick={onClick} className='userCard'>
            <div>
                <div className="title">{user.name}</div>
                <div className='badge'>ID - {user._id}</div>
            </div>

            <div className='contactBadge'>
                {user.email}
            </div>
        </div>
    )
}