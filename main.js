const CoresConsole = require('./Classes/CoresConsole');
const prompt = require('prompt-sync')();
const GrepolisPuppeteer = require('./Classes/GrepolisPuppeteer');
const userAreaControl = require('./userAreaControl');

const grepolis = new GrepolisPuppeteer();

function inicio() {
    console.log(CoresConsole.AMARELO('GrepolisTools'));
    console.log(CoresConsole.VERMELHO('Made by:') + CoresConsole.BRANCO('Nícolas'));
    console.log(CoresConsole.BRANCO('\nEscolha as opções para utilizar:'));
    console.log(CoresConsole.BRANCO('1 - Iniciar GrepolisTools'));
    console.log(CoresConsole.BRANCO('2 - Links de contato do desenvolvedor'));
    console.log(CoresConsole.BRANCO('3 - Fechar script'));

    const opcaoUsuario = prompt('Opção: ');

    switch (parseInt(opcaoUsuario)) {
        case 1:
            telaLoginConsole();
            break;
        case 2:
            telaDadosDesenvolvedor();
            break;
        case 3:
            process.exit(1);
    }
}

async function telaLoginConsole() {
    console.clear();

    let isPuppeteerConcluido = false;
    const iniciarPromise = grepolis.iniciarPuppeteer().then(() => {
        isPuppeteerConcluido = true;
    });

    let carregando = 0;

    
    while (!isPuppeteerConcluido) {
        switch (carregando % 4) {
            case 0:
                console.clear();
                console.log(CoresConsole.CIANO("carregando"));
                break;
            case 1:
                console.clear();
                console.log(CoresConsole.CIANO("carregando."));
                break;
            case 2:
                console.clear();
                console.log(CoresConsole.CIANO("carregando.."));
                break;
            case 3:
                console.clear();
                console.log(CoresConsole.CIANO("carregando..."));
                break;
        }

        carregando++;
        await sleep(500); // Aguarda 1 segundo antes de repetir o loop
    }

    console.clear()


    // Função auxiliar para aguardar uma quantidade de milissegundos
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    console.log(CoresConsole.AMARELO('Bem-vindo ao GrepolisTools'));
    console.log(CoresConsole.BRANCO('Insira seus dados de login para realizar o login no Grepolis'));

    async function promptLogin() {
        const username = prompt('Nome de usuário: ');
        const password = prompt('Senha: ');
        let esperandoLogin = false
        console.clear();
        console.log(CoresConsole.CIANO('Realizando login, aguarde'))
        const loginResult = await grepolis.executarLogin(username, password);
        return loginResult;
    }
    const loginResult = await promptLogin();
    if (loginResult) {
        console.clear();
        console.log(CoresConsole.AMARELO('GREPOLIS-TOOLS'), CoresConsole.VERMELHO('-'), CoresConsole.VERDE('Login realizado com sucesso'));

        const mundosEncontrados = await grepolis.encontrarMundos()
        console.log(CoresConsole.AMARELO('[GREPOLIS-TOOLS]'), CoresConsole.VERMELHO('-'), CoresConsole.BRANCO('Escolha seu mundo:'));
        console.log(CoresConsole.BRANCO('Escolha o número respectivo ao mundo'))
        let contadorMundo = 1;
        let mundosExistentes = []
        mundosEncontrados.forEach(mundo => {
            
            console.log(CoresConsole.CIANO('1 - [MUNDO]'), CoresConsole.BRANCO('-'), CoresConsole.VERMELHO(mundo));
            mundosExistentes[contadorMundo] = mundo;
            contadorMundo += 1;
        });
        function escolherMundoConsole() {
            let mundoEscolhido = prompt('Escolha o mundo: ');
            mundoEscolhido = parseInt(mundoEscolhido);
            if (isNaN(mundoEscolhido)) {
                console.log(CoresConsole.AMARELO('[GREPOLIS-TOOLS]'), CoresConsole.BRANCO('-'), CoresConsole.VERMELHO('O valor inserido é inválido insira somente números'));
                escolherMundoConsole();
            }
            if (mundoEscolhido > contadorMundo || mundoEscolhido < 1) {
                console.log(CoresConsole.AMARELO('[GREPOLIS-TOOLS]'), CoresConsole.BRANCO('-'), CoresConsole.VERMELHO('O valor inserido não corresponde a um mundo existente, tente outro valor'));
                escolherMundoConsole();
            }
            else {
                return mundoEscolhido;
            }
        }
        const mundoSelecionado = escolherMundoConsole();
        const nomeMundoSelecionado = mundosExistentes[mundoSelecionado];
        console.log(`Mundo selecionado: ${nomeMundoSelecionado}`);

        await grepolis.selecionarMundo(nomeMundoSelecionado);
        userAreaControl.setGrepolis(grepolis.obterPage());
        userAreaControl.telaUserArea();


    } else {
        console.clear();
        console.log(CoresConsole.VERMELHO('Erro de login. Credenciais inválidas.'));
        const tryAgain = prompt('Deseja tentar novamente? (s/n): ');

        if (tryAgain.toLowerCase() === 's') {
            promptLogin()
        } else {
            console.log(CoresConsole.AMARELO('Encerrando o programa...'));
            process.exit();
        }
    }
}

inicio();


