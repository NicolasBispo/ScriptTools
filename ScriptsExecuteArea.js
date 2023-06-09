const CoresConsole = require('./Classes/CoresConsole');
const prompt = require('prompt-sync')();
let telaAtual = "";


async function executarScriptVilaBarbaraRecursos(tipoFuncional) {

    if (tipoFuncional === 'total') {
        while (true) {
            console.clear()
            console.log(CoresConsole.CIANO('Possui lealdade de campo em todas cidades?', CoresConsole('(Lealdade de campo duplica o tempo de obtenção)')));
            console.log(CoresConsole.AZUL('1'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Sim'))
            console.log(CoresConsole.AZUL('2'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Não'))
            const optionLealdadeCampo = prompt('Opção: ')
            switch (optionLealdadeCampo) {
                case 1:
                    while (true) {
                        console.clear();
                        console.log(CoresConsole.CIANO('Escolha uma das seguintes opçoes'));
                        console.log(CoresConsole.CIANO('1'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('10min'));
                        console.log(CoresConsole.CIANO('2'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('40min'));
                        console.log(CoresConsole.CIANO('3'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('3h'));
                        console.log(CoresConsole.CIANO('4'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('8h'));
                        const opcaoColheitaBarbaro = prompt('Opção: ');
                    }

                    break;
                case 2:

                    break;
                default:
                    console.log('Opção', CoresConsole.VERMELHO('inválida') + ', selecione uma opção válida.');
            }
        }
    }
}

module.exports = {
    executarScriptVilaBarbaraRecursos: executarScriptVilaBarbaraRecursos
}