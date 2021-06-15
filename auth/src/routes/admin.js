const { Router } = require("express")
const { getAdmins, getAdmin, postAdmin, putAdmin, deleteAdmin, signIn } = require('../controllers/admin')

const router = Router()

router.get('/', getAdmins)
router.get('/:id', getAdmin)
router.post('/', postAdmin)
router.post('/signin', signIn)
router.delete('/:id', deleteAdmin)
router.put('/:id', putAdmin)

module.exports = router;