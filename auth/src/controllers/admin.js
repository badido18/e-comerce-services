const { getRepository } = require("typeorm")
const bcrypt = require('bcrypt')

const Admin = getRepository('Admin')

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
            console.log(res)
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
    Admin.update(req.body)
    .then(admins => {
        res.send(success("admin modifie avec succes", admins))
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

    Admin.find({ Num_telephone })
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
    getAdmins,
    getAdmin,
    postAdmin,
    deleteAdmin,
    putAdmin
}