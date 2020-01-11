const { Builder, By, Key, logging, until, WebElement } = require('selenium-webdriver');
const axios = require('axios')

//logging.installConsoleHandler();
//logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);

let copy = async () => {
    let driver = new Builder().forBrowser('chrome').build();

    try {

        await driver.get('https://br.investing.com/indices/ibovespa-futures-technical');
        await driver.sleep(10000)

        while (true) {

            //COMPRA
            let sinalCompra1min = false
            let sinalCompra5min = false
            let sinalCompra15min = false
            let sinalCompra30min = false

            //VENDA
            let sinalVenda1min = false
            let sinalVenda5min = false
            let sinalVenda15min = false
            let sinalVenda30min = false


            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[1]/a')).click()
            await driver.sleep(3000)
            let elements1min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let element of elements1min) {
                text = await element.getText();
                if (text === 'VENDA FORTE') {
                    sinalVenda1min = true
                }
                if (text === 'COMPRA FORTE') {
                    sinalCompra1min = true
                }
                console.log('1 MIN: ' + text);
            }
            console.log('\n')

            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[2]/a')).click()
            await driver.sleep(3000)
            let elements5min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let hora of elements5min) {
                text = await hora.getText();
                if (text === 'VENDA FORTE') {
                    sinalVenda5min = true
                }
                if (text === 'COMPRA FORTE') {
                    sinalCompra5min = true
                }
                console.log('5 MIN: ' + text);
            }
            console.log('\n')

            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[3]/a')).click()
            await driver.sleep(3000)
            let elements15min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let hora of elements15min) {
                text = await hora.getText();
                if (text === 'VENDA FORTE') {
                    sinalVenda15min = true
                }
                if (text === 'COMPRA FORTE') {
                    sinalCompra15min = true
                }
                console.log('15 MIN: ' + text);
            }
            console.log('\n')

            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[4]/a')).click()
            await driver.sleep(3000)
            let elements30min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let hora of elements30min) {
                text = await hora.getText();
                if (text === 'VENDA FORTE') {
                    sinalVenda30min = true
                }
                if (text === 'COMPRA FORTE') {
                    sinalCompra30min = true
                }
                console.log('30 MIN: ' + text);
            }
            console.log('\n')

            await driver.sleep(2000)
            if (sinalCompra1min === true && sinalCompra5min === true
                && sinalCompra15min === true && sinalCompra30min === true) {
                axios.put('https://copysignal-4e7c8.firebaseio.com/sinais.json', { sinal: 'compra' }).then(resp => {
                    console.log('Sinal de compra enviado!')
                })
            } else if (sinalVenda1min === true && sinalVenda5min === true
                && sinalVenda15min === true && sinalVenda30min === true) {
                axios.put('https://copysignal-4e7c8.firebaseio.com/sinais.json', { sinal: 'venda' }).then(resp => {
                    console.log('Sinal de venda enviado!')
                })
            } else {
                axios.put('https://copysignal-4e7c8.firebaseio.com/sinais.json', { sinal: 'neutro' }).then(resp => {
                    console.log('Nenhum sinal! Operação neutra!')
                    console.log('\n')
                })
            }
        }

    } catch (error) {
        handleError(error, driver)
    }
}

let handleError = (err, driver) => {
    console.error(err)
    driver.quit()
}


copy()

