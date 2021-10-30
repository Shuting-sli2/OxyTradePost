import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    imageUrl: { type: String, required: true },    
    // store the image URL that will be coming from Cloudinary
    /*
    upload an image from the file input in the browser 
    that image will go to your Cloudinary storage through the API that is given to you by Cloudinary. 
    Cloudinary will give you an URL of that image in response. 
    Then you will send a POST request with that image URL to your MongoDB database to store the image URL.
    */
    description: { type: String },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product;