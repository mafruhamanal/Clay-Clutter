const Ceramic = require("../models/ceramicModel");
const mongoose = require('mongoose');

// get all ceramic works
const getCeramics = async (req, res) => {
  const user_id = req.user._id
  const ceramics = await Ceramic.find({user_id}).sort({ createdAt: -1 });

  res.status(200).json(ceramics);
};

// get a single ceramic work
const getCeramic = async (req, res) => {
  const { id } = req.params;

  //before we find by id, validate the id

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ceramic found" });
  }
  const ceramic = await Ceramic.findById(id);

  if (!ceramic) {
    return res.status(404).json({ error: "No such ceramic found" });
  }

  res.status(200).json(ceramic);
};

// create new ceramic log
const createCeramic = async (req, res) => {
  const { title, dimensions, weight } = req.body;
  // add doc to db

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!dimensions) {
    emptyFields.push('dimensions')
  }
  if (!weight) {
    emptyFields.push('weight')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
  }

  try {
    const user_id = req.user._id
    const ceramic = await Ceramic.create({ title, dimensions, weight, user_id});
    res.status(200).json(ceramic);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a ceramic log
const deleteCeramic = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ceramic found" });
  }

  const ceramic = await Ceramic.findOneAndDelete({ _id: id });

  if (!ceramic) {
    return res.status(400).json({ error: "No such ceramic found" });
  }

  res.status(200).json(ceramic);
};

// update a ceramic log
const updateCeramic = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such ceramic found" });
  }

  const ceramic = await Ceramic.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!ceramic) {
    return res.status(400).json({ error: "No such ceramic found" });
  }

  res.status(200).json(ceramic);
};

module.exports = {
  createCeramic,
  getCeramic,
  getCeramics,
  deleteCeramic,
  updateCeramic,
};
