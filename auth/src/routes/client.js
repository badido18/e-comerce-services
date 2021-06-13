const { Router } = require("express")
const { getClients, getClient, postClient, putClient, deleteClient } = require('../controllers/client')

const router = Router()

router.get('/', getClients)
router.get('/:id', getClient)
router.post('/', postClient)
router.delete('/:id', deleteClient)
router.put('/:id', putClient)

module.exports = router;