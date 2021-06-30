const { getRepository } = require("typeorm")
const bcrypt = require('bcrypt')

const generateToken = require('../lib/generateToken')
const { error, success } = require("../lib/response")

const Client = getRepository('Client')

function getClients(req, res) {
    Client.find()
    .then(clients => {
        res.send(success("liste des clients", clients))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getClient(req, res) {
    Client.find({ id: req.params.id })
    .then(client => {
        res.send(success("client of id " + req.params.id, client))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

async function postClient(req, res) {
    const { nom, prenom, num_telephone, adresse, motDePasse } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(motDePasse, salt)
    
        const user = await Client.save({
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

function deleteClient(req, res) {
    Client.delete({ id: req.params.id })
    .then(clients => {
        res.send(success("client supprime avec succes", clients))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putClient(req, res) {
    Client.update(req.body)
    .then(clients => {
        res.send(success("client modifie avec succes", clients))
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

    Client.find({ num_telephone })
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
            res.send(success("login success",{token : token}))
        }
    })
    .catch(err => {
        res.send(error("incorrect email"))
    })
}

module.exports = {
    getClients,
    getClient,
    postClient,
    deleteClient,
    putClient,
    signIn
}