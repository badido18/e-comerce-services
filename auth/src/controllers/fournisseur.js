const { getRepository } = require("typeorm")
const { error, success } = require("../lib/response")
const bcrypt = require('bcrypt')

const generateToken = require('../lib/generateToken')

const Fournisseur = getRepository('Fournisseur')

function getFournisseurs(req, res) {
    Fournisseur.find()
    .then(fournisseurs => {
        res.send(success("liste des fournisseurs", fournisseurs))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getFournisseur(req, res) {
    Fournisseur.find({ id: req.params.id })
    .then(fournisseur => {
        res.send(success("fournisseur of id " + req.params.id, fournisseur))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

async function postFournisseur(req, res) {
    const { nom, prenom, num_telephone, adresse, motDePasse } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(motDePasse, salt)
    
        const user = await Fournisseur.save({
            nom,
            prenom,
            num_telephone,
            adresse,
            motDePasse: password
        })

        const token = generateToken({ id: user.id })

        res.header("auth", token)
        res.send(success("user cree avec succes", user))
    } catch (err) {
        res.send(error(err.message));
    }
}

function deleteFournisseur(req, res) {
    Fournisseur.delete({ id: req.params.id })
    .then(fournisseurs => {
        res.send(success("fournisseur supprime avec succes", fournisseurs))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putFournisseur(req, res) {
    Fournisseur.update(req.body)
    .then(fournisseurs => {
        res.send(success("fournisseur modifie avec succes", fournisseurs))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function signIn(req, res) {
    const { num_telephone, motDePasse } = req.body;

    if (!num_telephone || !motDePasse) {
        res.status(400).send(error("invalid payload: " + JSON.stringify(req.body)))
    }

    Fournisseur.find({ num_telephone })
    .then(user => {
        if (user.length === 0) {
            res.send(error("incorrect num_tel."))
            return
        }

        const isMatch = bcrypt.compareSync(motDePasse, user[0].motDePasse)
        if (!isMatch) {
            res.send(error("incorrect password."))
        } else {
            const token = generateToken({ id: user.id })

            res.header("auth", token)
            res.send(success("login success"))
        }
    })
    .catch(err => {
        res.send(error("incorrect email"))
    })
}

module.exports = {
    getFournisseurs,
    getFournisseur,
    postFournisseur,
    deleteFournisseur,
    putFournisseur,
    signIn,
    //check
}