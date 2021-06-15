const { Router } = require("express")
const { getClients, getClient, postClient, putClient, deleteClient, signIn } = require('../controllers/client')

const router = Router()

router.get('/', getClients)
router.get('/:id', getClient)
router.post('/', postClient)
router.post('/signin', signIn)
router.delete('/:id', deleteClient)
router.put('/:id', putClient)

module.exports = router;