
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Message, PermissionFlagsBits } from "discord.js";
import Event from "../../Resources/types/Interfaces/Events.js";
import util from "util";
import Extend_C from "../../Structures/Client.js";
import Logger from "../../Resources/Console/Logger.js";


export default class MessageCreate extends Event {
  constructor(client: Extend_C, file: string) {
    super(client, file, {
      name: 'messageCreate',
    });
  }

  private messageHistory: Map<string, number> = new Map();
  public async run(message: Message, client: Extend_C): Promise<any> {
    let unhandledRejectionAdded = false;
    // console.log({message})
    if (!unhandledRejectionAdded) {
      process.on('unhandledRejection', (reason, p) => {
        const message = `Unhandled Rejection: ${reason}`;
        const stackTrace = `Promise Stack Trace: ${util.inspect(p)}`;
        return;//Logger.log(`${message}\n${stackTrace}`, "Error");

      });
      unhandledRejectionAdded = true;
    }
    process.on('uncaughtException', (err, origin) => {
      const message = `Uncaught Exception: ${err}`;
      const stackTrace = `Exception Stack Trace: ${util.inspect(origin)}`;
      return; //Logger.log(`${message}\n${stackTrace}`, "Error");
    });

    process.on('uncaughtExceptionMonitor', (err, origin) => {
      const message = `Uncaught Exception Monitor: ${err}`;
      const stackTrace = `Exception Monitor Stack Trace: ${util.inspect(origin)}`;
      return;// Logger.log(`${message}\n${stackTrace}`, "Error");
    });


    if (message.author.bot) return;

    //Const / declarations 
    const mention: any = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
    let prefix = this.client.config.prefix.Dprefix;

    const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const mentionPrefix = `<@!?${this.client.user.id}>`;
    const prefixRegex = new RegExp(`^(${mentionPrefix}|${escapeRegex(prefix)})\\s*`);
    let args;
    if (!this.client.config.prefix.OnlyPrefix) {
      if (message.content.startsWith(mentionPrefix)) {
        args = [message.content.slice(mentionPrefix.length).trim()];
      } else if (prefixRegex.test(message.content)) {
        const [matchedPrefix] = message.content.match(prefixRegex);
        args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
      } else {
        args = message.content.trim().split(/\s+/);
      }
    } else {
      const prefixRegex = new RegExp(`^(${mentionPrefix}|${escapeRegex(prefix)})\\s*`);
      if (!prefixRegex.test(message.content)) return;

      const [matchedPrefix] = message.content.match(prefixRegex);
      args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);
    }


    //  console.log(prefixRegex)
    // console.log([matchedPrefix] + '----' + matchedPrefix)
    //console.log(args)
    const command_: string = args.shift().toLowerCase();
    const command = this.client.messageCommands.get(command_);
    const permissions = command?.data?.permissions
    const memberid = message.member?.user.id;
    const botid: any = message.guild?.members.me?.id;
    const voiceState = message.guild?.voiceStates.cache.get(memberid);
    const guildId: any = message.guild?.id;

    const bvoiceState = message.guild?.voiceStates.cache.get(botid);
    const memberVoiceChannel = voiceState?.channel;
    const botVoiceChannel = bvoiceState?.channel;






    if (command?.data?.permissions) {
      if (!message.guild.members.me.permissions.has(permissions))
        return await message.reply({
          content: "I don't have enough permissions to execute this command.",
        }).catch(e => Logger.log(e, "Error"))
    }



    if (message.content.match(mention)) {
      const mentionEmbed = new EmbedBuilder()

        .setAuthor({ name: this.client.user.username, iconURL: this.client.user.displayAvatarURL() })
        .setThumbnail(this.client.user.displayAvatarURL())
        // .addFields({value: `**Guild Settings**\nVoice Region: \`None\`\nPremium Status: \`Normal\`\nLanguage: \`en\`\nPrefix: \`${prefix}\``})
        .setDescription(`**Guild Settings**\n• Prefix For This Server Is \`${prefix}\`\n• Language: \`en\`\n\nYou can start by typing \`${prefix}help\``)
        .setColor(this.client.MessageConfigs.EmbedColor)

      await message.reply({
        embeds: [mentionEmbed],
        // components: [allButton]
      }).catch(e => console.log(e))

    }

    let dm = message?.author?.dmChannel;
    if (typeof dm === 'undefined') dm = await message?.author?.createDM();
    if (
      !message.inGuild() ||
      !message.channel.permissionsFor(message.guild.members.me).has(PermissionFlagsBits.ViewChannel)
    )
      return;



    const PermissionEmbed = new EmbedBuilder()
      .setDescription(this.client.ErrorMessages.Permission_SendMessage)
      .addFields({
        name: 'Guild', value: message.guild.name
      }, { name: 'channel:', value: `<#${message.channelId}>` })


    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.SendMessages))

      return await message.author
        .send({
          embeds: [PermissionEmbed]
        })
        .catch(() => { });

    if (!message.guild.members.me.permissions.has(PermissionFlagsBits.EmbedLinks))
      return await message.reply({
        content: "I am missing \`\`\`EmbedLinks\`\`\` permission",
      }).catch(e => Logger.log(e, "Error"))




    const currentTime = Date.now();
    if (command?.data?.cooldown) {
      const lastExecutionTime = this.client.commandCooldowns.get(command_)?.get(message.author.id) || 0;
      const cooldownTimeout = command?.data?.cooldown;


      const timeSinceLastExecution = currentTime - lastExecutionTime;

      if (timeSinceLastExecution < cooldownTimeout) {
        const remainingTime = cooldownTimeout - timeSinceLastExecution;
        const CooldownEmbed = new EmbedBuilder()
          .setDescription(`This Command Is On Cooldown For \`${Math.ceil(remainingTime / 1000)}s\``)
          .setColor(this.client.MessageConfigs.ErrorColor)
        return message.reply({
          embeds: [CooldownEmbed]
        }).then((l) => {
          this.client.utils.wait(3000).then(() => { l.delete().catch(e => { }) })
        })
      }
    }
    if (command?.data.dev) {
      //console.log('Dev command')
      const guildd: string | number | any = await this.client.guilds.fetch(this.client.config.devRole.guildId).catch((e: any) => { });
      const sus: any = await guildd.members.fetch(message.author.id).catch((e: any) => { });
      const x = sus?.roles?.cache.has(this.client.config.devRole.roleId).catch((e: any) => { });
      if (!this.client.config.devs.includes(message.author.id) && !x) {
        return message.reply({
          //   embeds: [DevOnly]
        }).catch(e => Logger.log(e, "Error"))
      }
    }

    if(command?.data?.userPerms){
      const userPerms = command?.data?.userPerms;
      if(!message.member.permissions.has(userPerms)){
        const UserPermsEmbed = new EmbedBuilder()
        .setDescription(`You need \`${userPerms.join(" | ")}\` to use this command`)
        .setColor(this.client.MessageConfigs.ErrorColor)
        return message.reply({
          embeds: [UserPermsEmbed]
        }).then((l) => {
          this.client.utils.wait(3000).then(() => { l.delete().catch(e => { }) })
        })
      }
    }

    //**Message Systems */

    const Data = await this.client.GData;
    const ActivatedData = Object.values(this.client.GData.data).some(value => value);
    if (ActivatedData) {

      if (Data.data.antiCaps) {
        const capsRegex = /[A-Z]/g;
        const capsRegexPercentage = message.content.match(capsRegex)?.length / message.content.length;
        if (capsRegexPercentage > 0.7) {
          const x = message;
          const CapsEmbed = new EmbedBuilder()
            .setDescription(this.client.Messages.AntiCaps.ForUser.AntiCapsActivated)
            .setColor(this.client.MessageConfigs.ErrorColor)
          await message.reply({
            embeds: [CapsEmbed]
          }).then((l) => {
            this.client.utils.wait(3000).then(() => { l.delete().catch(e => { }) })
          }).then(() => {
            this.client.utils.wait(1000).then(() => { x.delete().catch(e => { }) })
          })
        }
      }
      if (Data.data.antiLink) {
        const linkRegex = /(https?:\/\/[^\s]+)/g;
        const linkRegexPercentage = message.content.match(linkRegex)?.length / message.content.length;
        if (linkRegexPercentage > 0.7) {
          const x = message;
          const LinkEmbed = new EmbedBuilder()
            .setDescription(this.client.Messages.AntiLink.ForUser.AntiLinkActivated)
            .setColor(this.client.MessageConfigs.ErrorColor)
          await message.reply({
            embeds: [LinkEmbed]
          }).then((l) => {
            this.client.utils.wait(3000).then(() => { l.delete().catch(e => { }) })
          }).then(() => {
            this.client.utils.wait(1000).then(() => { x.delete().catch(e => { }) })
          })
        }
      }

      if (Data.data.antiSpam) {
        if (message.author.bot) return;
        const DN = Date.now();
        const channelId = message.channel.id;
        const lastMessageTime = this.messageHistory.get(channelId) || 0;
        if (DN - lastMessageTime < 3000) {
          const x = message;
          const SpamEmbed = new EmbedBuilder()
            .setDescription(this.client.Messages.AntiSpam.ForUser.Activated)
            .setColor(this.client.MessageConfigs.ErrorColor)
          await message.reply({
            embeds: [SpamEmbed]
          }).then((l) => {
            this.client.utils.wait(3000).then(() => { l.delete().catch(e => { }) })
          }).then(() => {
            this.client.utils.wait(1000).then(() => { x.delete().catch(e => { }) })
          })
        }
        this.messageHistory.set(channelId, DN);
      }

      if (Data.data.antiPing) {
        if (message.mentions.everyone || message.mentions.everyone) {
          const x = message;
          x.delete().catch(e => { }).then(async () => {
            const PingEmbed = new EmbedBuilder()
              .setDescription(this.client.Messages.AntiPing.ForUser.Activated)
              .setColor(this.client.MessageConfigs.ErrorColor)
            await message.channel.send({
              embeds: [PingEmbed]
            }).then((l) => {
              this.client.utils.wait(3000).then(() => { l.delete().catch(e => { }) })
            })
          })

        }

      }
    }




    if (!command) return;
    try {
      if (!message.guild.members.me.permissions.has('SendMessages')) {
        return console.log('no permission');
      } else {
        if (!this.client.commandCooldowns.has(command_)) {
          this.client.commandCooldowns.set(command_, new Map());
        }
        this.client.commandCooldowns.get(command_)?.set(message.author.id, currentTime);
        command.execute(this.client, message, args)
      }
    } catch (error) {
      console.log(error);
    }


  }
}