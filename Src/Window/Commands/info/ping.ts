import { EmbedBuilder, Message } from 'discord.js';
import Extend_C from '../../../Structures/Client.js';
import { messageCommands } from '../../../Resources/types/Interfaces/Interfaces.js';
import Logger from '../../../Resources/Console/Logger.js';

export default <messageCommands>{
    data: {
        name: 'ping',
        cooldown: 5000,
        category: 'Info',
        description: 'Get Bot Ping',
        permissions: ['SendMessages'],

    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {


        try {
            const x = new EmbedBuilder()
                .setColor(client.MessageConfigs.EmbedColor)
                .setDescription('Pinging...');
            const pingMessage = await message.reply({
                embeds: [x]
            });
            const Embed = new EmbedBuilder()
                .setColor(client.MessageConfigs.EmbedColor)
                .setAuthor({ name: `| Server Packet`, iconURL: client.user.avatarURL() })
                .setDescription(
                    `\`\`\`ts\nApi Latency : ${Math.round(client.ws.ping)}ms\nBot Latency : ${pingMessage.createdTimestamp - message.createdTimestamp}ms\`\`\` `
                )
            pingMessage.edit(
                {
                    embeds: [Embed]
                });
        } catch (e) {
            Logger.log(e, "Error")
        }

    }

}