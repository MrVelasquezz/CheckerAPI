const pup = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')
const express = require('express')
require('dotenv').config()

pup.use(Stealth())

const parser = require('./src/engine/parser')

const app = express()

app.use(express.json())

app.post('/check', async (req, res) => {
    if (req.body.phone) {
        const tel = req.body.phone.trim()
        if (tel.startsWith('+') && tel.length == 12) {
            try {
                const result = await parser(pup, tel)
                res.json({
                    phone: req.body.phone,
                    valid: result
                }).end()

            } catch (e) {
                console.log(e)
                res.json({
                    status: 'error'
                }).end()
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