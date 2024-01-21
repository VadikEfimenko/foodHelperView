import { BaseScene } from 'telegraf/typings/scenes';
import { Markup, Scenes } from 'telegraf';
import { TypesScenes } from '../../consts';

const testScene = new Scenes.BaseScene<Scenes.SceneContext>("testScene");

let currentQuestionIndex = 0;

const scenario = [
    { text: '1. Режим приема пищи', buttons: ['1 раз/день', '2 раза/день', '3 раза/день', '3-6 раза/день', 'хаотичное'] },
    { text: '2. Размер порции', buttons: ['не слежу', 'взвешиваю и считаю ккал', 'ориентируюсь на голод/насыщение', 'ориентируюсь на размер тарелки'] },
    { text: '3. Физическая активность', buttons: ['повседневная (ходьба)', 'специальная( занятия в зале, танцы и др)', 'нет']},
    { text: '4. Сон', buttons: ['менее 6 часов', '6-7 часов', '7-8 часов', 'более 8 часов']},
    { text: '5. Работа / отдых', buttons: ['баланс', 'много работаю/не умею отдыхать и расслабляюсь с трудом', 'много работаю/ хорошо отдыхаю']},
]

async function getQuestion(ctx: any, index: number) {
    const currentQuestion = scenario[index];

    await ctx.reply(
        currentQuestion.text,
        Markup.inlineKeyboard(currentQuestion.buttons.map((item) => (
            [Markup.button.callback(item, `handler_${index + 1}`)]
        )))
    );
}

testScene.enter(async (ctx) => {
    getQuestion(ctx, currentQuestionIndex);
});

testScene.action(/handler_(.+)/, async (ctx) => {
    console.log('currentQuestionIndex', currentQuestionIndex)
    currentQuestionIndex++;

    if (currentQuestionIndex === scenario.length) {
        await ctx.reply('Спасибо за заполнение анкеты!');

        currentQuestionIndex = 0;
        ctx.scene.leave();
        ctx.scene.enter(TypesScenes.Food);
    } else {
        await getQuestion(ctx, currentQuestionIndex);
    }
});

export default testScene;