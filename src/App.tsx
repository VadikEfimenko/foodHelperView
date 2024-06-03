import './App.css';
import { useCallback, useEffect, useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import { MoodSelectionPage } from './components/MoodSelectionPage';
import React from 'react';

import { SuccessPage } from './components/SuccessPage';
import { FoodIntakePage } from './components/FoodIntakePage';
import { DatePage } from './components/DatePage';
import { FoodPage } from './components/FoodPage';
import BackArrow from './assets/previous.svg?react';

export enum ScreenSteps {
    Success = 'success',
    EstimateHungry = 'estimateHungry',
    EstimateSatiety = 'estimateSatiety',
    FoodIntake = 'foodIntake',
    FoodForm = 'foodForm',
    Date = 'date'
}

enum ResponseStatus {
    Ok = 'OK',
    Error = 'error',
}

interface IResult {
    status: ResponseStatus,
}

function App() {
    const [foodLog, setFoodLog] = useState({
        text: '',
        foodIntake: '',
        date: '',
        hungryScale: null,
        satietyScale: null,
    });
    const { tg, mainButton, onClose, user, queryId } = useTelegram();
    const [step, setStep] = useState(ScreenSteps.Date);
    const procedure = [
        ScreenSteps.Date,
        ScreenSteps.EstimateHungry,
        ScreenSteps.FoodIntake,
        ScreenSteps.FoodForm,
        ScreenSteps.EstimateSatiety,
        ScreenSteps.Success
    ];
    const moodDescription = {
        [ScreenSteps.EstimateHungry]: ['Ни голоден, ни сыт', 'Слегка голоден', 'Голоден', 'Очень голоден', 'Умираю от голода'],
        [ScreenSteps.EstimateSatiety]: ['Ни голоден, ни сыт', 'не наелся', 'наелся. чувствую себя комфортно', 'слегка переел', 'объелся'],
    };

    useEffect(() => {
        setFoodLog({
            ...foodLog,
            date: new Date().toISOString(),
        });

        tg.ready();
    }, []);

    useEffect(() => {
        if (foodLog) {
            const entityKeys = Object.keys(foodLog);
            // const allInputFilled = entityKeys.length > 0 && entityKeys.every((item) => !!foodLog[item]);
            const allInputFilled = step === ScreenSteps.EstimateSatiety && foodLog.satietyScale !== null;

            if (allInputFilled && !mainButton.isVisible) {
                mainButton.show();
            }

            if (!allInputFilled && mainButton.isVisible) {
                mainButton.hide();
            }
        }
    }, [foodLog]);

    const nextStep = useCallback(() => {
        const currentIndex = procedure.indexOf(step);
        setStep(procedure[currentIndex + 1]);
    }, [step]);

    const previousStep = useCallback(() => {
        const previousStep =  procedure[procedure.indexOf(step) - 1];

        setStep(previousStep);
    }, [step]);

    const onSendData = useCallback(async () => {
        const userBody = JSON.stringify({ userId: user?.id ?? '114856211', queryId, ...foodLog });

        console.log('LOGS queryId: ', queryId);

        let result = await fetch(
            'https://efimenko.tech/api/recordMealTime', {
                method: "POST",
                body: userBody,
                headers: {
                    'Content-Type': 'application/json'
                }
        });

        const status: IResult = await result.json();

        if (status.status === ResponseStatus.Ok) {
            setStep(ScreenSteps.Success);
        }

        setTimeout(() => {
            onClose();
        }, 2000);
    }, [foodLog]);

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Записать!'
        })
    }, [])

    return (
        <div className="App">
            {(() => {
                switch (step) {
                    case ScreenSteps.Date:
                        return (
                            <div className="container">
                                <DatePage
                                    value={foodLog.date}
                                    onClick={(date) => {
                                        setFoodLog({
                                            ...foodLog,
                                            date,
                                        });
                                    }}
                                />
                            </div>
                        )
                    case ScreenSteps.Success:
                        return (
                            <div className="container">
                                <SuccessPage />
                            </div>
                        );
                    case ScreenSteps.EstimateHungry:
                        return (
                            <div className="container">
                                <MoodSelectionPage
                                    caption='Оцените чувство голода:'
                                    title='Шкала голода'
                                    onClick={(score) => {
                                        setFoodLog({
                                            ...foodLog,
                                            hungryScale: foodLog.hungryScale !== score ? score : null,
                                        });
                                    }}
                                    type={step}
                                    value={foodLog.hungryScale}
                                />
                            </div>
                        );
                    case ScreenSteps.EstimateSatiety:
                        return (
                            <div className="container">
                                <MoodSelectionPage
                                    caption='Оцените чувство насыщения:'
                                    title='Шкала насыщения'
                                    onClick={(score) => {
                                        setFoodLog({
                                            ...foodLog,
                                            satietyScale: foodLog.satietyScale !== score ? score : null,
                                        });
                                    }}
                                    type={step}
                                    value={foodLog.satietyScale}
                                />
                            </div>
                        );
                    case ScreenSteps.FoodForm:
                        return (
                            <div className="container">
                                <FoodPage
                                    onChange={(value) => {
                                        setFoodLog({
                                            ...foodLog,
                                            text: value,
                                        });
                                    }}
                                    value={foodLog.text}
                                />
                            </div>
                        );
                    case ScreenSteps.FoodIntake:
                        return (
                            <div className="container">
                                <FoodIntakePage
                                    value={foodLog.foodIntake}
                                    setFoodIntake={(foodIntake) => {
                                        setFoodLog({
                                            ...foodLog,
                                            foodIntake,
                                        });
                                    }}
                                />
                            </div>
                        );
                }
            })()}

            {/*{step === ScreenSteps.EstimateSatiety && (*/}
            {/*    <button onClick={onSendData}>Отправить</button>*/}
            {/*)}*/}

            <div className="controlWrapper">
                {(step !== ScreenSteps.Date && step !== ScreenSteps.Success)  && (
                    <button className="previousButton" onClick={previousStep}>
                        <BackArrow />
                    </button>
                )}

                {(step !== ScreenSteps.EstimateSatiety && step !== ScreenSteps.Success) && (
                    <button
                        className="primaryButton"
                        onClick={nextStep}
                    >
                        Далее
                    </button>
                )}
            </div>

            {/*{(step === ScreenSteps.EstimateSatiety || step === ScreenSteps.EstimateHungry) && (*/}
            {/*    <div className='estimateDescription'>*/}
            {/*        Расшифровка:*/}
            {/*        {moodDescription[step].map((item, index) => (*/}
            {/*            <div>{index + 1} - {item}</div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}

export default App;
