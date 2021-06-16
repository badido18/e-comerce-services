const { Router } = require("express")
const { getPanier , addArticlePanier , deleteArticlePanier , deletePanier , addPanier} = require('../controllers/panierManager')

const router = Router()

router.post('/panier/add', addPanier)
router.delete('/panier/delete', deletePanier)
router.get('/panier/:userid', getPanier)
router.put('/panier/:userid/add', addArticlePanier)
router.put('/panier/:userid/delete', deleteArticlePanier)

module.exports = router