const tmsg = require('../tmsg')
const validCheck = (page, phone) => {
    return new Promise(async (res, rej) => {
        try {
            const dat = await page.$eval('.Wgyp', el => el.outerHTML)
            let telCheck = 'err'

            try{
                telCheck = dat.split(/<span +[A-Za-z0-9\-_\/]*="raven--text" +[A-Za-z0-9\-_\/=" ]*>/gm)[1].split('</span>')[0].trim().toLowerCase()
            }
            catch(e){
                //console.log(e)
            }
            console.log(`${tmsg()}`, dat.includes('phone-details-no-results'), dat.includes('phone-details-unpub'), dat.includes('phone-details-pub'), telCheck)
            if (dat.includes('phone-details-no-results')) {
                res(['invalid', 'none'])
            } else if (dat.includes('phone-details-unpub')) {
                res(['valid', telCheck])
            } else if (dat.includes('phone-details-pub')) {
                res(['valid', telCheck])
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