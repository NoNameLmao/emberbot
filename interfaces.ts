import fs = require('fs/promises');
let jsoncfg: config;
(async () => {
    jsoncfg = JSON.parse(await fs.readFile('./config.json', { encoding: 'utf8' }));
})();
let { prefix, debug, susprefix } = jsoncfg;
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
export interface namehistory {
    name: string,
    changedToAt?: number;
}[];
export interface playerinfo {
    uuid: string;
    username: string;
    nameHistory: namehistory;
    skin: {
        avatar: string;
        renders: {
            head: {
                left: string;
                right: string;
            },
            body: {
                left: string;
                right: string;
            }
        },
        fullBody: string;
        combo: string;
        cape: string;
        texture: {
            get: string;
            download: string;
            apply: string;
        }
    }
}
export interface config {
    prefix: string,
    debug: boolean,
    susprefix: string
}
export const config: config = {
    prefix,
    debug,
    susprefix
}