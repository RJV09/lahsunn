
import { ApplicationCommandOption, ChatInputCommandInteraction, CommandInteraction, Message, PermissionResolvable } from 'discord.js'
import Extend_C from '../../../Structures/Client.js';;


export interface messageCommands {
    data: {
        name: string;
        category?: "SuperAdmin"|"MiniAdmin"|"Info";
        usage?: string;
        example?: string;
        cooldown?: number;
        userPerms ?: PermissionResolvable[];
        aliases?: string[];
        description: string;
        dev?:boolean;
        permissions?: PermissionResolvable[];
        
    }

    execute: (client: Extend_C, message: Message, args: string[], superInteraction?:ChatInputCommandInteraction | CommandInteraction) => any
}