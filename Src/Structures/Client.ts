import {  Client, ClientOptions, Collection, GuildMember, LimitedCollection, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";
import {  messageCommands } from "../Resources/types/Interfaces/Interfaces.js";
import Logger from "../Resources/Console/Logger.js";
import fs from 'fs'
import config from '../config.js'
import path from "path";
import { fileURLToPath } from "url";
import *  as M from "../Resources/Messages/Message.js";
import { Utils } from "../Resources/Utils/index.js";
import GuildData from "../Local-Database/guild/GuildData.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export default class Extend_C extends Client {
  public slashData: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
  public messageCommands: Collection<string, messageCommands> = new Collection();
  public commandCooldowns: Map<string, Map<string, number>> = new Map();
  public logger: Logger = new Logger();
  public Messages = M.default.Message;
  public ErrorMessages = M.default.ErrorMessages;
  public MessageConfigs = M.default.Configs;
  public utils = Utils;
  public  GData: GuildData = new GuildData();

  //public emitter: Map<string, Emitter> = new Map();
  public config = config;
  public constructor(options: ClientOptions) {
    super(options)
    options.makeCache = (manager) => {
      switch(manager.name){
        case "GuildEmojiManager":
        case "GuildInviteManager":
        case "GuildStickerManager":
        case "StageInstanceManager":
        case "ThreadManager":
          return new LimitedCollection({ maxSize: 0 });
        case "MessageManager":
          return new LimitedCollection({ maxSize: 1 });
        case "UserManager":
          return new LimitedCollection({ maxSize: 0 });
        case "GuildMemberManager":
          return new LimitedCollection({
            maxSize: 150,
            keepOverLimit :(member:GuildMember)=> member.id === this.user?.id,
              });
        default:
          return new Collection();
      }
    }
    // this.shoukaku = new ShoukakuClient(this);
  }
  async loginBot(token: string | any) {
    super.login(token);
    this.LoadGrufyEvents();
  }
  private LoadGrufyEvents(): void {
    const Events_ = fs.readdirSync(path.join(__dirname, "../Events/ClientEvents"));
    const jsFiles = Events_.filter(file => file.endsWith('.js'));
    jsFiles.forEach(async (file) => {
        const event = (await import(`../Events/ClientEvents/${file}`)).default;
        const evt = new event(this, file);
        this.on(evt.name, (...args) => evt.run(...args));
    });
    Logger.log(`Loaded Events :: ${jsFiles.length}`, "Ready");
}
  }
