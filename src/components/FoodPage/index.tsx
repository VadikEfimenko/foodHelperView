import React from "react";
import './style.css';

export function FoodPage({ onChange, value }) {
    return (
        <div className="foodWrapper">
            <div className="foodTitle">Запишите, что вы съели сегодня</div>
            <div className="caption">Перечислите блюда:</div>
            <textarea
                className="recordInput"
                placeholder="пирожочек с повидлом, йогурт Danone, 1 вареное яйцо..."
                onChange={(event) => onChange(event.target.value)}
                value={value}
            />
        </div>
    )
}