const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Article = getRepository('Article')

const deleteArticle = async (req, res) => {
    const { id } = req.params.id;
    Article.delete({ id: id })
    .then(Articles => {
        res.send(success("Article supprime avec succes", Articles))
    })
    .catch(err => {
        res.send(error(err.message));
    })
    
}

const getArticle = async (req, res) => {
    const { id } = req.params.id;
    Article.findOne({ id : id })
    .then(Article => {
            res.send(success(Article))
    })
    .catch(err => {
        res.send(error("Article or User doesn't exist"))
    })
}


const getArticles= async (req, res) => {
    const { page } = req.params.page;
    Articles.offset(page).limit(10)
    .then(Articles => {
            res.send(success(Articles))
    })
    .catch(err => {
        res.send(error("Article or User doesn't exist"))
    })
}

const addArticle = async (req, res) => {
    const { article } = req.body;
    Article.add({ ...article })
    .then(Article => {
            res.send(success("Added Succesfully"))
    })
    .catch(err => {
        res.send(error("Unexpected Error occured : " + err.toString()))
    })
}

module.exports = { getArticle , addArticle , deleteArticle , getArticles} 
