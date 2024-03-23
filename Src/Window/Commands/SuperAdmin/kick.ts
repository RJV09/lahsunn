import { ApplicationCommandOptionType, Channel, EmbedBuilder, GuildBasedChannel, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'kick',
        description: 'Kick a user from the server',
        category: "SuperAdmin",
        cooldown: 5000,
        aliases: ["kick"],
        permissions: ['SendMessages', 'EmbedLinks', 'KickMembers'],
        userPerms: ['ManageGuild', 'KickMembers'],
        
       
    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            
              const member = message.mentions.members.first();
                let reason:string|any ;
                

                if (!member) {
                    return message.channel.send({embeds: [new EmbedBuilder()
                        .setDescription(`Please specify|mention an user whom to kick from the server`).setColor(client.MessageConfigs.EmbedColor)]})
                }
                if (!reason) {
                   reason = "No reason provided"
                } else {
                    reason = args.slice(1).join(" ")
                }
               
                if (member.id === message.author.id) {
                    return message.channel.send({embeds: [new EmbedBuilder().setDescription(`You cannot ban Yourself from the server`).setColor(client.MessageConfigs.EmbedColor)]})
                }
                if (member.id === client.user.id) {
                    return message.channel.send({embeds: [new EmbedBuilder().setDescription(`I cannot ban myself from the server`).setColor(client.MessageConfigs.EmbedColor)]})
                }
                if (!member.kickable) {
                    return message.channel.send({embeds: [new EmbedBuilder().setDescription(`I am unable to ban this user : ${member} `).setColor(client.MessageConfigs.EmbedColor)]})
                }
                await member.kick(reason).then(()=>{
                    message.channel.send({embeds: [new EmbedBuilder()
                        .setDescription(`Successfully kicked ${member} from ${message.guild.name} server\nReason : ${reason}`)
                        .setColor(client.MessageConfigs.EmbedColor)]})
                }).then(async ()=>{
                    try{
                         await member.send({embeds: [new EmbedBuilder()
                        .setDescription(`You have been kicked from ${message.guild.name} server\nReason : ${reason}`)
                        .setColor(client.MessageConfigs.EmbedColor)]})
                    } catch (e) {
                        await message.channel.send({embeds: [new EmbedBuilder()
                        .setDescription(`Unable to send DM to ${member} `)
                        .setColor(client.MessageConfigs.EmbedColor)]})
                        .then((x)=>{client.utils.wait(1000).then(()=>{x.delete().catch(()=>{})})})

                    }
                   

                })

           
        } catch (e) {
            Logger.log(e,"Error")
        }
    }
}