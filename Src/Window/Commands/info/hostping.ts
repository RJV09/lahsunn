import { EmbedBuilder, Message } from 'discord.js';
import Extend_C from '../../../Structures/Client.js';
import { messageCommands } from '../../../Resources/types/Interfaces/Interfaces.js';
import Logger from '../../../Resources/Console/Logger.js';

export default <messageCommands>{
    data: {
        name: 'hostping',
        cooldown: 5000,
        category: 'Info',
        description: 'Get Bot\'s Host Ping',
        permissions: ['SendMessages', 'EmbedLinks'],

    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
        try {

            const timestamp = new Date().getTime();
            const msg = await message.reply('Pinging...');
            const userPing = new Date().getTime() - timestamp;
            const embed = new EmbedBuilder()
                .setColor(client.MessageConfigs.EmbedColor)
                .setAuthor({ name: `| Host Packet`, iconURL: client.user.avatarURL() })
                .setDescription(
                    `\`\`\`ts\nHost Latency : ${userPing}ms\`\`\` `
                )
            msg.edit({ embeds: [embed] });

        } catch (e) {
            Logger.log(e, "Error")
        }
    }
}