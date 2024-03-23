import { ApplicationCommandOptionType, Channel, EmbedBuilder, GuildBasedChannel, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'anticaps',
        description: 'Enable/Disable AntiCaps Protection',
        category: "MiniAdmin",
        cooldown: 5000,
        aliases: ["caps"],
        permissions: ['SendMessages', 'EmbedLinks', 'ManageMessages'],
        userPerms: ['ManageGuild'],
        
       
    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            
            const getGuildData = await client.GData;
            console.log(await getGuildData.getData())
            const Activate = await getGuildData.getData("antiCaps");
            
            switch (Activate) {
                case true:
                    await getGuildData.Deactivate("antiCaps");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiCaps.ForClient.AntiCapsDeactivated)]})
                    break;
                case false:
                    await getGuildData.Activate("antiCaps");
                    await message.channel.send({embeds: [new EmbedBuilder().setDescription(client.Messages.AntiCaps.ForClient.AntiCapsActivated)]})
                    break;
                default:
                    break;
            }

           
        } catch (e) {
            Logger.log(e,"Error")
        }
    }
}