import { EmbedBuilder, Message } from 'discord.js';
import Extend_C from '../../../Structures/Client.js';
import { messageCommands } from '../../../Resources/types/Interfaces/Interfaces.js';
import Logger from '../../../Resources/Console/Logger.js';

export default <messageCommands>{
    data: {
        name: 'uptime',
        cooldown: 5000,
        category: 'Info',
        description: 'Get Bots\'s Uptime',
        permissions: ['SendMessages', 'EmbedLinks'],

    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
    try {


      const uptime = client.utils.uptimeFormat(client.uptime);
      const UptimeEmbed = new EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.avatarURL() })
        .setTitle(`I have been online for`)
        .setDescription(`\`\`\`ts\n${uptime}\`\`\``)
        .setColor(client.MessageConfigs.EmbedColor)
        

      message.reply({
        embeds: [UptimeEmbed]
      });
    } catch (e) {
      
    }
  },
};