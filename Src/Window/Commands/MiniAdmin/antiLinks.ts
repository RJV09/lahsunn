import { ApplicationCommandOptionType, Channel, EmbedBuilder, GuildBasedChannel, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'antilinks',
        description: 'Enable/Disable AntiLinks Protection',
        category: "MiniAdmin",
        cooldown: 5000,
        aliases: ["links"],
        permissions: ['SendMessages', 'EmbedLinks', 'ManageMessages'],
        userPerms: ['ManageGuild'],
        
       
    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            
            const getGuildData = await client.GData;
            console.log(await getGuildData.getData())
            const Activate = await getGuildData.getData("antiLink");
            
            switch (Activate) {
                case true:
                    await getGuildData.Deactivate("antiLink");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiLink.ForClient.AntiLinkDeactivated).setColor(client.MessageConfigs.EmbedColor)]})
                    break;
                case false:
                    await getGuildData.Activate("antiLink");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiLink.ForClient.AntiLinkActivated).setColor(client.MessageConfigs.EmbedColor)]})
                    break;
                default:
                    break;
            }

           
        } catch (e) {
            Logger.log(e,"Error")
        }
    }
}