import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
// import ImageUploader from "react-images-upload"; // https://github.com/JakeHartnell/react-images-upload
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyADmD_z94mkhYsHjo9PXF7oCIuJG4YBC0w",
    authDomain: "oxytradepost-image-upload.firebaseapp.com",
    projectId: "oxytradepost-image-upload",
    storageBucket: "oxytradepost-image-upload.appspot.com",
    messagingSenderId: "313038145745",
    appId: "1:313038145745:web:3bcc086c5ce746403d9df0",
    measurementId: "G-1ZYL5257J2"
};
const app = initializeApp(firebaseConfig);


export default function CreateProductScreen(props) {

    // link state to the form's input fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    // const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [image, setImage] = useState([])
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        // alert(`name: ${name}\n price: ${price}\n image: ${image}\ndescription: ${description}\n `);
        dispatch(createProduct(name, price, image, description));
    };

    const onChangeImage  = (e) => {
            setImage(e.target.value);
    }
    console.log('image: ', image);
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
                        type="file"
                        placeholder="Select an image"
                        value={image}
                        onChange={onChangeImage}
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