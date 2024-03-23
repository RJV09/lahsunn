import { ApplicationCommandOptionType, BaseChannel, Channel, EmbedBuilder, GuildBasedChannel, GuildChannel, GuildChannelEditOptions, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextBasedChannel, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'lock',
        description: 'Lock a channels chat from being used',
        category: "MiniAdmin",
        cooldown: 5000,
        aliases: ["lock"],
        permissions: ['SendMessages', 'EmbedLinks', 'ManageChannels'],
        userPerms: ['ManageGuild', 'ManageChannels'],


    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            if (args[0] === "all") {
                const channels = await message.guild.channels.cache.filter((p)=>p.permissionsFor(message.guild.id).has("SendMessages")).map(channel => channel);
                for (let channel of channels) {
                    if (!channel.isThread())
                        await channel?.permissionOverwrites.edit(message.guildId, {
                            SendMessages: false,
                        });
                }
                return message.reply({
                    content: "All Channels Have Been Locked",
                });

            } else {
                const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find((x) =>x.name.toLowerCase() == args.slice(0).join(" ").toLowerCase()) || message.channel;
                if (!channel) {
                    return message.reply({
                        content: "Please Mention A Channel",
                    });
                }
                if (channel.isTextBased() && !channel.isDMBased() && !channel.isThread()) {
                    await channel.permissionOverwrites.edit(message.guildId, {
                        SendMessages: false,
                    });
                }
                return message.reply({
                    content: `${channel} Has Been Locked`,
                });
            }


        } catch (e) {
            Logger.log(e, "Error")
        }
    }
}