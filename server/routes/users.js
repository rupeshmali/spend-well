const express = require('express');
const { getUsers, getUser, updateUser, deleteUSer } = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUSer);

module.exports = router;