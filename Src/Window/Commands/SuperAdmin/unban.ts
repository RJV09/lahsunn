import {
    ApplicationCommandOptionType,
    Channel,
    EmbedBuilder,
    GuildBasedChannel,
    GuildTextBasedChannel,
    MessageActionRowComponent,
    ActionRowBuilder,
    GuildTextBasedChannelTypes,
    Message,
    Snowflake,
    SnowflakeUtil,
    TextChannel,
    StringSelectMenuBuilder,
    ComponentType,
  } from "discord.js";
  import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
  import Extend_C from "../../../Structures/Client.js";
  import Logger from "../../../Resources/Console/Logger.js";
  
  export default <messageCommands>{
    data: {
      name: 'unban',
      description: 'Unban a user from the server by ID',
      category: "SuperAdmin",
      cooldown: 5000,
      aliases: ["unban"],
      permissions: ['SendMessages', 'EmbedLinks', 'BanMembers'],
      userPerms: ['ManageGuild', 'BanMembers'],
    },
    execute: async (client: Extend_C, message: Message, args: string[]) => {
      try {
        // Unban Command
        const ar = args.slice(1).join(" ");
        console.log({ ar, args });
  
        const bans = await message.guild.bans.fetch();
        const arrayUsers = [];
  
        const options = [];
        let collector;
        let msg;
        console.log(ar);
  
        if (args[0]) {
          const user = bans.find((user) => user.user.id === args[0] || user.user.tag === args[0] || user.user.username === args[0] );
  
          await message.guild.members.unban(user!.user.id);
          await message.channel.send({
            embeds: [new EmbedBuilder().setDescription(`Successfully unbanned ${user!.user.tag}`).setColor(client.MessageConfigs.EmbedColor)],
          });
        } else {
          for (const user of bans.values()) {
            arrayUsers.push(user.user.tag);
          }
  
          if (arrayUsers.length === 0) {
            return message.channel.send({
              embeds: [new EmbedBuilder().setDescription(`There are no banned users in this server`).setColor(client.MessageConfigs.EmbedColor)],
            });
          }
  
          for (let i = 0; i < arrayUsers.length; i++) {
            options.push({ label: arrayUsers[i], value: arrayUsers[i] });
          }
  
          const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder().setCustomId("unban").setPlaceholder("Select a user").addOptions(options)
          );
  
          msg = await message.channel.send({
            embeds: [new EmbedBuilder().setDescription(`Select a user to unban`).setColor(client.MessageConfigs.EmbedColor)],
            components: [row as any],
          });
  
          const filter = (interaction: any) => interaction.user.id === message.author.id;
          collector = msg.createMessageComponentCollector({
            filter,
            time: 20000,
            componentType: ComponentType.StringSelect,
            max: 1,
          });
        }
  
        async function unban(userId: string) {
          await message.guild.bans.remove(userId);
        }
  
        collector?.on("collect", async (interaction: any) => {
          console.log("collected");
  
          const userId = bans.find((user) => user.user.tag === interaction.values[0])?.user.id;
          if (userId) {
            await unban(userId);
            await interaction.update({
              embeds: [new EmbedBuilder().setDescription(`Successfully unbanned ${interaction.values[0]}`).setColor(client.MessageConfigs.EmbedColor)],
              components: [],
            });
          }
        });
  
        collector?.on("end", async (collected) => {
          if (collected.size === 0) {
            return await msg.edit({
              embeds: [new EmbedBuilder().setDescription(`Time's up`).setColor(client.MessageConfigs.EmbedColor)],
              components: [],
            });
          }
        });
      } catch (e) {
        Logger.log(e, "Error");
      }
    },
  };
  