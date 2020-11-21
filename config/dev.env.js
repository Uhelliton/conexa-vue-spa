'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = {
  NODE_ENV: '"development"',
  API_URL: '"http://desafio.conexasaude.com.br/api"'
}
