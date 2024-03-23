type ClientOptions = {
    version: string,
    intents: any,
    makeCache: any,
    allowedMentions: {
        repliedUser: boolean,
        parse: string[]
    }
}


export default class Types  {
    Options : ClientOptions ;
}