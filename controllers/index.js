const mongodb = require('../db/connect');
const client = require('mongodb').ObjectId;
const valid = require('../helper');

const viewAllListItems = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db('shopping_list').collection('list_data').find();
    result.toArray().then((lists) => {
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

const addListItem = async (req, res) => {
  try {
    const item = {
      userId: req.body.userId,
      name: req.body.name,
      price: req.body.price,
      unit: req.body.unit,
      quantity: req.body.quantity,
      category: req.body.category,
      store: req.body.store,
      notes: req.body.notes,
    };

    const valid_response = valid.validateItem(item);
    if (valid_response.error) {
      res.status(422).json(valid_response.error.message);
      return;
    }
    const response = await mongodb.getDb().db('shopping_list').collection('list_data').insertOne(item);
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateListItem = async (req, res, next) => {
  try {
    const userId = new client(req.params.id);
    const item = {
      userId: req.body.userId,
      name: req.body.name,
      price: req.body.price,
      unit: req.body.unit,
      quantity: req.body.quantity,
      category: req.body.category,
      store: req.body.store,
      notes: req.body.notes,
    };

    const valid_response = valid.validateItem(item);
    if (valid_response.error) {
      res.status(422).json(valid_response.error.message);
      return;
    }

    const response = await mongodb.getDb().db('shopping_list').collection('list_data').replaceOne({ _id: userId }, item);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send('Status: 204 OK');
    }
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while creating the contact.');
  }
};

const deleteListItem = async (req, res, next) => {
  try {
    const userId = new client(req.params.id);

    await mongodb.getDb().db('shopping_list').collection('list_data').deleteOne({ _id: userId });

    res.status(200).send('Status: 200 OK');
  } catch (error) {
    res.status(500).json(error.message || 'Some error occurred while deleting the item.');
  }
};

module.exports = {
  viewAllListItems,
  addListItem,
  updateListItem,
  deleteListItem,
};
