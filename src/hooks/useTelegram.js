import { useCallback } from 'react';

const tg = window.Telegram.WebApp;

export function useTelegram() {
    const onClose = useCallback(() => {
        tg.close();
    }, []);

    const onToggleMainButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onToggleMainButton,
        tg,
        onClose,
        mainButton: tg.MainButton,
        user: tg.initDataUnsafe.user,
    }
}