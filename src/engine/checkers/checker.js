const validCheck = (page) => {
    return new Promise(async (res, rej) => {
        try {
            const dat = await page.$eval('.Wgyp', el => el.outerHTML)

            const telType = await page.evaluate(d => {
                let el = document.querySelectorAll('span.raven--text')
                for(key in el){
                    console.log(key, el[key])
                    if(el[key]._prevClass == 'raven--text'){
                        return el[key].innerText.trim().toLowerCase()
                    }
                }
                return 'nodata'
            }) 

            console.log(dat.includes('phone-details-no-results'), dat.includes('phone-details-unpub'), dat.includes('phone-details-pub'))
            if (dat.includes('phone-details-no-results')) {
                res(['invalid', 'none'])
            } else if (dat.includes('phone-details-unpub')) {
                res(['valid', telType])
            } else if (dat.includes('phone-details-pub')) {
                res(['valid', telType])
            }
            else{
                rej('error')
            }

        } catch (e) {
            console.log(e)
            rej('error')
        }
    })

}

module.exports = {
    validCheck
}