import { ApplicationCommandOptionType, Channel, EmbedBuilder, GuildBasedChannel, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'antiping',
        description: 'Enable/Disable AntiPing',
        category: "MiniAdmin",
        cooldown: 5000,
        aliases: ["antiping"],
        permissions: ['SendMessages', 'EmbedLinks', 'ManageMessages'],
        userPerms: ['ManageGuild'],
        
       
    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            
            const getGuildData = await client.GData;
            console.log(await getGuildData.getData())
            const Activate = await getGuildData.getData("antiPing");
            
            switch (Activate) {
                case true:
                    await getGuildData.Deactivate("antiPing");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiPing.ForClient.Decactivate).setColor(client.MessageConfigs.EmbedColor)]})
                    break;
                case false:
                    await getGuildData.Activate("antiPing");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiPing.ForClient.Activated).setColor(client.MessageConfigs.EmbedColor)]})
                    break;
                default:
                    break;
            }

           
        } catch (e) {
            Logger.log(e,"Error")
        }
    }
}