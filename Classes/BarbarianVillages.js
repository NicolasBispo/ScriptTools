const GrepolisPuppeteer = require('./GrepolisPuppeteer');
const WorldNavigation = require('./WorldNavigation');

class BarbarianVillages extends GrepolisPuppeteer {

    page = null;

    reset = "\x1b[0m";
    red = "\x1b[31m";
    green = "\x1b[32m";
    yellow = "\x1b[33m";
    blue = "\x1b[34m";
    white = "\x1b[37m";

    async atualizarPage(pageRecebido) {
        this.page = pageRecebido;
    }


    async encontrarVilasBarbaras() {

        const page = this.page;

        const elementosEncontrados = await page.$$('.owned.farm_town.tile[data-same_island="true"]');

        const valoresDataId = await Promise.all(
            elementosEncontrados.map(async (elemento) => {
                const valorDataId = await elemento.evaluate((el) =>
                    el.getAttribute('data-id')
                );
                return valorDataId;
            })
        );
        return valoresDataId;
    }

    async coletarRecursosVilaBarbaras(tempoRecarga) {

        const page = this.page;

        const worldNav = new WorldNavigation();
        await worldNav.atualizarPage(page);
        await page.waitForTimeout(1000);

        const idAldeiasBarbarasDaIlha = await this.encontrarVilasBarbaras();
        let i = 1;

        let aldeiasEncontrar = [];

        idAldeiasBarbarasDaIlha.forEach((idAldeia) => {
            let ancoraAldeiraBarbara = '#farm_town_ALTERAR.owned.farm_town.tile[data-same_island="true"]';
            ancoraAldeiraBarbara = ancoraAldeiraBarbara.replace('ALTERAR', idAldeia);
            aldeiasEncontrar.push(ancoraAldeiraBarbara);
        })

        console.log(this.yellow + '[BARBARIAN]' + this.red + '-' + this.white + 'Elementos de aldeia encontrados e separados:' + this.reset, aldeiasEncontrar);

        for (const aldeiaSelecionada of aldeiasEncontrar) {
            await page.waitForTimeout(1500);
            const aldeia = await page.waitForSelector(aldeiaSelecionada)
            await aldeia.click();
            await page.waitForTimeout(1500);
            console.log(this.yellow + '[BARBARIAN]' + this.red + '-' + this.white + 'Abrindo a janela da', i + 'ª aldeia barbara' + this.reset);
            console.log(this.yellow + '[BARBARIAN]' + this.red + '-' + this.white + 'Elemento procurado:', + this.blue + aldeiaSelecionada)
            await page.waitForSelector('.action_card.resources_bpv'); // Aguarda a existência dos elementos .action_card.resources_bpv após o clique

            const cardsRecursos = await page.$$('.action_card.resources_bpv');
            for (const card of cardsRecursos) {
                const tempo = await card.$eval('.action_time', (element) => element.textContent);
                if (tempo === tempoRecarga) {

                    const btnClaimRecursos = await card.$('.btn_claim_resources');
                    await btnClaimRecursos.click();
                    console.log(this.yellow + '[BARBARIAN]' + this.red + '-' + this.white + 'Coletando recursos com o intervalo definido de:', tempoRecarga + this.reset);
                    await page.waitForTimeout(1500);
                    await worldNav.esperarLoaderAjax();

                    const botaoFecharJanela = await page.waitForSelector('.js-window-main-container.classic_window.farm_town .btn_wnd.close')
                    await botaoFecharJanela.click();
                    console.log(this.yellow + '[BARBARIAN]' + this.red + '-' + this.white + 'Clicado no botão de fechar a janela' + this.reset);
                    await page.waitForTimeout(1500);
                    await worldNav.esperarLoaderAjax();
                    
                }
            }
            i = i + 1;
        }
        const botaoNext = await page.waitForSelector('.btn_next_town.button_arrow.right');
        botaoNext.click();

    }



}

module.exports = BarbarianVillages;
