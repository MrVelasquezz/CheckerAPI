const validCheck = (page) => {
    return new Promise(async (res, rej) => {
        try {
            const dat = await page.$eval('.Wgyp', el => el.outerHTML)
            console.log(dat.includes('phone-details-no-results'), dat.includes('phone-details-unpub'), dat.includes('phone-details-pub'))
            if (dat.includes('phone-details-no-results')) {
                res('invalid')
            } else if (dat.includes('phone-details-unpub')) {
                res('valid')
            } else if (dat.includes('phone-details-pub')) {
                res('valid')
            }
            else{
                rej('error')
            }

        } catch (e) {
            rej('error')
        }
    })

}

module.exports = {
    validCheck
}