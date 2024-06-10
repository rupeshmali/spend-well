const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verifyUser = async (req, res, next) => {
    try {
        const authorization = req.headers["authorization"]
        if (!authorization) {
            throw new Error("Invalid Token")
        }
        const token = authorization.split(' ')[1];
        //Check integrity
        const { id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(id).lean()
        if (!user) {
            throw new Error("Invalid Token")
        }
        req.currentUser = user
        next()
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        })
    }
}