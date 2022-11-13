const { SlashCommandBuilder } = require('discord.js');
const Ben = require('../modules/ben.js')

/** @type {import('../modules/interfaces').Command} */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ben')
        .setDescription('you still remember talking ben? you know, the "yes" and "hohohoho" guy'),
    async run(interaction) {
        await new Ben(interaction).newCall()
    }
}