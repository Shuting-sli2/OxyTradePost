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

// post API: send createdProduct info to createProductAction
productRouter.post(
  '/post',
  expressAsyncHandler(async (req, res) => {
    // create a new instance of product
    //res.send(req.data); 
    if (!req.body){
      return res.status(400).send('Request body is missing');
    }
    const product = new Product({
      name: req.body.name,
      image: req.body.selectedFile,
      price: req.body.price,
      description: req.body.description,
    });
    
    // insert the product into the database
    const newProduct = await product.save(); //this.save() might not be working

    res.send({
      name: newProduct.name,
      image: newProduct.image,
      price: newProduct.price,
      description: newProduct.description,
    });
  }))

export default productRouter;