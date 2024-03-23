import { ColorResolvable } from "discord.js";
type TConfig = {
    EmbedColor: ColorResolvable;
    ErrorColor: ColorResolvable;
}
const Messages = {
    Configs: {
        EmbedColor: "2F3136" as string,
        ErrorColor: "FF0000" as string,
    } as TConfig,
    Message: {
        AntiCaps: {
            ForClient: {
                AntiCapsActivated: "AntiCaps has been activated",
                AntiCapsDeactivated: "AntiCaps has been deactivated",
            },
            ForUser: {
                AntiCapsActivated: "AntiCaps has been activated by a staff member\n**So, Please dont Use Caps**",
            }
        },
        AntiLink: {
            ForClient: {
                AntiLinkActivated: "AntiLink has been activated",
                AntiLinkDeactivated: "AntiLink has been deactivated",
            },
            ForUser: {
                AntiLinkActivated: "AntiLink has been activated by a staff member\n**So, Please dont Send Links as its not allowed**",
            }
        },
        AntiSpam: {
            ForClient: {
                Activated: "AntiSpam has been activated",
                Decactivate: "AntiSpam has been deactivated",
            },
            ForUser: {
                Activated: "AntiSpam has been activated by a staff member\n**So, Please dont Spam**",
            }
        }
        ,
        AntiPing: {
            ForClient: {
                Activated: "AntiPing has been activated",
                Decactivate: "AntiPing has been deactivated",
            },
            ForUser: {
                Activated: "AntiPing has been activated by a staff member\n**So, Please dont Ping**",
            }
        },


    },
    ErrorMessages: {
        Permission_SendMessage: "I am missing \`\`\`SendMessages\`\`\` permission",
    },
}
export default Messages;