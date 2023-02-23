const express = require('express');
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

const contactsController = require('../controllers');

router.get('/', requiresAuth(), contactsController.viewAllListItems);

router.post('/', requiresAuth(), contactsController.addListItem);

router.put('/:id', requiresAuth(), contactsController.updateListItem);

router.delete('/:id', requiresAuth(), contactsController.deleteListItem);

module.exports = router;
