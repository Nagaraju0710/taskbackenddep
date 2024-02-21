const express = require('express');
const productRouter = express.Router();
const { auth } = require('../middleware/auth.middleware')
const {ProductModel} = require('../model/product.model');
const cors=require("cors")

productRouter.use(cors())


// Create a product
// productRouter.use(auth)

productRouter.post('/add', async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all products
productRouter.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a product by ID
productRouter.get('/:id', async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a product by ID
productRouter.put('/update/:id', async (req, res) => {
  const productId = req.params.id; // Extract the product ID from the request parameters
  const updates = req.body;

  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(productId, updates, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a product by ID
productRouter.delete('/delete/:id', async (req, res) => {
  try {
    const product = await ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {productRouter};
