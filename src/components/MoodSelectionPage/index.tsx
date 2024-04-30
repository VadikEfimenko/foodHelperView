import './style.css';
import { useCallback, useMemo } from "react";
import classNames from 'classnames';
import React from "react";
import { ScreenSteps } from "../../App";

export function MoodSelectionPage({ title, onClick, value, type, caption }) {
    const mood = [{
        emojiHungry: '😐',
        emojiSatiety: '😐',
        score: 1,
    }, {
        emojiHungry: '😕',
        emojiSatiety: '😔',
        score: 2,
    }, {
        emojiHungry: '🙁',
        emojiSatiety: '😋',
        score: 3,
    }, {
        emojiHungry: '😰',
        emojiSatiety: '😰',
        score: 4,
    }, {
        emojiHungry: '😵',
        emojiSatiety: '🥴',
        score: 5,
    }];

    const elementIsSelected = useCallback((itemScore) => {
        return value === itemScore;
    }, [value])

    return (
        <div className="moodWrapper">
            <div className="moodTitle">{title}</div>
            <div className="caption">{caption}</div>

            <div className="moodContainer">
                {mood.map((item) => (
                    <div key={`item_${item.score}`}>
                        <div
                            className={classNames('emoji', elementIsSelected(item.score) ? ' moodSelected' : '')}
                            onClick={() => onClick(item.score)}
                        >
                            {type === ScreenSteps.EstimateHungry ? item.emojiHungry : item.emojiSatiety}
                        </div>

                        <div className="score">
                            {item.score}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}