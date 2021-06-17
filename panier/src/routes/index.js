const { Router } = require("express")
const { getPanier , addArticlePanier , deleteArticlePanier , deletePanier , addPanier} = require('../controllers/panierManager')

const router = Router()

router.post('/add', addPanier)
router.delete('/delete', deletePanier)
router.get('/:userid', getPanier)
router.put('/:userid/add', addArticlePanier)
router.put('/:userid/delete', deleteArticlePanier)

module.exports = router