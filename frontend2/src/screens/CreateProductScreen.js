import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import axios from 'axios';
// import ImageUploader from "react-images-upload"; // https://github.com/JakeHartnell/react-images-upload

const url = 'https://api.cloudinary.com/v1_1/oxytradepost/image/upload';
const preset = 'coreja3i';

export default function CreateProductScreen(props) {

    // link state to the form's input fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const onChange = (e) => {
        setImage(e.target.files[0]);
    }
    const onSubmit = (e) => {
        e.preventDefault();
        // deals with image submit button
        // submit that image to Cloudinary with an upload button and onClick={onSubmit} method
        const formData = new FormData(); // These keys are required by Cloudinary so, they must match exactly with the syntax above otherwise your upload will be failed.
        formData.append('file', image);
        formData.append('upload_preset', preset);
        try {
            // send a POST request to Cloudinarys
            axios
                .post(url, formData)
                .then((result) => {
                    // console.log(result.data.secure_url);
                    var imageUrl = result.data.secure_url;
                    console.log(imageUrl);
                    dispatch(createProduct(name, price, imageUrl, description));
                })
                .catch((err) => {
                    console.log(err);
                })
            // setImage(image.data); 
            // image.data returned by database
            // display image in the webpage
            // how to get data from dispatch?
            // store?
            // understand the data workflow after action get dispatched
            // how to use data sent back from server?
        } catch (err) {
            console.error(err);
        }
    }

    // useSelector: // Allows you to extract data from the Redux store state, using a selector function.
    const productCreate = useSelector((state) => state.productCreate);
    const { productInfo, loading, error } = productCreate;
    console.log("product info: ", productInfo);
    console.log("loading", loading);
    console.log("error", error);
    // setImage(productCreate.data);

    return (
        <div>
            <form className="form" onSubmit={onSubmit}>
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
                        type="file"
                        placeholder="Select an image"
                        onChange={onChange}
                        required
                        multiple
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