const config = require('./jest.config')

config.testMatch = ['**/?(*.)+(spec).ts']

console.log('RUNNING INTEGRATION TESTS')

module.exports = config