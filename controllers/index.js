const mongodb = require("../db/connect");
const client = require("mongodb").ObjectId;

const viewAllCartItems = async (req, res, next) => {
  const result = await mongodb.getDb().db("shopping").collection("contacts").find();
  result.toArray().then((lists) => {
    res.status(200).json(lists);
  });
};

const addCartItem = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb.getDb().db("sample_data").collection("contacts").insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the contact.");
  }
};

module.exports = {
  viewAllCartItems,
  addCartItem,
};
