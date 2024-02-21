const express = require('express');
const vendorRouter = express.Router();
const {VendorModel} = require('../model/vendor.model');
const cors=require("cors")
// Create a vendor
vendorRouter.use(cors())


vendorRouter.post('/add', async (req, res) => {
  try {
    const vendor = new VendorModel(req.body);
    await vendor.save();
    res.status(201).send(vendor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all vendors
vendorRouter.get('/', async (req, res) => {
  try {
    const vendors = await VendorModel.find();
    res.status(200).send(vendors);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a vendor by ID
vendorRouter.get('/:id', async (req, res) => {
  try {
    const vendor = await VendorModel.findById(req.params.id);
    if (!vendor) {
      return res.status(404).send({ message: 'Vendor not found' });
    }
    res.status(200).send(vendor);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a vendor by ID
vendorRouter.put('/update/:id', async (req, res) => {
  try {
    const vendor = await VendorModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor) {
      return res.status(404).send({ message: 'Vendor not found' });
    }
    res.status(200).send(vendor);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a vendor by ID
vendorRouter.delete('/delete/:id', async (req, res) => {
  try {
    const vendor = await VendorModel.findByIdAndDelete(req.params.id);
    if (!vendor) {
      return res.status(404).send({ message: 'Vendor not found' });
    }
    res.status(200).send({ message: 'Vendor deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {vendorRouter};
