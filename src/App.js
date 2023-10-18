import './App.css';
import { useCallback, useEffect } from 'react';

const tg = window.Telegram.WebApp;

function App() {
    useEffect(() => {
        console.log('kek');
        tg.ready();
    });

    const onClose = useCallback(() => {
        tg.close();
    }, []);

    return (
        <div className="App">
           привет!
            <button onClose={onClose}>Закрыть</button>
        </div>
    );
}

export default App;
