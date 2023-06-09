const CoresConsole = require('./Classes/CoresConsole');
const prompt = require('prompt-sync')();
const WorldNavigation = require('./Classes/WorldNavigation');
const ScriptsExecuteArea = require('./ScriptsExecuteArea')



let page;
const worldNav = new WorldNavigation();

function setGrepolis(pageRecebida) {
    page = pageRecebida;
    worldNav.atualizarPage(page);
}

async function telaUserArea() {
    console.clear();
    console.log(CoresConsole.AMARELO('Área do usuário - Escolha as opções de bot existentes'));
    const cidadesEncontradas = await worldNav.descobrirCidadesJogador('inicial');
    console.log(CoresConsole.AZUL('Cidades do usuário:'));
    cidadesEncontradas.forEach(cidade => {
        console.log(CoresConsole.AMARELO(cidade.name))
    })

    while (true) {
        console.log(CoresConsole.CIANO('1 - Aldeias barbaras'), CoresConsole.CIANO('\t2 - Fila de construção'));
        console.log(CoresConsole.CIANO('3 - Verificar fila de atividades/scripts'));
        const opcaoUserArea = prompt('Opção:');
        switch (parseInt(opcaoUserArea)) {
            case 1:
                telaAldeiasBarbarasPreBot();
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                console.log('Opção', CoresConsole.VERMELHO('inválida') + ', selecione uma opção válida.');
                await sleep(1000);
        }
    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function telaAldeiasBarbarasPreBot() {

    while (true) {
        console.clear();
        console.log(CoresConsole.AMARELO('[GREPOLIS-TOOLS]'), CoresConsole.VERMELHO('-'), CoresConsole.CIANO('Script de aldeia barbara'));
        console.log(CoresConsole.AZUL('1'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Coletar recursos'));
        console.log(CoresConsole.AZUL('2'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Coletar tropas'));
        const opcaoTipoColeta = prompt('Opção: ');
        switch (parseInt(opcaoUserArea)) {
            case 1:
                while (true) {
                    console.log(CoresConsole.AZUL('1'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Definir coleta padrão para todas aldeias'), CoresConsole.VERDE('[FUNCIONANDO]'));
                    console.log(CoresConsole.AZUL('1'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Definir coleta individual para cada aldeia'), CoresConsole.VERMELHO('[NAO FUNCIONANDO]'));
                    const opcaoTipoColeta2 = prompt('Opção: ');
                    switch (parseInt(opcaoTipoColeta2)) {
                        case 1:
                            ScriptsExecuteArea.executarScriptVilaBarbaraRecursos('total');
                            break;
                        case 2:
                            ScriptsExecuteArea.executarScriptVilaBarbaraRecursos('individual');
                            break;
                        default:
                            console.log('Opção', CoresConsole.VERMELHO('inválida') + ', selecione uma opção válida.');
                            await sleep(1000);
                    }
                }
                break;
            case 2:
                while (true) {
                    console.log(CoresConsole.AZUL('1'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Definir coleta padrão para todas aldeias'), CoresConsole.VERDE('[FUNCIONANDO]'));
                    console.log(CoresConsole.AZUL('1'), CoresConsole.BRANCO('-'), CoresConsole.AMARELO('Definir coleta individual para cada aldeia'), CoresConsole.VERMELHO('[NAO FUNCIONANDO]'));
                    const opcaoTipoColeta2 = prompt('Opção: ');
                    switch (parseInt(opcaoTipoColeta2)) {
                        case 1:
                            ScriptsExecuteArea.executarScriptVilaBarbaraSoldados('total');
                            break;
                        case 2:
                            ScriptsExecuteArea.executarScriptVilaBarbaraSoldados('individual');
                            break;
                        default:
                            console.log('Opção', CoresConsole.VERMELHO('inválida') + ', selecione uma opção válida.');
                            await sleep(1000);
                    }
                }
                break;
            case 3:
                break;
            default:
                console.log('Opção', CoresConsole.VERMELHO('inválida') + ', selecione uma opção válida.');
                await sleep(1000);
        }
    }
}
module.exports = {
    telaUserArea: telaUserArea,
    setGrepolis: setGrepolis
};