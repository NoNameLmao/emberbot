const serverline = require('serverline')
class Stdin {
    readline = serverline
    constructor() {
        this.readline.init
    }
}