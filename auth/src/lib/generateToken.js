const jwt = require('jsonwebtoken')
const { secret } = require('../constants')

function generateToken({ id }) {
    return jwt.sign({id}, secret, {
        expiresIn: "7d"
    })
}

module.exports = generateToken