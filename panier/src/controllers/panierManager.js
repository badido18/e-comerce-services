const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")

const Panier = getRepository('Panier')


const addArticlePanier = async (req, res) => {
    const { userid } = req.params
    const { articleid } = req.body

    Panier.findOne({ userid : userid })
    .then( panier => {
        let newarticles = panier.articles ;
        if (!!newarticles[articleid] )
            newarticles[articleid]++ ;
        else
            newarticles[articleid] =1 ;
        updateArticlesPanier(userid,newarticles,res)
    })
    .catch(err => {
        res.send(error("Panier or User doesn't exist",err))
    })
}

const updateArticlesPanier = async (userid,newarticles,res) =>{
    Panier.update({userid : userid},{articles : newarticles})
    .then ( panier => res.send(success("Panier updated succesfully", panier)))
    .catch ( err => res.send(error(err.message)) )
}



const deleteArticlePanier = async (req, res) => {
    const { userid } = req.params
    const { articleid } = req.body

    Panier.findOne({userid:userid})
    .then (panier => {
        let newarticles = panier.articles ;
        if (!!newarticles[articleid] )
            newarticles[articleid]-- ;
            if (!newarticles[articleid])
                delete newarticles[articleid];
        else
            newarticles[articleid] =1 ;
        console.log()
        updateArticlesPanier(userid,newarticles,res)
    })
    .catch (err =>res.send(error(err.message)))      
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
    const { userid } = req.params;
    Panier.findOne({ userid : userid })
    .then( panier => {
            if (!!panier)
                res.send(success("le panier : " , panier))
            else
                PromiseRejectionEvent.call() 
    })
    .catch(err => {
        res.send(error("Panier or User doesn't exist",err))
    })
}

const addPanier = async (req, res) => {
    const { userid , articles } = req.body 
    var userExists = await verifExistUser(userid) ;
    if (!userid || !userExists) {
        res.status(400).send(error("invalid userId : " + JSON.stringify(req.body)))
    }
    else {
        Panier.insert({ userid : userid , articles : articles || {} })
        .then(panier => {
                res.send(success("Added Succesfully",panier))
        })
        .catch(err => {
            res.send(error("Unexpected Error occured : " + err.toString()))
        })
    }
}

module.exports = { getPanier , addArticlePanier , deleteArticlePanier , deletePanier ,addPanier}
