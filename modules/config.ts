import { jsonRead } from "emberutils"
import { Config } from "./interfaces"
import { log } from "./logger"

export async function readConfig() {
    log('info', 'Reading config file...')
    const config = await jsonRead('./config.json') as Config
    log('info', 'Reading config file successful')
    return config
}
export async function importEnv() {
    log('info', 'Importing .env file...');
    (await import('dotenv')).config({ path: '../.env' })
    log('info', 'Imported the .env file')
}
