import { jsonRead } from "emberutils";
import { MiscJSON } from "./interfaces";

export async function readMisc() {
    return await jsonRead('../misc.json') as MiscJSON
}
