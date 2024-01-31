import { UserCard } from '../UserCard';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../../types';
import UserService from "../../services/UserService";
import { UserResponse } from "../../models/response/UserResponse";

export const Main = () => {
    const [users, setUsers] = useState<UserResponse[]>([]);
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        try {
            const response = await UserService.fetchAllUsers();

            setUsers(response.data);
        } catch (e) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            console.error(e.response?.data?.message);
        }
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const onUserClick = useCallback((id: string) => {
        navigate(`/admin/user/${id}`);
    }, []);

    return (
        <div className='usersWrapper'>
            {users && users.map((user: User) => (
                <UserCard key={`key_${user.name}`} onClick={() => onUserClick(user._id)} user={user} />
            ))}
        </div>
    )
}