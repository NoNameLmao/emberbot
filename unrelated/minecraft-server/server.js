const mcServer = require('flying-squid');

mcServer.createMCServer({
    'motd': 'FrozenBoiiiiiiiiiiiiiiiii SMP \nlol',
    'port': 25565,
    'max-players': 69,
    'online-mode': false,
    'logging': true,
    'gameMode': 0, // survival
    'difficulty': 2, // hard?
    'worldFolder': 'world',
    'kickTimeout': 10000, // 10s
    'plugins': {
        // put something here later
    },
    'view-distance': 16, // 16 chunk render distance
    'player-list-text': {
        'header': 'lol',
        'footer': 'lmao'
    },
    'everybody-op': false, // lol no op nerd
    'version': '1.16.5'
});

module.exports.server = function(player, serv) {
    player.on('spawned', () => {
        player.chat(`welcome to frozenboiiiiiiii survival multiplayer penis`); // sends message to player
    });
    serv.on('error', (error) => {
        console.log(error);
    });
    serv.on('clientError', (client,error) => {
        console.log(error);
    });
};