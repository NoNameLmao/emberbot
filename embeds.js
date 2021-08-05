let {
    nowUTC,
    europesimCurrentYear,
    europesimCurrentMonth,
    userCount,
    memberCount,
    botCount,
    onlineUsers,
    err
} = require('./server.js');
let config = require('./config.json');

const infoEmbed = {
    "title": "Useless information about europesim",
    "description": "totally useless why did you use this command",
    "author": {
        "name": "Bot information",
        "icon_url": "https://cdn.discordapp.com/icons/846807940727570433/4bbf13c1ce8bfb351fc7eafdc898e7d1.png"
    },
    "color": 53380,
    "footer": {
        "text": "https://ourworldofpixels.com/europesim"
    },
    "fields": [
        {
            "name": "Current UTC hour",
            "value": `${nowUTC}`,
            "inline": true
        },
        {
            "name": "Europesim year, month",
            "value": `${europesimCurrentYear}, ${europesimCurrentMonth}`,
            "inline": true
        },
        {
            "name": "Europesim's server member count",
            "value": `${userCount} users + ${botCount} bots = ${memberCount} members overall. Online users: ${onlineUsers}`,
            "inline": false
        }
    ]
};
const errEmbed = {
    "plainText": "<@341123308844220447> lol ur so bad fix me",
    "title": "uncaught exception or smth",
    "description": "stop looking at this embed CALL NNL QUICK",
    "author": {
        "name": `all part of my master plan`,
        "icon_url": "https://cdn.discordapp.com/emojis/530436914260606987.png?v=1"
    },
    "color": 15158332,
    "footer": {
        "text": "not even close baby i never go offline"
    },
    "fields": [
        {
          "name": `${err.message}`,
          "value": `${err.stack}`,
          "inline": false
        }
    ]
};
const helpEmbed = {
    "title": "All list of commands",
    "description": `prefix: ${config.prefix}`,
    "color": 53380,
    "footer": {
        "text": "Some text edited idk"
    },
    "fields": [
        {
          "name": "hi",
          "value": "Usually used to check if bot is responding/online or not",
          "inline": true
        },
        {
          "name": "eval (code)",
          "value": "Execute some JavaScript code",
          "inline": true
        },
        {
          "name": "exit",
          "value": "Shortcut to process.exit(1);",
          "inline": true
        },
        {
          "name": "sudo (message)",
          "value": "Send messages as me (idk why i added it, might remove)",
          "inline": true
        },
        {
          "name": "quote",
          "value": `Random technoblade quote`,
          "inline": true
        },
        {
            "name": "suggest (suggestion)",
            "value": "Send bot suggestions to NoNameLmao, may or may not be added :shrug:",
            "inline": true
        },
        {
            "name": "esim",
            "value": "Categorised commands that are related to europesim. Run this command for more info",
            "inline": true
        },
        {
            "name": "rng <minValue> (maxValue)",
            "value": "Random number generator (minValue is optional)",
            "inline": true
        },
        {
            "name": "warmode (on/off)",
            "value": `Alerts ${pingNNL} about an ongoing war so he will leave the bot in peace and stop doing anything with it`,
            "inline": true
        },
        {
            "name": "code (code thing)",
            "value": `Serves as a reminder to ${pingNNL} for some parts of code he frequently forgets about lol he is so bad he forgets his own code`,
            "inline": true
        },
        {
            "name": "help",
            "value": "It does exactly what you think it does.",
            "inline": false
        }
    ]
};
const esimEmbed = {
    "title": "Command category: Europesim",
    "description": `Usage: .esim (command)`,
    "color": 53380,
    "footer": {
        "text": "https://ourworldofpixels.com/europesim"
    },
    "fields": [
        {
            "name": "info",
            "value": "Shows information (duh)",
            "inline": false
        }
    ]
}
module.exports = {
    infoEmbed,
    errEmbed,
    helpEmbed,
    esimEmbed
}