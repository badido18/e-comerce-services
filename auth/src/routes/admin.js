const { Router } = require("express")
const { getAdmins, getAdmin, postAdmin, putAdmin, deleteAdmin } = require('../controllers/admin')

const router = Router()

router.get('/', getAdmins)
router.get('/:id', getAdmin)
router.post('/', postAdmin)
router.delete('/:id', deleteAdmin)
router.put('/:id', putAdmin)

module.exports = router;