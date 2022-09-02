const pup = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')

const {
    validCheck
} = require('./checkers/checker')

pup.use(Stealth())

let browser

module.exports = (number, type) => {
    return new Promise(async (res, rej) => {
        try {
            if (!browser) {
                browser = await pup.launch({
                    //args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    headless: false,
                    //product: 'firefox'
                })
            }

            if (type == 'array') {
                let payload = number.map(item => {
                    return new Promise(async (res, rej) => {
                        try {
                            const page = await browser.newPage()
                            await page.goto('https://www.whitepages.com/phone/' + item, {
                                waitUntil: 'networkidle2'
                            })

                            const validity = await validCheck(page, item)

                            await page.close()
                            res({
                                phone: item,
                                valid: validity[0],
                                type: validity[1]
                            })
                        } catch (e) {
                            console.log(e)
                            rej('Phone number is invalid ' + item)
                        }
                    })
                })
                Promise.allSettled(payload).then(values => {
                    //browser.close()
                    console.log(values)
                    res(values)
                })
            } else {
                rej()
            }

        } catch (e) {
            rej(e)
        }

    })
}