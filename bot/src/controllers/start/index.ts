import { Markup, Scenes } from "telegraf";
import { FIRST_MESSAGE, SECOND_MESSAGE, THIRD_MESSAGE } from "./messages";
import { BaseScene } from 'telegraf/typings/scenes';
import User from '../../models/User';
import { TypesScenes } from '../../consts';

const greeterScene = new Scenes.BaseScene<Scenes.SceneContext>("greetersScene");

greeterScene.enter(async (ctx) => {
    const uid = String(ctx?.from?.id);
    const user = await User.findById(uid);

    if (user) {
        await ctx.reply('С возвращением!');
        await ctx.scene.leave();
        await ctx.scene.enter(TypesScenes.Food);
    } else {
        const now = new Date().getTime();
        const newUser = new User({
            _id: uid,
            created: now,
        });

        await newUser.save();
        await ctx.reply(FIRST_MESSAGE, Markup.inlineKeyboard([
            Markup.button.callback('Звучит очень интересно! А что мы будем делать?', 'start_second_message'),
        ]));
    }
})

greeterScene.action('start_second_message', async (ctx) => {
    await ctx.reply(SECOND_MESSAGE, Markup.inlineKeyboard([
        Markup.button.callback('Готов(а)', 'start_third_message'),
    ]));
});

greeterScene.action('start_third_message', async (ctx) => {
    await ctx.reply(THIRD_MESSAGE, Markup.inlineKeyboard([
        Markup.button.callback('Заполнить анкету', 'go_to_form'),
    ]));
});

greeterScene.action('go_to_form', async (ctx) => {
    await ctx.scene.leave();
    await ctx.scene.enter(TypesScenes.Form);
});

export default greeterScene;