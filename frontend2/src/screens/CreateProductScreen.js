import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
// import FileUploader from '../components/FileUploader';
import ImageUploader from "react-images-upload";

export default function CreateProductScreen(props) {

    // link state to the form's input fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    // const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);


    const dispatch = useDispatch();
    const onDrop = image => {
        setImages([...images, image]);
      };
    const submitHandler = (e) => {
        e.preventDefault();
        // alert(`name: ${name}\n price: ${price}\n image: ${image}\ndescription: ${description}\n `);
        dispatch(createProduct(name, price, images, description));
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
                    <ImageUploader
                        id="images"
                        type="File"
                        placeholder="Enter price"
                        value={price}
                        onChange={onDrop}
                        withIcon={true}
                        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
                        maxFileSize={5242880}
                        required
                    ></ImageUploader>
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