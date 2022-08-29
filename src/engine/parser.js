const {
    inputCheck,
    buttonCheck,
    validCheck
} = require('./checkers/checker')

module.exports = (page, number) => {
    return new Promise(async (res, rej) => {
        try {
            await inputCheck(page)
            await page.waitForTimeout(1000)
            await page.type('#phone', number, {
                delay: 20
            })

            const btnPos = await buttonCheck(page)
            await page.waitForTimeout(5000)
            await page.keyboard.press('Enter')

            await page.waitForTimeout(3000)

            const validity = await validCheck(page, number)

            res(validity)

        } catch (e) {
            console.log(e)
            rej()
        }
    })

}