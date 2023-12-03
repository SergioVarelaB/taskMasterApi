// async function test

const mongoose = require("mongoose");
const User = require('../../Models/User/user.model').User


async function create_user(req, res) {
    const user = new User({
        email: req.body.email,
        name: req.body.name,
    });
    user.save().then(()=>{
            res.status(200).json({"message":"Se añadio el usuario"});
        }).catch((err)=>{
            console.log(err);
        })
}

module.exports = {
    create_user,
}