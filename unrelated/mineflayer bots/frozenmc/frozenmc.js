const mineflayer = require('mineflayer');

const options = {
    host: '73.189.133.150',
    port: '3069',
    username: 'Bot',
    version: '1.16.4'
};
const bot = mineflayer.createBot(options);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

const nonoWords = ['nigga', 'nigger', 'niggerlo'];
function mute(username, reason) {
    return bot.chat(`/mute ${username} 1m ${reason}`);
};

bot.on('login', async () => {
    await sleep(2000);
    bot.chat('lol hi nerds');
    bot.on('message', (username, message) => {
        console.log(`${username}: ${message}`);
        if (message.toLowerCase().includes(nonoWords)) {
            console.log(`detected a nono word from ${username}!!!!!!!`);
            return mute(username, `racism`);
        };
    });
});