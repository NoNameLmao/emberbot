import * as index from './index';

/**
 * Evaluate JavaScript/TypeScript code.
 * @param {string} code Valid JavaScript or TypeScript code.
 * @returns Code output.
 */
export async function run(code: string) {
    return eval(code);
}
