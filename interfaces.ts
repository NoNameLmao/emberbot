import fs = require('fs/promises');
let jsoncfg: config;
(async () => {
    jsoncfg = JSON.parse(await fs.readFile('./config.json', { encoding: 'utf8' }));
})();
let { prefix, debug, chatbot, susprefix } = jsoncfg;
// mcdata.serverStatus();
export interface serverinfo {
    serverStatus: 'online' | 'offline',
    serverip: string,
    version: string,
    protocol: string,
    players: number,
    maxplayers: number,
    motd: {
        text: string,
        legacy: boolean
    },
    ping: number,
    icon: string
}
export interface config {
    prefix: string,
    debug: boolean,
    chatbot: 'old' | 'new',
    susprefix: string
}
export const config: config = {
    prefix,
    debug,
    chatbot,
    susprefix
}