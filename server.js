const pup = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')
const express = require('express')
require('dotenv').config()

pup.use(Stealth())

const parser = require('./src/engine/parser')
const tmsg = require('./src/engine/tmsg')

const app = express()

app.use(express.json())

app.post('/check', async (req, res) => {
    if (req.body.phone) {
        if(Array.isArray(req.body.phone) && req.body.phone.length > 0) {
            const tel_arr = req.body.phone
            try {
                const result = await parser(pup, tel_arr, 'array')
                console.log(tmsg(), 'Response sent')
                res.json(result).end()

            } catch (e) {
                console.log(e)
                res.json({
                    status: 'error',
                    description: 'Server error'
                }).end()
            }
        }
        else {
            res.json({
                status: 'error',
                description: 'Req is not array'
            }).end()
        }
    } else {
        res.json({
            status: 'error',
            description: 'Invalid request'
        }).end()
    }
})

app.listen(process.env.PORT, () => console.log('Server is running on port ' + process.env.PORT))