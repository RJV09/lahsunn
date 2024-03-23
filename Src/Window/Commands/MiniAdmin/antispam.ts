import { ApplicationCommandOptionType, Channel, EmbedBuilder, GuildBasedChannel, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'antispam',
        description: 'Enable/Disable AntiSpam Protection',
        category: "MiniAdmin",
        cooldown: 5000,
        aliases: ["spam"],
        permissions: ['SendMessages', 'EmbedLinks', 'ManageMessages'],
        userPerms: ['ManageGuild'],
        
       
    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            
            const getGuildData = await client.GData;
            console.log(await getGuildData.getData())
            const Activate = await getGuildData.getData("antiSpam");
            
            switch (Activate) {
                case true:
                    await getGuildData.Deactivate("antiSpam");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiSpam.ForClient.Decactivate).setColor(client.MessageConfigs.EmbedColor)]})
                    break;
                case false:
                    await getGuildData.Activate("antiSpam");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiSpam.ForClient.Activated).setColor(client.MessageConfigs.EmbedColor)]})
                    break;
                default:
                    break;
            }

           
        } catch (e) {
            Logger.log(e,"Error")
        }
    }
}