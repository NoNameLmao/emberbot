const discord = require('discord.js')
const { DisTube } = require('distube')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

module.exports = class MusicPlayer {
    /** @type {DisTube} */
    distube
    /** @type {DisTubeVoice} */
    currentVC
    /** @param {import('./discord_client')} dcClient */
    constructor(dcClient) {
        this.distube = new DisTube(dcClient, {
            leaveOnStop: false,
            emptyCooldown: 60000,
            emitAddListWhenCreatingQueue: false,
            emitAddSongWhenCreatingQueue: false,
            plugins: [
                new SoundCloudPlugin(), new YtDlpPlugin({ update: true })
            ]
        })
    }
    /** @param {discord.VoiceBasedChannel} voiceChannel */
    joinVC(voiceChannel) {
        return new Promise(async (resolve, reject) => {
            this.currentVC = await this.distube.voices.join(voiceChannel).catch(reject)
            resolve(this.currentVC)
        })
    }
}