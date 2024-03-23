import dotenv from 'dotenv';
import Logger from './Resources/Console/Logger.js';
import colors from 'colors';
import { createInterface } from 'readline';
dotenv.config();
interface Config {
    token: string;
    clientId: string;
    prefix: {
        OnlyPrefix: boolean;
        Dprefix: string;
    };
    mode: {
        maintenance: boolean;
        reason: string;
    };
    devs?: string[];
    devRole?: {
        guildId: string;
        roleId: string;
    
    }


}
const config = (): Config => {
    const config: Config = {

        token: process.env.Token,// Main bots token 
        clientId: '1014533266151313458',// Main bots client id
        prefix: { 
            OnlyPrefix: false, //if true then === NoPrefix + Prefix system will be disabled
            Dprefix: '.',
        },
        mode: {
            maintenance: false,// If bot is in maintenance mode
            reason: '',// Reason for maintenance mode
        },
        devs: ['1014533266151313458'],// Devs of the bot
        devRole: {
            guildId: '1014533266151313458',// Dev role guild id
            roleId: '1014533266151313458',// Dev role id
        },// Dev role of the bot from your server


    };
    // Checks
    if (config.token === '' || null || "") {
        Logger.log(": Invalid token was provied or wasn\'t provided", "[Warn]")
    }
   
    return config;
};
export default config();