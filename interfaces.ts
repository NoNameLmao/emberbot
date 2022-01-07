export interface ServerInfo {
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
export interface Config {
    prefix: string,
    debug: boolean,
    susprefix: string,
    europesimStartYear: number,
    europesimStartDate: string
}
export interface NameHistory {
    name: string,
    changedToAt?: number;
}[];
export interface PlayerInfo {
    uuid: string;
    username: string;
    nameHistory: NameHistory;
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