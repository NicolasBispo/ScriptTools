const puppeteer = require('puppeteer');
const CoresConsole = require('./CoresConsole');

class GrepolisPuppeteer {
    static browser = null;
    static page = null;

    reset = "\x1b[0m";
    red = "\x1b[31m";
    green = "\x1b[32m";
    yellow = "\x1b[33m";
    blue = "\x1b[34m";
    white = "\x1b[37m";

    async iniciarPuppeteer() {
        this.browser = await puppeteer.launch({
          headless: false,
          handleSIGINT: false,
          defaultViewport: null, // Permite que a página tenha o tamanho desejado
          args: ['--start-maximized', '--disable-notifications'], // Desabilita as notificações e info bars
          ignoreDefaultArgs: ['--enable-automation', '--disable-infobars'],
        });
        this.page = await this.browser.newPage();
        
        await this.page.goto('https://br.grepolis.com');
        return;
      }
      

    async executarLogin(usuario, senha) {

        const page = this.page;

        //Seleciona o campo de usuário e digita o usuário definido
        await page.waitForSelector('#login_userid');
        await page.type('#login_userid', usuario);

        //Seleciona o campo de senha e digita a senha definida
        await page.waitForSelector('#login_password');
        await page.type('#login_password', senha);


        //Seleciona o botão de login e clica nele
        await page.waitForSelector('#login_Login');
        await page.click('#login_Login');

        //Verifica se o seguinte elemento existe na página, se não existir é porque a senha foi correta
        //Se existir o login foi malsucedido

        try {

            await page.waitForSelector('.validation-message-error', { timeout: 600 });
            // Se a linha acima não gerar uma exceção, significa que o seletor foi encontrado
            // e o login foi malsucedido
            await page.click('.validation-error-close');
            //console.log(CoresConsole.AMARELO('[GREPOLIS-LAUNCHER]'), CoresConsole.VERMELHO('-'), CoresConsole.BRANCO('Erro no login'));
            return false;
        } catch (error) {
            // Se ocorrer uma exceção, significa que o seletor não foi encontrado
            // e o login foi bem-sucedido
            //console.log(CoresConsole.AMARELO('[GREPOLIS-PUPPETEER]'), CoresConsole.VERMELHO('-'), CoresConsole.BRANCO('Login completo no site'));
            await page.waitForNavigation();
            return true;
        }

    }

    async encontrarMundos() {
        const page = this.page;
        const mundos = await page.$$('.world_name');

        const mundosEncontrados = [];
        for (const mundo of mundos) {
            const texto = await mundo.evaluate(node => node.textContent);
            mundosEncontrados.push(texto);
        }
        
        return mundosEncontrados;
    }

    async selecionarMundo(mundo) {
        const page = this.page;
        const elementoMundo = 'li[data-worldname="' + mundo + '"]';
        const botaoMundo = await page.$(elementoMundo);
        if (botaoMundo) {
            await botaoMundo.click();
            await page.waitForNavigation();
            //console.log(CoresConsole.AMARELO('[GREPOLIS-PUPPETEER]'), CoresConsole.VERMELHO('-'), CoresConsole.BRANCO('Navegação completa'));
            await page.waitForTimeout(3000);
            return true;
        }
        else {
            return false;
        }
    }
    obterPage() {
        return this.page;
    }
}

module.exports = GrepolisPuppeteer;
