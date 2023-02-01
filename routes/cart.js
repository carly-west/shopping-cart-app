const express = require("express");
const router = express.Router();

const contactsController = require("../controllers");

router.get("/", contactsController.viewAllCartItems);

router.post("/", contactsController.addCartItem);

module.exports = router;
