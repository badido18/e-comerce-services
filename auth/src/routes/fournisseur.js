const { Router } = require("express")
const { getFournisseurs, getFournisseur, postFournisseur, putFournisseur, deleteFournisseur } = require('../controllers/fournisseur')

const router = Router()

router.get('/', getFournisseurs)
router.get('/:id', getFournisseur)
router.post('/', postFournisseur)
router.delete('/:id', deleteFournisseur)
router.put('/:id', putFournisseur)

module.exports = router;