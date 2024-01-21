import { BaseScene } from 'telegraf/typings/scenes';
import { Scenes } from 'telegraf';
import { message } from 'telegraf/filters';
import User from '../../models/User';
import Doctor from '../../models/doctor-model';
import { TypesScenes } from '../../consts';

const enum FormSteps {
    Name = 'name',
    Email = 'email',
}

interface IProfile {
    name?: string,
    email?: string,
}

const formScene = new Scenes.BaseScene<Scenes.SceneContext>("formScene");

let currentFormStep: FormSteps;
let profile: IProfile = {};

formScene.enter((ctx) => {
    ctx.reply('Хотела бы с вами познакомиться поближе, напишите мне, пожалуйста, ваше имя');
    currentFormStep = FormSteps.Name;
});

formScene.on(message('text'), async (ctx) => {
    const text = ctx.message.text;

    switch (currentFormStep) {
        case FormSteps.Name:
            profile.name = text;
            ctx.reply('И email, чтобы я смогла отправлять туда вам отчет дневника питания');
            currentFormStep = FormSteps.Email;

            break;
        case FormSteps.Email:
            profile.email = text;
            const doctor = await Doctor.find({});
            console.log('doctor', doctor);
            // @ts-ignore
            await User.findOneAndUpdate({ _id: ctx?.from?.id }, {...profile, doctor: doctor[0]?._id || null }, {
                new: true
            })

            profile = {};
            ctx.scene.leave();
            ctx.scene.enter(TypesScenes.Test);

            break;
    }
});

export default formScene;