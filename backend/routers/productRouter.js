import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    /*
    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({ ...sellerFilter });
    */
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

// create a post API: insert a product instance into the database
productRouter.post(
  '/',
  expressAsyncHandler(async (req, res) => {
    // create a new instance of product
    if (!req.body){
      return res.status(400).send('Request body is missing');
    }
    console.log(req.body);
    const product = new Product({
      name: req.body.name,
      imageUrl: req.body.imageUrl, 
      price: req.body.price,
      description: req.body.description,
      seller: req.body.userid
    });
    // insert the product into the database
    const newProduct = await product.save(); //this.save() might not be working
    res.send({
      name: newProduct.name,
      imageUrl: newProduct.imageUrl,
      price: newProduct.price,
      description: newProduct.description,
      seller: newProduct.seller
    });
  }))

export default productRouter;