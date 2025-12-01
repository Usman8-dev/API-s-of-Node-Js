const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken')

const RegisterUser = async (req, res) => {

    try {
        let { Name, email, password } = req.body;

        // if use check
        let finduser = await userModel.findOne({ email: email });
        if (finduser) {
            return res.status(401).send('Your Account Already Register. Please login!!!');
        } else {

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) {
                        return res.send(err.message);
                    }
                    else {
                        let user = await userModel.create({
                            Name,
                            email,
                            password: hash,
                        })

                        let token = generateToken(user);
                        res.cookie('token', token);

                        // res.send(user);
                        return res.status(201).json({
                            success: true,
                            message: "Registration successful",
                            user: user,
                            token
                        });

                    }

                });
            });
        }
    }
    catch (err) {
        res.send(err.message);
    }
}


const LoginUser = async (req, res) => {
    let { email, password } = req.body;

    let finduserLogin = await userModel.findOne({ email: email });
    if (!finduserLogin) {
        return res.send('Email or Passwaor Incorrect');
    } else {
        bcrypt.compare(password, finduserLogin.password, function (err, result) {
            if (result) {
                let token = generateToken(finduserLogin);
                res.cookie('token', token);

                // res.send(finduserLogin);
                return res.status(201).json({
                    success: true,
                    message: "Login successful",
                    user: finduserLogin,
                });
            } else {
                res.send('Email or Passwaor Incorrect!!')
            }
        });
    }
}


const LogoutUser = async (req, res) => {
    res.cookie('token', "");
    return res.status(201).json({
        success: true,
        message: "You are Logout successful",
    });

}


module.exports = { RegisterUser, LoginUser, LogoutUser };