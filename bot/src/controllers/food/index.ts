import { Markup, Scenes } from 'telegraf';
import { message } from 'telegraf/filters';

const foodScene = new Scenes.BaseScene<Scenes.SceneContext>("foodScene");

const foodInTake = [
    { text: 'Завтрак', type: 'breakfast'},
    { text: 'Второй завтрак', type: 'second_breakfast'},
    { text: 'Обед', type: 'launch'},
    { text: 'Полдник', type: 'snack'},
    { text: 'Ужин', type: 'dinner'},
]

foodScene.enter(async (ctx) => {
    await ctx.reply('Можно пользоваться дневником питания! Нужно всего лишь нажать на синюю кнопочку "Записать"', Markup.inlineKeyboard([
        Markup.button.callback('Отлично!', 'setmenu'),
    ]));
});

// foodScene.on(message('photo'), async (ctx) => {
//     const imageId = ctx.message.photo.pop()?.file_id || '';
//
//     const link = await ctx.telegram.getFileLink(imageId);
//     console.log('logo', link);
// });
//
// foodScene.on(message('text'), async (ctx) => {
//     console.log('logo', ctx.message);
// });

foodScene.action("setmenu", ctx =>
    // sets Web App as the menu button for current chat
    ctx.setChatMenuButton({
        text: "Записать!",
        type: "web_app",
        web_app: { url: 'https://efimenko.tech/' },
    }),
);

export default foodScene;