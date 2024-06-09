const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { makeUser } = require('../utils');

exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            throw new Error("Name is required.")
        }
        if (!email) {
            throw new Error("Email is required.")
        }
        if (!password) {
            throw new Error("Password is required.")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        })

        return res.status(201).json({
            success: true,
            message: "SignUp successfull.",
            user: {
                name,
                email
            }
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            throw new Error("Email is required.")
        }
        if (!password) {
            throw new Error("Password is required.")
        }

        const user = await User.findOne({
            email
        }).lean() //lean is used to get simple (POJO) object. By default mongoose returns heavy object.

        if (!user) {
            throw new Error("Invalid credentials.")
        }
        if (!(bcrypt.compareSync(password, user.password))) {
            throw new Error("Invalid credentials.")
        }

        //Create JWT Token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        return res.status(200).json({
            success: true,
            message: "SignIn Successfull",
            token,
            user: makeUser(user)
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}