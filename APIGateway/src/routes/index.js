const { Router } = require("express")
const proxy = require("express-http-proxy")

const { services: { auth, panier, article } } = require("../constants")

const router = Router()

router.use('/user', proxy(auth))
router.use('/panier', proxy(panier))
router.use('/article', proxy(article))

module.exports = router