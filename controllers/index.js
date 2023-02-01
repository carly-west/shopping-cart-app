const mongodb = require("../db/connect");
const client = require("mongodb").ObjectId;

const viewAllCartItems = async (req, res, next) => {
  const result = await mongodb.getDb().db("shopping_list").collection("list_data").find();
  result.toArray().then((lists) => {
    res.status(200).json(lists);
  });
};

const addCartItem = async (req, res) => {
  const contact = {
    name: req.body.name,
    price: req.body.price,
    unit: req.body.unit,
    quantity: req.body.quantity,
    category: req.body.category,
    store: req.body.store,
    notes: req.body.notes,
  };
  const response = await mongodb.getDb().db("shopping_list").collection("list_data").insertOne(contact);
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
