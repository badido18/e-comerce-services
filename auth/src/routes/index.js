const Router = require("express").Router

const admin = require("./admin")
const client = require("./client")
const fournisseur = require("./fournisseur")

const router = Router()

router.use("/admin", admin)
router.use("/client", client)
router.use("/fournisseur", fournisseur)

module.exports = router