import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import Axios from 'axios';
import axios from 'axios';
// import ImageUploader from "react-images-upload"; // https://github.com/JakeHartnell/react-images-upload

const url = 'CLOUDINARY_URL=cloudinary://274663193337789:RX_iXmI863h8_6vyjty6Z1cpa14@oxytradepost/image/upload';
const preset = 'ml_default';

export default function CreateProductScreen(props) {

    // link state to the form's input fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([]);
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
            // send a POST request to Cloudinary
            const res = axios.post(url, formData); // await?
            // if it succeeds, we will get an imageUrl
            const imageUrl = res.data.secure_url;
            // send another POST request to server to create a product instance in the database
            dispatch(createProduct(name, price, imageUrl, description));
            setImage(image.data);
        } catch (err) {
            console.error(err);
        }
    }

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
                        value={image}
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