const express = require('express');
const vehicleRouter = express.Router();
const {VehicleModel} = require('../model/vehicle.model');
const cors=require("cors")

vehicleRouter.use(cors())
// Create a vehicle
vehicleRouter.post('/add', async (req, res) => {
  try {
    const vehicle = new VehicleModel(req.body);
    await vehicle.save();
    res.status(201).send(vehicle);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all vehicles
vehicleRouter.get('/', async (req, res) => {
  try {
    const vehicles = await VehicleModel.find();
    res.status(200).send(vehicles);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a vehicle by ID
vehicleRouter.get('/:id', async (req, res) => {
  try {
    const vehicle = await VehicleModel.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).send({ message: 'Vehicle not found' });
    }
    res.status(200).send(vehicle);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a vehicle by ID
vehicleRouter.put('/update/:id', async (req, res) => {
  try {
    const vehicle = await VehicleModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehicle) {
      return res.status(404).send({ message: 'Vehicle not found' });
    }
    res.status(200).send(vehicle);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a vehicle by ID
vehicleRouter.delete('/delete/:id', async (req, res) => {
  try {
    const vehicle = await VehicleModel.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).send({ message: 'Vehicle not found' });
    }
    res.status(200).send({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {vehicleRouter};
