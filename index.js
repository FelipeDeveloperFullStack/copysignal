const { Builder, By, Key, logging, until, WebElement } = require('selenium-webdriver');

//logging.installConsoleHandler();
//logging.getLogger('webdriver.http').setLevel(logging.Level.ALL);

let copy = async () => {
    let driver = new Builder().forBrowser('chrome').build();

    try {

        await driver.get('https://br.investing.com/indices/ibovespa-futures-technical')

        await driver.getTitle().then((title) => {
            console.log('The title is: ' + title)
        })

        console.log('\n')

        //1 min
        //await driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[1]')).click()

        setTimeout(() => {
            console.log('> Signal em 1 Hora')
            driver.findElement(By.xpath('/html/body/div[5]/section/div[8]/ul/li[5]/a')).click()
            let elementText1min = driver.findElement(By.xpath('/html/body/div[5]/section/div[10]/div[1]/div[1]/span'))
            driver.wait(until.elementIsVisible(elementText1min), 4000)
            Promise.resolve(elementText1min.getText()).then(text => { console.log('RESUMO: ' + text) })
        }, 5000)

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

