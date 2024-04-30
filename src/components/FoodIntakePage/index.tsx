import './style.css';
import React from 'react';
import classNames from "classnames";

export function FoodIntakePage({ setFoodIntake, value }) {
    const foodIntake = [
        { text: 'Завтрак', type: 'breakfast'},
        { text: 'Второй завтрак', type: 'second_breakfast'},
        { text: 'Обед', type: 'launch'},
        { text: 'Перекус', type: 'snack'},
        { text: 'Ужин', type: 'dinner'},
    ];

    return (
        <div className="wrapper">
            <div className="foodIntakeTitle">Выберите прием пищи</div>
            <div className="foodIntakeWrapper">
                {foodIntake.map((item) => (
                    <button
                        key={`item_${item.text}`}
                        className={classNames('foodIntake', item.text === value ? ' foodIntakeSelected' : '')}
                        onClick={(event) => {
                            event.preventDefault();
                            setFoodIntake(item.text);
                        }
                    }>
                        {item.text}
                    </button>
                ))}
            </div>
        </div>
    );
}