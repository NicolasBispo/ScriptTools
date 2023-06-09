class CoresConsole {
    static VERMELHO(texto) {
        return `\x1b[31m${texto}\x1b[0m`;
    }
    

    static VERDE(texto) {
        return `\x1b[32m${texto}\x1b[0m`;
    }

    static AMARELO(texto) {
        return `\x1b[33m${texto}\x1b[0m`;
    }

    static AZUL(texto) {
        return `\x1b[34m${texto}\x1b[0m`;
    }

    static MAGENTA(texto) {
        return `\x1b[35m${texto}\x1b[0m`;
    }

    static CIANO(texto) {
        return `\x1b[36m${texto}\x1b[0m`;
    }

    static BRANCO(texto) {
        return `\x1b[37m${texto}\x1b[0m`;
    }
}
module.exports = CoresConsole;