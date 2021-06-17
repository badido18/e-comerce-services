const { Router } = require("express")
const { getArticle , addArticle , deleteArticle , getArticles} = require('../controllers/articleManager')

const router = Router()

router.get('/page/:page', getArticles)
router.get('/all', getArticles)
router.post('/add', addArticle)
router.delete('/delete/:id', deleteArticle)
router.get('/:id', getArticle)


module.exports = router