const pup = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')
const express = require('express')
require('dotenv').config()

pup.use(Stealth())

const parserL = require('./src/engine/parserLauncher')
const parserB = require('./src/engine/parser')

const app = express()

app.use(express.json())

app.post('/check', async (req, res) => {
    if (req.body.phone) {
        const tel = req.body.phone.trim()
        if (tel.startsWith('+') && tel.length == 12) {
            try {
                page = await parserL(pup)
            } catch (e) {
                console.log(e)
                res.json({
                    status: 'error'
                }).end()
            }
            if (page[0] && page[0] != undefined) {
                try {
                    const response = await parserB(page[0], req.body.phone)

                    res.json({
                        phone: req.body.phone,
                        valid: response
                    }).end()

                } catch (e) {
                    res.json({
                        status: 'error'
                    }).end()
                }
                try {
                    page[1].close()
                } catch (e) {
                    console.log(e)
                }
            }
        } else {
            res.json({
                status: 'error'
            }).end()
        }
    } else {
        res.json({
            status: 'error'
        }).end()
    }
})

app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT))