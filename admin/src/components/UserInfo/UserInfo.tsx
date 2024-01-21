import React, {useCallback, useEffect, useState} from 'react';
import './index.css'
import { useNavigate, useParams } from 'react-router-dom';
import { UserTable } from '../UserTable/UserTable';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import BackArrow from '../../assets/arrow.svg?react';
import UserService from "../../services/UserService";

export const UserInfo: React.FC = () => {
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();
    const [mealTimes, setMealtimes] = useState({});
    const { id } = useParams();

    const fetchUserById = useCallback(async () => {
        if (id) {
            try {
                const response = await UserService.fetchUserDataById(id);

                setMealtimes(response.data.mealTimes);
                setUserInfo(response.data.user.name);
            } catch (e) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                console.error(e.response?.data?.message);
            }
        }
    }, [id]);

    useEffect(() => {
        fetchUserById();
    }, []);

    return (
        <div className='usersWrapper'>
            <div className='userPage'>
                <div className='userPageTitle'>
                    <BackArrow onClick={() => navigate(-1)} className='backArrow' />
                    {userInfo}
                </div>

                <div className='tablesWrapper'>
                    {Object.keys(mealTimes).length === 0 && (
                        <div className='noData'>Нет данных :(</div>
                    )}

                    {mealTimes && Object.keys(mealTimes).map((item) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        const meals = mealTimes[item];

                        return <UserTable key={item} date={item} mealTimes={meals} />
                    })}
                </div>
            </div>
        </div>
    );
}