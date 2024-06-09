const express = require('express')

exports.verifyUser = (req, res, next) => {
    console.log("Came inside middleware.");
    next()
}