type D = {
    antiCaps: boolean,
    antiLink: boolean,
    antiSpam: boolean,
    antiPing: boolean,

}
export default class GuildData {
    public data = {
        antiCaps: false,
        antiLink: false,
        antiSpam: false,
        antiPing: false,

    }



    public async getData(x?:keyof D){
        if(x){
            return this.data[x];
        }else {
           return this.data; 
        }
        
    }
    public async Activate(x?:keyof D){
       if(this.data.hasOwnProperty(x)){
           this.data[x] = true;
       }else {
           console.log("Invalid Options available options:" + Object.keys(this.data))
       }
    }

    public async Deactivate(x?:keyof D){
        if(this.data.hasOwnProperty(x)){
            this.data[x] = false;
        }else {
            console.log("Invalid Options available options:" + Object.keys(this.data))
        }
    }

}