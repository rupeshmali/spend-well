const User = require("../models/User")

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            users
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        return res.status(200).json({
            user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, {
            ...req.body,
        },
        {
            new: true,
        });

        return res.status(204).json({
            user,
            success: true
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteUSer = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}