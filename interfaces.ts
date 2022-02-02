import { Message, ApplicationCommandOptionType } from "discord.js";
import { ChannelType } from 'discord-api-types';

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
    europesimStartDate: string,
    tagPrefix: {
        user_specific: string;
        global: string;
    }
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
export interface Tag {
    text: string;
    info: {
        created: {
            at: number;
            by: string;
            byID: string;
        },
        used: number;
    }
}
export interface TagList {
    user_specific: {
        [user_id: string]: {
            [tagName: string]: Tag
        }
    },
    global: {
        [tagName: string]: Tag
    }
}
export interface GuildConfig {
    [guild_id: string]: {
        prefix: string;
        tagPrefix: {
            user_specific: string;
            global: string;
        }
    }
}

export interface MiscJSON {
    countryList: string[];
    technobladeQuotes: string[];
}

export interface Command {
    name: string;
    aliases?: string[];
    description: string;
    hideFromHelp?: boolean;
    run(message: Message, args?: string[]): any;
}
export interface SlashCommand extends Command {
    slashCommand: {
        options: SlashCommandOptions;
    };
}
export interface SlashCommandOptions {
    type: ApplicationCommandOptionType;
    name: string;
    description: string;
    autocomplete?: boolean;
    required?: boolean;
    choices?: {
        name: string;
        value: string | number;
    }[];
    options?: SlashCommandOptions;
    channelTypes?: ChannelType[] | number[];
    minValue?: number;
    maxValue?: number;
}