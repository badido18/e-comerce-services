const { Router } = require("express")
const { getFournisseurs, getFournisseur, postFournisseur, putFournisseur, deleteFournisseur, signIn } = require('../controllers/fournisseur')

const router = Router()

router.get('/', getFournisseurs)
router.get('/:id', getFournisseur)
router.post('/', postFournisseur)
router.post('/signin', signIn)
router.delete('/:id', deleteFournisseur)
router.put('/:id', putFournisseur)

module.exports = router;