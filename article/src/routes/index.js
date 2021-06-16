const { Router } = require("express")
const { getArticle , addArticle , deleteArticle , getArticles} = require('../controllers/articleManager')

const router = Router()

router.get('/articles/:page', getArticles)
router.get('/articles', getArticles)
router.post('/article/add', addArticle)
router.delete('/article/delete/:id', deleteArticle)
router.get('/article/:id', getArticle)


module.exports = router