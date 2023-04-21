const { SlashCommandBuilder } = require('discord.js')
const sqlite3 = require('sqlite3')
const { getRandomArbitrary, chance } = require('emberutils')
const db = new sqlite3.Database('./economy.db')
db.run('CREATE TABLE IF NOT EXISTS members (user_id INTEGER PRIMARY KEY, balance INTEGER)')
class Basement {
    guildID = '1079127687605522514'
    economy = {
        currency: {
            name: 'ruble',
            emoji: '💵'
        },
        db: {
            
        },
        /** @type {import('./interfaces').Command[]} */
        commands: [
            {
                data: new SlashCommandBuilder()
                    .setName('daily')
                    .setDescription('Claim your daily rubles'),
                async execute(interaction) {
                    try {
                        await interaction.deferReply()
                        if (!await userExists(interaction.user.id)) {
                            interaction.editReply(`Looks like it's your first time, hold on a bit...`)
                            await createUser(interaction.user.id)
                        }
                        const money = chance(20) ? getRandomArbitrary(250, 500) : getRandomArbitrary(50, 250)
                        await addMoney(interaction.user.id, money).catch(err => {
                            console.error(err)
                            interaction.editReply('❌ Could not add money to your balance.')
                        })
                        interaction.editReply(`You have claimed your daily money and received ${money} rubles.`)
                    } catch (error) {
                        console.error(error)
                        interaction.editReply('❌ Something went wrong.')
                    }
                }
            },
            {
                data: new SlashCommandBuilder()
                    .setName('balance')
                    .setDescription('Check your balance'),
                async execute(interaction) {
                    try {
                        if (!await userExists(interaction.user.id)) {
                            await createUser(interaction.user.id).catch(err => {
                                
                            })
                            await interaction.reply(`Looks like it's your first time using the economy system, you've been added to the database with 0 balance.`)
                        } else {
                            const balance = await getMoney(interaction.user.id)
                            await interaction.reply(`Your current balance is ${balance} rubles.`)
                        }
                    } catch (err) {
                        console.error(err)
                        await interaction.reply('An error occurred while checking your balance.')
                    }
                }
            }
        ]
    }
}

/**
* Check if a user exists in the database
* @param {string} userID
* @returns {Promise<boolean>}
*/
function userExists(userID) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM members WHERE user_id = ?', [userID], (err, row) => {
            if (err) reject(err)
            resolve(!!row)
        })
    })
}
/**
* Create a user in the database
* @param {string} userID
* @returns {Promise<void>}
*/
function createUser(userID) {
    return new Promise(async (resolve, reject) => {
        if (await userExists(userID))
        reject(new Error(`User with ID ${userID} already exists in the database`))
        const stmt = db.prepare('INSERT INTO members VALUES (?, ?)', err => reject(err))
        stmt.run(userID, 0)
        stmt.finalize(err => {
            if (err) reject(err)
            resolve()
        })
    })
}
/**
* Delete a user from the database
* @param {string} userID
* @returns {Promise<void>}
*/
function deleteUser(userID) {
    return new Promise(async (resolve, reject) => {
        if (!await userExists(userID)) await createUser(userID)
        const stmt = db.prepare('UPDATE members SET balance = balance - ? WHERE user_id = ?', err => reject(err))
        stmt.run(amount, userID)
        stmt.finalize(err => {
            if (err) reject(err)
            resolve()
        })
    })
}
/**
* Add money to a user's balance
* @param {string} userID
* @param {number} amount
* @returns {Promise<void>}
*/
function addMoney(userID, amount) {
    return new Promise(async (resolve, reject) => {
        if (!await userExists(userID)) await createUser(userID)
        const stmt = db.prepare('UPDATE members SET balance = balance + ? WHERE user_id = ?', err => reject(err))
        stmt.run(amount, userID)
        stmt.finalize(err => {
            if (err) reject(err)
            resolve()
        })
    })
}
/**
* Set a user's balance
* @param {string} userID
* @param {number} amount
* @returns {Promise<void>}
*/
function setMoney(userID, amount) {
    return new Promise(async (resolve, reject) => {
        if (!await userExists(userID)) await createUser(userID)
        const stmt = db.prepare('UPDATE members SET balance = ? WHERE user_id = ?', err => reject(err))
        stmt.run(amount, userID)
        stmt.finalize(err => {
            if (err) reject(err)
            resolve()
        })
    })
}
/**
* Subtract money from a user's balance
* @param {string} userID
* @param {number} amount
* @returns {Promise<void>}
*/
function subtractMoney(userID, amount) {
    return new Promise(async (resolve, reject) => {
        if (!userExists(userID)) await createUser(userID)
        else {
            db.run('UPDATE members SET balance = balance - ? WHERE user_id = ?', [amount, userID], err => {
                if (err) reject(err)
                else resolve()
            })
        }
    })
}
/**
* Transfer money from one user to another
* @param {string} senderID - The ID of the user sending the money
* @param {string} receiverID - The ID of the user receiving the money
* @param {number} amount - The amount of money to be transferred
* @returns {Promise<void>}
*/
function transferMoney(senderID, receiverID, amount) {
    return new Promise(async (resolve, reject) => {
        const senderBalance = await getMoney(senderID)
        if (senderBalance < amount) return reject(new Error("Sender does not have enough money"))
        const senderStmt = db.prepare('UPDATE members SET balance = balance - ? WHERE user_id = ?', err => reject(err))
        const receiverStmt = db.prepare('UPDATE members SET balance = balance + ? WHERE user_id = ?', err => reject(err))
        senderStmt.run(amount, senderID)
        receiverStmt.run(amount, receiverID)
        senderStmt.finalize(err => {
            if (err) reject(err)
            receiverStmt.finalize(err => {
                if (err) reject(err)
                resolve()
            })
        })
    })
}

/**
* Get a user's balance
* @param {string} userID
* @returns {Promise<number>} User's balance
*/
function getMoney(userID) {
    return new Promise((resolve, reject) => {
        const stmt = db.prepare('SELECT balance FROM members WHERE user_id = ?', err => reject(err))
        stmt.get(userID, (err, row) => {
            if (err) reject(err)
            if (!row) reject(new Error(`User with ID ${userID} does not exist in the database`))
            else resolve(row.balance)
        })
    })
}

module.exports = {
    Basement,
    userExists,
    createUser,
    deleteUser,
    addMoney,
    subtractMoney,
    setMoney,
    transferMoney,
    getMoney
}
