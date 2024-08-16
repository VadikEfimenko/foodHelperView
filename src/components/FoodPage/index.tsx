import React, {useCallback} from "react";
import './style.css';
import Camera from '../../assets/camera.svg?react';
import classNames from "classnames";

export function FoodPage({ onChange, value, setImage, image }) {
    const handleFileChange = useCallback((e) => {
            setImage(e.target.files[0]);
    }, [setImage]);

    return (
        <div className="foodWrapper">
            <div className="foodTitle">Запишите, что вы съели сегодня</div>
            <div className="caption">Перечислите блюда:</div>

            <div className="inputWrapper">
                <textarea
                    className="recordInput"
                    placeholder="пирожочек с повидлом, йогурт Danone, 1 вареное яйцо..."
                    onChange={(event) => onChange(event.target.value)}
                    value={value}
                />

                <label className={classNames('custom-file-upload', image ? 'imageLoaded' : '')}>
                    <Camera />
                    <input accept="image/png, image/jpeg" type='file' name='image' onChange={handleFileChange}/>
                </label>
            </div>
        </div>
    )
}