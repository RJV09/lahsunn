import Extend_C from "../../Structures/Client.js";
import { readdirSync } from 'fs';
import Logger from '../../Resources/Console/Logger.js';
import Grufy from '../../Structures/Client.js';
import { messageCommands } from '../../Resources/types/Interfaces/Interfaces.js';
export default class Install {
    static async install(Client: Extend_C) {
        const files = readdirSync("./dist/Window/Commands", { withFileTypes: true });
        let count = 0;
        for (const file of files) {
            if (file.isDirectory()) {
                const category = file.name;
                const commandFiles = readdirSync(`./dist/Window/Commands/${category}`).filter(file => file.endsWith('.js'));
                for (const commandFile of commandFiles) {
                    const command: messageCommands | any = (await import(`../../Window/Commands/${category}/${commandFile}`)).default;
                    if (command && command?.data?.name) {
                        Client.messageCommands.set(command.data.name, command);
                        if (command.data.aliases && command.data.aliases.length > 0) {
                            for (const alias of command?.data?.aliases) {
                                Client.messageCommands.set(alias, command);
                            }
                        }
                        count++;
                    } else {
                        Logger.log(`: One of The File in :: [${category}]:: is Missing Name[Message Commands]`, '[Warn]');
                    }

                }
            }
        }
        Logger.log(`loaded MessageCommands :: ${count}`, "Loaded");

    }

}