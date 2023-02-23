const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const userController = require('../controllers');

router.post('/', requiresAuth(), userController.addUser);

router.delete('/:id', requiresAuth(), userController.deleteUser);

module.exports = router;
