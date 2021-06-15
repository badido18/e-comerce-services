const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Panier = getRepository('Panier')


const addArticlePanier = async (req, res) => {
    const { userid } = req.params.userid
    const { articleid } = req.body
    Panier.findOne({userid:userid})
    .then (res => {
        let newarticles = res.articles.push(articleid) ;
        Panier.update({userid : userid},{articles : newarticles})
        .then ( panier => res.send(success("Article added to Panier succesfully", panier)))
        .catch (err => res.send(error(err.message)) )
    })
    .catch (res =>res.send(error(err.message)))      
}

const deleteArticlePanier = async (req, res) => {
    const { userid } = req.params.userid
    const { articleid } = req.body
    Panier.findOne({userid:userid})
    .then (res => {
        let newarticles = res.articles (articleid) ;
        var index = res.articles.indexOf(articleid);
        if (index > -1) {
          newarticles.splice(index, 1);
        }
        Panier.update({userid : userid},{articles : newarticles})
        .then ( panier => res.send(success("Article deleted from Panier succesfully", panier)))
        .catch (err => res.send(error(err.message)) )
    })
    .catch (res =>res.send(error(err.message)))      
}

const verifExistUser= async id => {
    return true
}


const deletePanier = async (req, res) => {
    const { userid } = req.body;
    var userExists = await verifExistUser(userid) ;
    if (!userid || !userExists) {
        res.status(400).send(error("invalid userId : " + JSON.stringify(req.body)))
    }
    else {
        Panier.delete({ userid: userid })
        .then(Paniers => {
            res.send(success("Panier supprime avec succes", Paniers))
        })
        .catch(err => {
            res.send(error(err.message));
        })
    }
}

const getPanier = async (req, res) => {
    const { userid } = req.params.userid;

    Panier.findOne({ userid : userid })
    .then(panier => {
            res.send(success(panier))
    })
    .catch(err => {
        res.send(error("Panier or User doesn't exist"))
    })
}

const addPanier = async (req, res) => {
    const { userid , articles } = req.body;
    var userExists = await verifExistUser(userid) ;
    if (!userid || !userExists) {
        res.status(400).send(error("invalid userId : " + JSON.stringify(req.body)))
    }
    else {
        Panier.add({ userid : userid , articles : articles })
        .then(panier => {
                res.send(success("Added Succesfully"))
        })
        .catch(err => {
            res.send(error("Unexpected Error occured : " + err.toString()))
        })
    }
}

module.exports = { getPanier , addArticlePanier , deleteArticlePanier , deletePanier ,addPanier}
