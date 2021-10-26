import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
export default function CreateProductScreen(props) {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    // state.productCreate is defined in store.js
    /*
    const productCreate = useSelector((state) => state.productCreate);
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate;
    */
    
    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      // alert(`name: ${name}\n price: ${price}\n image: ${image}\ndescription: ${description}\n `);
      dispatch(createProduct({name, price, image, description}));
      /*
      fetch('/', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(product)
      }).then(() => {
          console.log("new product added.");
      })*/
    };

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Create a post</h1>
                </div>
                <div>
                    <label htmlFor="name">Product Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input
                        id="price"
                        type="text"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="image">Image</label>
                    <input
                        id="image"
                        type="text"
                        placeholder="Enter image"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    ></input>
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="3"
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit" >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}