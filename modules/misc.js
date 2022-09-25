import { jsonRead } from "emberutils";
import { MiscJSON } from "./interfaces";

export async function readMisc() {
    /** @type {MiscJSON} */
    return await jsonRead('../misc.json')
}
