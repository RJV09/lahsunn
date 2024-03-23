import { Guild, Options, Awaitable, EmbedBuilder } from 'discord.js';
import { readdirSync } from 'fs';
import Types from '../../Resources/index.js'
import { getInfo } from "discord-hybrid-sharding";
import moment from 'moment';
import ConfigOptions from './Options.js';
import Extend_C from '../../Structures/Client.js';
import Logger from '../../Resources/Console/Logger.js';
import Install from '../Installers/Install.js';
const Grufy_Client = new Extend_C({
  shards: getInfo().SHARD_LIST,
  shardCount: getInfo().TOTAL_SHARDS,
  intents: ConfigOptions.intents,
  makeCache: Options.cacheWithLimits({
    ...Options.DefaultMakeCacheSettings,
  }),
  allowedMentions: {
    repliedUser: false,
    parse: ["everyone", "users", "roles"]
  }
})



Grufy_Client.rest.on('restDebug', (info)=> {
  //Logger.log(`: RestDebug :: ${info}`, "[RestDebug]")
})

Grufy_Client.rest.on('rateLimited', (rateLimitData) => {
  Logger.log(`: RateLimit :: ${rateLimitData}`, "[RateLimit]")
})


// Grufy_Client.on('shardReady', (shardId: number, unavailableGuilds: Set<string>) => {
//   const ShardLogs: any = Grufy_Client.channels.cache.get(Grufy_Client.config.shardLogs)
//   Logger.log(`: Ready #${shardId}`, "[Shard]")
//   if (Grufy_Client.config.logs === true) { ShardLogs.send(`\`\`\`ts\n 🟢 Shards #${shardId} Ready\`\`\``) }
// })
// Grufy_Client.on('shardReconnecting', (shardId: number) => {
//   const shardAlerts: any = Grufy_Client.channels.cache.get(Grufy_Client.config.shardAlerts)
//   Logger.log(`: Reconnecting #${shardId}`, "[Shard]")
//   if (Grufy_Client.config.logs === true) { shardAlerts.send(`\`\`\`ts\n🟠 ShardReconnecting #${shardId}\`\`\``) }
// })
// Grufy_Client.on('shardError', (error: Error, shardId: number): Awaitable<void> => {
//   const shardAlerts: any = Grufy_Client.channels.cache.get(Grufy_Client.config.shardAlerts)
//   Logger.log(`: Error #${shardId} \n : Reason :: ${error}`, "[ShardError]")
//   if (Grufy_Client.config.logs === true) { shardAlerts.send(`\`\`\`ts\n🔴 ShardError #${shardId}\`\`\``) }
// })
// Grufy_Client.on('shardResume', (shardId: number, replayedEvents: number) => {
//   const shardAlerts: any = Grufy_Client.channels.cache.get(Grufy_Client.config.shardAlerts)
//   Logger.log(`: Resumed #${shardId} :: ReplayedEvents : ${replayedEvents}`, "[Shard]")
//   if (Grufy_Client.config.logs === true) { shardAlerts.send(`\`\`\`ts\n🟢 ShardResumed #${shardId}\`\`\``) }
// })
// Grufy_Client.on('guildCreate', async (guild: Guild) => {
//   const channel: any = Grufy_Client.channels.cache.get(Grufy_Client.config.guildLogs)
//   let own = await guild.fetchOwner()
//   const GuildCreatedEmbed = new EmbedBuilder()
//     .setTitle('🟢 Guild Connected 🟢')
//     .addFields({ name: `Guild`, value: `\`\`\`ts\n${guild.name} || ${guild.id}\`\`\`` }, { name: `Data`, value: `\`\`\`ts\nMembersCount : ${guild.memberCount} | ${moment.utc(guild.createdAt).format('DD/MMM/YYYY')}\`\`\`` },
//       { name: `Owner`, value: `\`\`\`ts\n ${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"} | ${guild.ownerId}\`\`\`` }, { name: 'server Count ', value: `\`\`\`ts\n${Grufy_Client.guilds.cache.size} Servers\`\`\`` })
//     .setColor(Messages.Mconfigs.Ucolor)
    
//     .setThumbnail(guild.iconURL({ size: 1024 }))
//   channel.send({ embeds: [GuildCreatedEmbed] })
// })
// Grufy_Client.on('guildDelete', (guild: Guild) => {
//   const channel: any = Grufy_Client.channels.cache.get(Grufy_Client.config.guildLogs)
//   const DeletedGuild = new EmbedBuilder()
//     .setTitle('🔴Guild Disconnected 🔴')
//     .addFields({ name: `Guild Data`, value: `\`\`\`ts\n ${guild.name}\`\`\`` }, { name: 'MembersCount', value: `\`\`\`ts\n ${guild.memberCount}\`\`\`` }, { name: 'Servers in✨', value: `\`\`\`ts\n ${Grufy_Client.guilds.cache.size} Servers\`\`\`` })
//     .setThumbnail(guild.iconURL({ size: 1024 }))
    
//     .setColor(Messages.Mconfigs.Ecolor)
//   channel.send({ embeds: [DeletedGuild] })
// })
//LoadMessageEvents(Grufy_Client);

Install.install(Grufy_Client);


export { Grufy_Client }
Grufy_Client.loginBot(process.env.Token)