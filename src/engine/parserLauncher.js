const { PageEmittedEvents } = require("puppeteer")

module.exports = (pup) => {
    return new Promise(async (res, rej) => {
        try {
            const browser = await pup.launch({
                //headless: false,
                //product: 'firefox'
            })
            const page = await browser.newPage()
            await page.goto('https://www.whitepages.com/phone/')
            res([page, browser])
        } catch (e) {
            rej(e)
        }

    })
}