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
    const { nomClient, prenomClient, num_telephone, adresse, motDePasse } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(motDePasse, salt)
    
        const client = Client.create({
            nomClient,
            prenomClient,
            num_telephone,
            adresse,
            motDePasse: password
        })

        console.log(client)

        const user = await Client.save(client)

        const token = generateToken({ id: user.idClient })

        res.headers.auth = token
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
    const { Num_telephone, MotDePasse } = req.body;

    if (!Num_telephone || !MotDePasse) {
        res.status(400).send(error("invalid payload: " + JSON.stringify(req.body)))
    }

    Client.find({ Num_telephone })
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
    getClients,
    getClient,
    postClient,
    deleteClient,
    putClient,
    signIn
}