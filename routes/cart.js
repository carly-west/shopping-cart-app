const express = require("express");
const router = express.Router();

const contactsController = require("../controllers");

router.get("/", contactsController.viewAllListItems);

router.post("/", contactsController.addListItem);

module.exports = router;
