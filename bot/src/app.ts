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

mongoose.connect('mongodb://127.0.0.1:27017/foodHelper', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
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
});
