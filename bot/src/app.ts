import { ConfigService } from './config/config.service';
import { IConfigService } from './config/config.interface';
import { Scenes, Telegraf } from 'telegraf';
import mongoose, { ConnectOptions } from 'mongoose';
import LocalSession from 'telegraf-session-local';
import greeterScene from './controllers/start';
import formScene from './controllers/form';
import testScene  from "./controllers/test";
import foodScene from './controllers/food';
import { TypesScenes } from './consts';
import express from 'express';
import cors from 'cors';
import { formatDateFromTimestamp } from '../../src/utils/date';
import { hungry, satiety } from '../../src/utils/mood';

const app = express();

app.use(express.json());
app.use(cors());

class Bot {
    bot: Telegraf<Scenes.SceneContext>;

    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<Scenes.SceneContext>(this.configService.get('TOKEN'));
        this.bot.use(
            new LocalSession({ database: 'sessions.json' }).middleware()
        );
        this.bot.use(
            new Scenes.Stage<Scenes.SceneContext>([greeterScene, formScene, testScene, foodScene]).middleware()
        );
    }

    init() {
        this.bot.start((ctx) => {
            ctx.scene.enter(TypesScenes.Greeters);
        });

        this.bot.launch();
    }
}

const config = new ConfigService();

mongoose.connect('mongodb://localhost:27017', {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: 'foodHelper',
        user: 'root',
        pass: 'example',
    } as ConnectOptions,
).then((data) => {
    console.log('Бот подключен к БД!');
});

mongoose.connection.on('error', err => {
    console.log('Error occurred during an attempt to establish connection with the database: %O');
    console.log(err);
    process.exit(1);
});

mongoose.connection.on('open', () => {
    const bot = new Bot(config);
    bot.init();

    app.post('/bot/sendNotify', async (req, res) => {
        const { queryId, text, date, foodIntake, hungryScale, satietyScale } = req.body;

        try {
            await bot.bot.telegram.answerWebAppQuery(queryId, {
                type: 'article',
                id: queryId,
                title: 'Успешно записано!',
                input_message_content: {
                    message_text: `${date ? formatDateFromTimestamp(date) : 'Дата не указана'} \n\n` +
                        `${foodIntake ? foodIntake : 'Приём пищи'}: \n` +
                        `"${text}" \n\n` +
                        `Оценка голода: ${hungryScale ? hungry[hungryScale - 1] : '-'}\n` +
                        `Оценка насыщения: ${satietyScale ? satiety[satietyScale - 1] : '-'}`,
                }
            });

            return res.status(200).json({});
        } catch (e) {
            console.error('Write error', e);
        }
    });
});

const PORT = 3003;

app.listen(PORT, () => console.log('Server started on port', PORT));
