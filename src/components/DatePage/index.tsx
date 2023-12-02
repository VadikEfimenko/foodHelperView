import React, { useEffect, useState} from 'react';
import './style.css';
import classNames from "classnames";

export function DatePage({ onClick, value }) {
    const [days, setDays] = useState([]);

    useEffect(() => {
        const today = new Date();
        const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

        setDays([{
            day: today.getDate() - 1,
            value: yesterday.toISOString(),
            text: '',
        }, {
            day: today.getDate(),
            value: today.toISOString(),
            text: 'Сегодня',
        }, {
            day: today.getDate() + 1,
            value: tomorrow.toISOString(),
            text: '',
        }])
    }, [])

    return (
        <div className="dateWrapper">
            <div className="title">Дневник питания</div>
            <div className="subtitle">Выберите дату</div>
            <div className="buttonWrapper">
                {days.map((item) =>
                    <div key={`item_${item.value}`}>
                        <button
                            className={classNames('dateButton', item.value === value ? ' dateSelected' : '')}
                            onClick={() => onClick(item.value)}
                        >
                            {item.day}
                        </button>
                        <div className="caption">{item.text}</div>
                    </div>
                )}
            </div>
        </div>
    )
}