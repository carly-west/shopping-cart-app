const express = require('express');
const router = express.Router();

const contactsController = require('../controllers');

router.get('/', contactsController.viewAllListItems);

router.post('/', contactsController.addListItem);

router.put('/:id', contactsController.updateListItem);

router.delete('/:id', contactsController.deleteListItem);

module.exports = router;
