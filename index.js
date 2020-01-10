const { Builder, By, Key, logging, until, WebElement } = require('selenium-webdriver');

//logging.installConsoleHandler();
//logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);

let copy = async () => {
    let driver = new Builder().forBrowser('chrome').build();

    try {

        //await driver.get('https://br.investing.com/indices/ibovespa-futures-technical')

        /*await driver.getTitle().then((title) => {
            console.log('The title is: ' + title)
        })
*/
        //console.log('\n')

        await driver.get('https://br.investing.com/indices/ibovespa-futures-technical');
        await driver.sleep(60000)

        while (true) {
            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[1]/a')).click()
            await driver.sleep(3000)
            let elements1min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let element of elements1min) {
                text = await element.getText();
                console.log('1 MIN: ' + text);
            }
            console.log('\n')
            

            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[2]/a')).click()
            await driver.sleep(3000)
            let elements5min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let hora of elements5min) {
                text = await hora.getText();
                console.log('5 MIN: ' + text);
            }
            console.log('\n')

            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[3]/a')).click()
            await driver.sleep(3000)
            let elements15min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let hora of elements15min) {
                text = await hora.getText();
                console.log('15 MIN: ' + text);
            }
            console.log('\n')

            await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[4]/a')).click()
            await driver.sleep(3000)
            let elements30min = await driver.findElements({ css: '#techStudiesInnerWrap > div.summary > span' });
            for (let hora of elements30min) {
                text = await hora.getText();
                console.log('30 MIN: ' + text);
            }
            console.log('\n')
        }


        //return driver.quit();

        //1 min
        //await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[1]')).click()

        /*console.log('> Signal em 1 Hora')
        driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[5]/a')).click()
        let elementText1min = driver.findElements(By.className('summary'))
        elementText1min.then(el =>{
            console.log(el)
        })*/

        //driver.wait(until.elementIsVisible(elementText1min), 4000)
        //Promise.resolve(elementText1min.getText()).then(text => { console.log('RESUMO: ' + text) })

        //let text1min = await driver.findElement(By.xpath('/html/body/div[5]/section/div[10]/div[1]/div[1]/span')).getText()
        //console.log(text1min)
        //await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[2]')).click()
        //await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[3]')).click()
        //await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[4]')).click()

    } catch (error) {
        handleError(error, driver)
    }
}

let handleError = (err, driver) => {
    console.error(err)
    driver.quit()
}


copy()

