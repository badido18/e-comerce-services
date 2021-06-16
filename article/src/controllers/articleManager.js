const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Article = getRepository('Article')

const deleteArticle = async (req, res) => {
    const { id } = req.params;
    Article.delete({ id: id })
    .then(ar => {
        res.send(success("Article supprime avec succes", ar))
    })
    .catch(err => {
        res.send(error(err.message));
    })
    
}

const getArticle = async (req, res) => {
    const { id } = req.params;
    Article.findOne({ id : id })
    .then(ar  => {
            if (!!ar)
                res.send(success("l'article:",ar))
            else
                PromiseRejectionEvent.call()
    })
    .catch(err => {
        res.send(error("Article or User doesn't exist"))
    })
}


const getArticles= async (req, res) => {
    const { page } = req.params.page || 0 ;
    Article.find({
        skip: page,
        take : 10
    })
    .then( ar => {
            res.send(success("Liste des articles",ar))
    })
    .catch(err => {
        res.send(error("Unexpected error"))
    })
}

const addArticle = async (req, res) => {
    const { title , description, imageurl , type, clothes , prix , quantity } = req.body;
    Article.insert({ title , description, imageurl , type, clothes , prix , quantity } )
    .then(ar => {
            res.send(success("Added Succesfully"))
    })
    .catch(err => {
        res.send(error("Unexpected Error occured : " + err.toString()))
    })
}

module.exports = { getArticle , addArticle , deleteArticle , getArticles} 
