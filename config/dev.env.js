'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"http://10.10.1.238:8080/app_mvc_war"'
  // BASE_API:'"http://localhost:8080/exchange-service"'
  // BASE_API:'"http://192.168.2.157:8080/service"'
})
