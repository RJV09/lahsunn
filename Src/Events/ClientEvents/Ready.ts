import Grufy from '../../Structures/Client.js';
import config from '../../config.js';
import Event from '../../Resources/types/Interfaces/Events.js';
import { ActivityType, Guild, REST, Routes, TextChannel, VoiceChannel } from 'discord.js';
import Logger from '../../Resources/Console/Logger.js';


import Extend_C from '../../Structures/Client.js';
export default class Ready extends Event {
  constructor(client: Extend_C, file: string) {
    super(client, file, {
      name: 'ready',
    });
    
  }


  public async run(): Promise<void> {
    // const ReadyLogs: any = this.client.channels.cache.get(this.client.config.ClientReadyLogs);
    let count = 0;
    this.client.guilds.cache.forEach((guild) => { count += guild.memberCount })
    let statuses = `${this.client.config.prefix.Dprefix}help | @${this.client.user?.tag} With ${count} Users`;
    this.client.user?.setPresence({
      activities: [
        {
          name: statuses,
          type: ActivityType.Listening,
        },
      ],
      status: statuses as any,
    });
    const ReadyLog = this.client.config.mode.maintenance === true
      ? `: Client :: ${this.client.user?.tag} in 🔧 Maintenance`
      : `: Client :: ${this.client.user?.tag} :: Servers ${this.client.guilds.cache.size} :: Users : ${count}`;
      // const rest = await new REST({version: '10'}).setToken(this.client.config.token ?? '');
      // try{
      //  // await rest.put(Routes.applicationCommands(this.client.config.clientId), {body: this.client.slashData as any});
      //   //console.log(this.client.commands.map(v => v.data));
       
      //   Logger.log(`Successfully reloaded application (/)[${this.client.slashData.length}] commands.`,'[/]');
      // } catch (e) {
      //   Logger.log(e, "Error")
      // }
    
    



   
   // this.client.application?.commands.set(this.client.commands.map(v => v.data))
    // if (this.client.config.logs === true) {
    //   ReadyLogs.send(`\`\`\`ts\n ${ReadyLog} Cores Activated 🟢\`\`\``)
    // }
    Logger.log(`${ReadyLog}`, "Ready")
    
  }
}