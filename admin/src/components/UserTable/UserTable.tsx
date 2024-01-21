import React, { useState } from 'react';
import './index.css'
import {MealEntry} from "../../models/response/UserResponse";

interface UserTableProps {
    date: string;
    mealTimes: MealEntry[];
}

export const UserTable: React.FC<UserTableProps> = ({ date, mealTimes }) => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className='userTable'>
            <div className='userTableTitle'>
                <div className='dateBadge'>{date}</div>
                <div
                    className='toggle'
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <>Развернуть</> : <>Свернуть</>}
                </div>
            </div>
            {!collapsed && mealTimes && (
                <>
                    <div>
                        <div className='userTableHeader'>
                            <div className='userTableCell'>Вид приёма пищи</div>
                            <div className='userTableBigCell'>Что съел</div>
                            <div className='userTableCell'>Шкала голода</div>
                            <div className='userTableCell'>Шкала насыщения</div>
                        </div>
                    </div>

                    {mealTimes && mealTimes.map((food: MealEntry) => (
                        <div className='userTableRow' key={`key_${food.text}`}>
                            <div className='userTableCell'>{food.foodIntake}</div>
                            <div className='userTableBigCell'>{food.text}</div>
                            <div className='userTableCell'>{food.hungryScale ? `${food.hungryScale}/5` : '-'}</div>
                            <div className='userTableCell'>{food.satietyScale ? `${food.satietyScale}/5` : '-'}</div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}