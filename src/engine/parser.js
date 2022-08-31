const {
    validCheck
} = require('./checkers/checker')

module.exports = (pup, number, type) => {
    return new Promise(async (res, rej) => {
        try {
            const browser = await pup.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                //headless: false,
                //product: 'firefox'
            })
            if (type == 'array') {
                let payload = number.map(item => {
                    return new Promise(async (res, rej) => {
                        const page = await browser.newPage()
                        await page.goto('https://www.whitepages.com/phone/' + item, {
                            waitUntil: 'networkidle2'
                        })
                
                        const validity = await validCheck(page, item)
                
                        res({
                            phone: item,
                            valid: validity[0],
                            type: validity[1]
                        })
                    })
                })
                Promise.all(payload).then(values => {
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