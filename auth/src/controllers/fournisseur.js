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
    const { NomFournisseur, PrenomFournisseur, Num_telephone, Adresse, MotDePasse } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(MotDePasse, salt)
    
        const fournisseur = Fournisseur.create({
            NomFournisseur,
            PrenomFournisseur,
            Num_telephone,
            Adresse,
            MotDePasse: password
        })
        const user = await Fournisseur.save(fournisseur)

        const token = generateToken(u)

        res.headers.auth = token
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
    const { Num_telephone, MotDePasse } = req.body;

    if (!Num_telephone || !MotDePasse) {
        res.status(400).send(error("invalid payload: " + JSON.stringify(req.body)))
    }

    Fournisseur.find({ Num_telephone })
    .then(user => {
        const isMatch = bcrypt.compareSync(MotDePasse, user.MotDePasse)
        if (!isMatch) {
            res.send(error("incorrect password."))
        } else {
            const token = generateToken(u)

            res.headers.auth = token
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