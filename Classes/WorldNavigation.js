const GrepolisPuppeteer = require("./GrepolisPuppeteer");


class WorldNavigation extends GrepolisPuppeteer {

    page = null;
    // Definir cores
    reset = "\x1b[0m";
    red = "\x1b[31m";
    green = "\x1b[32m";
    yellow = "\x1b[33m";
    blue = "\x1b[34m";
    white = "\x1b[37m"

    async descobrirCidadesJogador(funcionalidade) {
        const page = this.page;



        const botaoCidades = await page.waitForSelector('.town_name_area .town_groups_dropdown.btn_toggle_town_groups_menu');
        await botaoCidades.click();
        await page.waitForTimeout(1500);

        //console.log(this.yellow + '[WORLD-NAV]' + this.red + '-' + this.white + ' Clicado no seletor de cidades' + this.reset)



        //Extraindo informações das cidades existentes
        await page.waitForSelector('.item.town_group_town');
        const cidadesEncontradas = await page.$$eval('.item.town_group_town', (divs) => {
            return divs.map((div) => {
                const name = div.querySelector('.town_name').textContent;
                const townId = div.getAttribute('data-townid');
                return { name, townId };
            });
        });
        //console.log(this.yellow + '[WORLD-NAV]' + this.white + '-' + this.white + ' Cidades encontradas', cidadesEncontradas);


        if (funcionalidade == 'inicial') {

            await botaoCidades.click();
            await page.waitForTimeout(1500);
            return cidadesEncontradas;
        }
        if (funcionalidade == 'selecionarCidade') {

            await page.waitForTimeout(1500);
            //console.log(this.yellow + '[WORLD-NAV]' + this.white + '-' + this.white + ' Retornando para selecionarCidade' + this.reset)
            return cidadesEncontradas;
        }

    }

    async atualizarPage(pageRecebido) {
        this.page = pageRecebido;
    }

    async visaoIlha() {
        const page = this.page;
        try {
            //Seleciona o botao de visao da ilha e clica
            //console.log(this.yellow + '[WORLD-NAV]' + this.white + '-' + this.white + ' Procurando por botão de ilha' + this.reset);

            const botaoVisaoIlha = await page.waitForSelector('.option.island_view.circle_button.js-option .pointer');
            await botaoVisaoIlha.click();
            await page.waitForTimeout(1500);

            //await console.log(this.yellow + '[WORLD-NAV]' + this.white + '-' + this.white + ' Visão de ilha ativada com sucesso' + this.reset);
            await page.waitForTimeout(1500);
            await page.setViewport( { width: 1360, height: 768, deviceScaleFactor: 0.8});
        }
        catch (error) {
            //console.log(this.yellow + '[WORLD-NAV]' + this.white + '-' + this.white + ' Não foi encontrado o botão de visão da ilha' + this.reset);
        }

    }

    async selecionarCidade(cidadeSelecionada) {
        const page = this.page;

        try {
            const cidadesExistentes = await this.descobrirCidadesJogador('selecionarCidade');

            //Verifica se a cidade a ser selecionada não é aprimeira da lista
            //Se ela não for ele seleciona a cidade correta
            if (cidadeSelecionada != cidadesExistentes[0].name) {
                for (const cidade of cidadesExistentes) {
                    if (cidadeSelecionada === cidade.name) {
                        const selector = `.item.town_group_town[name="${cidade.name}"], .item.town_group_town[data-townid="${cidade.townId}"]`;
                        await page.waitForSelector(selector);
                        const elementoCidade = await page.$(selector);
                        await elementoCidade.click();

                        //console.log(this.yellow + '[WORLD-NAV]' + this.white + '-' + this.white + ' Cidade selecionada:', cidade.name + ' ' + this.reset);
                        await page.waitForTimeout(1000);
                        break; // Interrompe o loop após encontrar a cidade desejada
                    }
                }
            } else {
                const botaoCidades = await page.waitForSelector('.town_name_area .town_groups_dropdown.btn_toggle_town_groups_menu');
                await botaoCidades.click();
                await page.waitForTimeout(1500);
                return;
            }

        } catch (error) {
            console.error(error);
        }
    }

    async irParaCidadeSelecionada() {
        const page = this.page;

        const btnCidadeAtual = await page.waitForSelector('.btn_jump_to_town.circle_button.jump_to_town .icon.js-caption');
        await btnCidadeAtual.click();
        //console.log(this.yellow + '[WORLD-NAV]' + this.white + '-' + this.white + ' Indo para o local da cidade selecionada' + this.reset);
        await page.waitForTimeout(1500);
    }

    async esperarLoaderAjax() {
        const page = this.page;

        const loaderAjax = await page.$('#ajax_loader'); // Adicionar await aqui
        await page.waitForFunction(
            (loaderAjax, valorDesejado) => {
                const elementoVisibilidade = getComputedStyle(loaderAjax).visibility;
                return elementoVisibilidade === valorDesejado;
            },
            {},
            loaderAjax,
            'hidden'
        );
    }


}
module.exports = WorldNavigation;