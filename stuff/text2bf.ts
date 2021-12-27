// original js version: https://github.com/helgeh/brainfuck-text/blob/master/txt2bf.js (https://codegolf.stackexchange.com/a/107189/80573)
export function text2bf(input: string) {
    function StringBuilder() {
        const sb = {
            value: '',
            append: (txt: string) => sb.value += txt
        };
        return sb;
    }
    function closest(num: number, arr: number[]) {
        const arr2 = arr.map((n) => Math.abs(num - n));
        const min = Math.min.apply(null, arr2);
        return arr[arr2.indexOf(min)];
    }
    function buildBaseTable(arr: number[]) {
        const out = StringBuilder();
        out.append('+'.repeat(10));
        out.append('[');
        arr.forEach(function(cc) {
            out.append('>');
            out.append('+'.repeat(cc / 10));
        });
        out.append('<'.repeat(arr.length));
        out.append('-');

        out.append(']');
        return out.value;
    }
    const output = StringBuilder();
    const charArray = input.split('').map(c => c.charCodeAt(0));
    const baseTable = charArray.map((c) => Math.round(c / 10) * 10).filter((i, p, s) => s.indexOf(i) === p);
    output.append(buildBaseTable(baseTable));
    let pos = -1;
    charArray.forEach(function(charCode) {
        const bestNum = closest(charCode, baseTable);
        const bestPos = baseTable.indexOf(bestNum);
        const moveChar = pos < bestPos ? '>' : '<';
        output.append(moveChar.repeat(Math.abs(pos - bestPos)));
        pos = bestPos;
        const opChar = baseTable[pos] < charCode ? '+' : '-';
        output.append(opChar.repeat(Math.abs(baseTable[pos] - charCode)));
        output.append('.');
        baseTable[pos] = charCode;
    });
    return output.value;
}