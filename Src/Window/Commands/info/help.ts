import { ActionRowBuilder, ApplicationCommandOptionType, ComponentType, EmbedBuilder, Message, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { messageCommands } from "../../../Resources/types/Interfaces/Interfaces.js";
import Extend_C from "../../../Structures/Client.js";
import Logger from "../../../Resources/Console/Logger.js";






export default <messageCommands>{
  data: {
    name: 'help',
    cooldown: 5000,
    description: `Get a list of all commands or info about a specific command`,
    category: "Info",
    aliases: ['h'],
    permissions:['SendMessages','EmbedLinks'],
    
  },
  execute: async (client: Extend_C, message: Message, args: string[]) => {
    try{
     



    const specificCommand : any = args[0];

    if(specificCommand){
      const command = client.messageCommands.get(`${specificCommand.toLowerCase()}`) || client.messageCommands.find((cmd: any) => cmd.data.aliases && cmd.data.aliases.includes(specificCommand.toLowerCase()));
      if(!command){
        return message.reply({content: 'No command found with that name'})
      }
      const embed = new EmbedBuilder()
      .setAuthor({ name: "| Help Menu", iconURL: client.user.displayAvatarURL() })
      .setDescription(`> ${command.data.description}`)
      .addFields(
        {name: `Information about ${specificCommand}`, value: `Category : \`${command.data.category}\`\nCooldown : \`${command.data.cooldown/1000}s\`\nName: \`${command?.data?.name}\` \nAliases : \`${command?.data?.aliases?.join('`, `') ?? 'No Aliases'}\`\n> Bot Perms Required : ${command.data.permissions?.map((p: any) => `\`${p}\``).join(', ') ?? 'No Perms Required'}\n> User Perms required : ${command.data.userPerms?.map((p: any) => `\`${p}\``).join(', ') ?? 'No User Perms Required'}`},
      )

      .setColor(client.MessageConfigs.EmbedColor)
      //.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
      return message.reply({embeds: [embed],})
    }

    const SuperAdminCommands = Array.from(new Set(client.messageCommands
        .filter((cmd: messageCommands) => cmd.data.category && cmd.data.category === "SuperAdmin")
        .map((cmd: messageCommands) => `\`${cmd.data.name}\``)))
        .join(', ');
      
      const MiniAdminCommands = Array.from(new Set(client.messageCommands
        .filter((cmd: messageCommands) => cmd.data.category && cmd.data.category === "MiniAdmin")
        .map((cmd: messageCommands) => `\`${cmd.data.name}\``)))
        .join(', ');
      
      const InfoCommands = Array.from(new Set(client.messageCommands
        .filter((cmd: messageCommands) => cmd.data.category && cmd.data.category === "Info")
        .map((cmd: messageCommands) => `\`${cmd.data.name}\``)))
        .join(', ');
      
    
    const About = `> To view information about a specific command, use \`${client.config.prefix.Dprefix}help <command>\``;


    const Page_Help_main = new EmbedBuilder()
    .setAuthor({ name: "| Help Menu", iconURL: client.user.displayAvatarURL() })
    .setThumbnail(message.client.user.displayAvatarURL())
    //• My Default Prefix For This Server is ..
    .setDescription(`${About}\nMy Prefix Here is : \`${client.config.prefix.Dprefix}\``)
    .addFields({
      name:`Command Categories : \n`, value: `\n**SuperAdmin**\n${SuperAdminCommands}\n**MiniAdmin**\n${MiniAdminCommands}\n**Info**\n${InfoCommands}\n`
    })
    .setColor(client.MessageConfigs.EmbedColor)
    .setFooter({text : `| Scanning evil activities using my moderation powers`,iconURL: message.guild.iconURL()})
    await message.reply({
        embeds: [Page_Help_main],
    }).then((message)=> {

//Embeds 

      
    

      

})







  






} catch(e){
  Logger.log(e,"Error")
}

  }
}