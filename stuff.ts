// all the stuff i wanted to clear index.ts from;
import * as index from './index';
let {
    europesimCurrentMonth,
    europesimCurrentYear,
    europesimStartDate,
    europesimStartYear,
    differenceInDays,
    currentDate,
    nowUTC,
    months,
    now
} = index;
import * as fs from 'fs';

/**
 * Random number between (min) and (max) values.
 * @param {number} min Minimal value
 * @param {number} max Maximal value
 * @returns {number} Random value between min and max.
 */
export function getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
/**
 * Random number between 0 and (max) values.
 * @param {number} max Maximal value
 * @returns {number} Random value between 0 and max.
 */
export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}
/**
 * Update the europesim year.
 */
export function updateYear() {
    europesimStartDate = Date.parse('August 30 2021 00:00:00 GMT');
    currentDate = Date.now();
    differenceInDays = (currentDate - europesimStartDate) / (1000 * 3600 * 24);
    europesimCurrentYear = (Math.floor(europesimStartYear + differenceInDays));
}
/**
 * Update the europesim month.
 */
export function updateMonth() {
    now = new Date();
    nowUTC = now.getUTCHours();
    europesimCurrentMonth = months[Math.floor(nowUTC / 2)];
}
/**
 * Fancier `console.log()`
 * @param {string} message The message to output into console
 * @returns `[index.ts] ${message}` in console.
 */
export function log(message: string) {
    return console.log(`[index.ts] ${message}`);
}
/**
 * Remove Minecraft color codes from a string the wackiest way possible.
 * @param {string} string String to clean up of the color codes
 * @returns {string} String without the color codes.
 */
export function removeMCColorCodes(string: string): string {
    return string
    // color shenanigans
    .replace('§4', '').replace('§c', '').replace('§6', '').replace('§e', '').replace('§2', '').replace('§a', '').replace('§b', '').replace('§3', '').replace('§1', '')
    .replace('§9', '').replace('§d', '').replace('§5', '').replace('§f', '').replace('§7', '').replace('§8', '').replace('§0', '')
    // other font shenanigans
    .replace('§k', '').replace('§l', '').replace('§m', '').replace('§n', '').replace('§o', '').replace('§r', '');
}
/**
 * Read the json file using `fs` module.
 * @param filePath The path to the json file.
 * @returns UTF-8 encoded file content.
 */
export function jsonRead(filePath: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (error: NodeJS.ErrnoException | null, content: string) => {
            if (error) reject(error);
            else try {
                resolve(JSON.parse(content));
            } catch (error) {
                reject(error);
            }
        });
    });
}
export function jsonWrite(filePath: string, data: object | string[]) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 4), (error: NodeJS.ErrnoException | null) => {
            if (error) reject(error);
            else resolve(true);
        });
    });
}
export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
