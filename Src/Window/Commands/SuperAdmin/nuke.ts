import { ActionRowBuilder, ApplicationCommandOptionType, BaseChannel, ButtonBuilder, ButtonStyle, Channel, Component, ComponentBuilder, EmbedBuilder, GuildBasedChannel, GuildChannel, GuildChannelEditOptions, GuildTextBasedChannel, GuildTextBasedChannelTypes, Message, Snowflake, SnowflakeUtil, TextBasedChannel, TextChannel } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";

export default <messageCommands>{
    data: {
        name: 'nuke',
        description: 'Nuke a channel in the server (Deletes all messages and clones the channel)',
        category: "SuperAdmin",
        cooldown: 5000,
        aliases: ["nuke"],
        permissions: ['SendMessages', 'EmbedLinks', 'ManageChannels'],
        userPerms: ['ManageGuild', 'Administrator'],


    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {
            let channel =
            message.mentions.channels.first() ||
            message.guild.channels.cache.get(args[0]) ||
            message.guild.channels.cache.find(
                (r) =>
                    r.name.toLowerCase() ==
                    args.slice(0).join(" ").toLowerCase()
            ) ||
            message.channel;
        if (!channel) {
            return message.reply({
                content: "Please Mention A Channel",
            });
        }
        if (!channel.isTextBased() || channel.isThread() || channel.isDMBased() ) {
            return message.reply({
                content: "Please Mention A Text Channel",
            });
        }
        if(channel.isDMBased()||channel.isThread()) return message.reply({content: "Please Mention A Text Channel"})
        const position = channel.rawPosition;

        const YesB = new ButtonBuilder()
        .setCustomId("Yes")
        .setLabel("Yes")
        .setStyle(ButtonStyle.Danger)

        const NoB = new ButtonBuilder()
        .setCustomId("No")
        .setLabel("No")
        .setStyle(ButtonStyle.Primary)

        const row = new ActionRowBuilder<ButtonBuilder>()
        .addComponents([YesB, NoB])

        await message.reply({
            embeds:[new EmbedBuilder()
            .setDescription("Are You Sure You Want To Nuke This Channel?")
            .setColor(client.MessageConfigs.ErrorColor)
            .setFooter({text: "This Action Is Irreversible"})],components:[
                
                   row
            
            ]}).then(async (msg)=>{
                const filter = (i: any) => i.user.id === message.author.id;
                const collector = msg.createMessageComponentCollector({
                    filter,
                    time: 15000,
                });
                collector.once("collect", async (i) => {
                    if (i.customId === "Yes") {
                        if(channel.isTextBased() && !channel.isDMBased() && !channel.isThread() ){
                            await channel.clone({position}).then(async (c) => {
                                await c.setPosition(position);
                                await channel.delete();
                                await c.send({
                                    embeds:[new EmbedBuilder()
                                    .setColor(client.MessageConfigs.EmbedColor)
                                    .setDescription(`Channel Has Been Nuked by : <@${message.author.id}>`)]
                                });
                            });
                        }
                       
                        await msg.edit({
                            embeds: [new EmbedBuilder()
                            .setDescription(`Channel Has Been Nuked by : <@${message.author.id}>`)
                            .setColor(client.MessageConfigs.EmbedColor)],
                            components: []
                        })
                    } else if (i.customId === "No") {
                        await msg.edit({
                            embeds: [new EmbedBuilder()
                            .setDescription(`Channel Nuke process terminated by : <@${message.author.id}>`)
                            .setColor(client.MessageConfigs.EmbedColor)],
                            components: []
                        })
                    }
                });
                collector.on("end", async (i) => {
                    if (i.size === 0) {
                        await msg.edit({
                            embeds: [new EmbedBuilder()
                            .setDescription(`Channel Nuke process terminated by : <@${message.author.id}> `)
                            .setColor(client.MessageConfigs.EmbedColor)],
                            components: []
                        })
                    }
                });
            })

        } catch (e) {
            Logger.log(e, "Error")
        }
    }
}