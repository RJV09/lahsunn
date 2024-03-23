import { ApplicationCommandOptionType, Channel, EmbedBuilder, GuildBasedChannel, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'ban',
        description: 'Ban an user from the server',
        cooldown: 5000,
        category: "SuperAdmin",
        aliases: ["ban"],
        permissions: ['SendMessages', 'EmbedLinks', 'BanMembers'],
        userPerms: ['ManageGuild', 'BanMembers'],
        
       
    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            
           //Ban Command
              const member = message.mentions.members.first();
                let reason ;
                

                if (!member) {
                    return message.channel.send({embeds: [new EmbedBuilder()
                        .setDescription(`Please specify|mention an user whom to ban from the server`).setColor(client.MessageConfigs.EmbedColor)]})
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
                if (!member.bannable) {
                    return message.channel.send({embeds: [new EmbedBuilder().setDescription(`I am unable to ban this user : ${member} `).setColor(client.MessageConfigs.EmbedColor)]})
                }
                await member.ban({reason: reason}).then(()=>{
                    message.channel.send({embeds: [new EmbedBuilder()
                        .setDescription(`Successfully banned ${member} from ${message.guild.name} server\nReason : ${reason}`)
                        .setColor(client.MessageConfigs.EmbedColor)]})
                })

           
        } catch (e) {
            Logger.log(e,"Error")
        }
    }
}