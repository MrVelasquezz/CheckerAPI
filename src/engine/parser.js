const {
    validCheck
} = require('./checkers/checker')

module.exports = (pup, number) => {
    return new Promise(async (res, rej) => {
        try {
            const browser = await pup.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox']
                //headless: false,
                //product: 'firefox'
            })
            const page = await browser.newPage()
            await page.goto('https://www.whitepages.com/phone/'+number)

            const validity = await validCheck(page, number)
            
            await browser.close()

            res(validity)
        } catch (e) {
            rej(e)
        }

    })
}