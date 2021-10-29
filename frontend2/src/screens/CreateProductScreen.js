import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct } from '../actions/productActions';
import FileUploader from '../components/FileUploader';
export default function CreateProductScreen(props) {

    // link state to the form's input fields
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
      e.preventDefault();
      // alert(`name: ${name}\n price: ${price}\n image: ${image}\ndescription: ${description}\n `);
      console.log(selectedFile);
      dispatch(createProduct(name, price, selectedFile, description));
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
                    <FileUploader
                        onFileSelectSuccess = {(file) => setSelectedFile(file)}
                        onFileSelectError = {({error}) => alert(error)}
                    ></FileUploader>
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