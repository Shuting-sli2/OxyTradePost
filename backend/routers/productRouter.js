import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/products',
  expressAsyncHandler(async (req, res) => {
    // create a new instance of product
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
    });
    // insert the product into the database
    const createdProduct = await product.save();
    res.send({ message: 'Product Created', product: createdProduct});
  }))

export default productRouter;