const { getRepository } = require("typeorm")
const bcrypt = require('bcrypt')

const generateToken = require('../lib/generateToken')
const { error, success } = require("../lib/response")

const Admin = getRepository("admin")

function getAdmins(req, res) {
    Admin.find()
    .then(admins => {
        res.send(success("liste des admins", admins))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function getAdmin(req, res) {
    Admin.find({ id: req.params.id })
    .then(admin => {
        res.send(success("admin of id " + req.params.id, admin))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

async function postAdmin(req, res) {
    const { nom, prenom, num_telephone, adresse, motDePasse } = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const password = await bcrypt.hash(motDePasse, salt)

        getRepository('admin').save({
            nom,
            prenom,
            num_telephone,
            adresse,
            motDePasse: password
        })
        .then(admin => {
            const token = generateToken({ id: admin.id })
            
            res.header("auth", token)
            res.send(success("user cree avec succes", admin))
        })
        .catch(err => {
            res.send(error(err.message));
        })

    } catch (err) {
        console.log(err)
        res.send(error(err.message));
    }
}

function deleteAdmin(req, res) {
    Admin.delete({ id: req.params.id })
    .then(admins => {
        res.send(success("admin supprime avec succes", admins))
    })
    .catch(err => {
        res.send(error(err.message));
    })
}

function putAdmin(req, res) {
    Admin.update({ ...req.body, id: req.params.id })
    .then(admins => {
        res.send(success("admin modifie avec succes", admins))
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

    Admin.find({ num_telephone })
    .then(user => {
        if (user.length === 0) {
            res.send(error("no account found."))
            return
        }

        const isMatch = bcrypt.compareSync(motDePasse, user[0].motDePasse)
        if (!isMatch) {
            res.send(error("incorrect password."))
        } else {
            const token = generateToken({ id: user[0].id })

            res.header("auth", token)
            res.send(success("login success"))
        }
    })
    .catch(err => {
        console.log(err)
        res.send(error("incorrect num tel"))
    })
}

module.exports = {
    getAdmins,
    getAdmin,
    postAdmin,
    deleteAdmin,
    putAdmin,
    signIn
}