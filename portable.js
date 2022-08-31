const fs = require('fs')
const readline = require('readline')

const pup = require('puppeteer-extra')
const Stealth = require('puppeteer-extra-plugin-stealth')
require('dotenv').config()

pup.use(Stealth())

const parser = require('./src/engine/parser')

