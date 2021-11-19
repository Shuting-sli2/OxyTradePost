import React, { useEffect, useState } from 'react';
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

    const productCreated = useSelector((state) => state.productCreate);
    const { productInfo } = productCreated;

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    // console.log("userInfo._id: ",userInfo._id);
    const userid = userInfo._id;
    const userPhone = userInfo.phone;
    const userName = userInfo.name;
    console.log(userid);
    console.log(userPhone);
    console.log(userName);

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
                    // console.log(imageUrl);
                    dispatch(createProduct(name, price, imageUrl, description, userid, userPhone));
                    // console.log("productInfo: ", productInfo); // product undefined
                    setImage(productInfo.imageUrl);
                    /*
                    axios.post(
                        '/api/products/post',
                        { name, price, imageUrl, description }
                    ).then((data) => {
                        console.log("imageUrl from server api: ", data.data.imageUrl);
                        setImage(data.data.imageUrl);
                    })
                    */
                })
                .catch((err) => {
                    console.log(err);
                })
        } catch (err) {
            console.error(err);
        }
    }
    // redirect
    useEffect(() => {
        if (productInfo) {
            props.history.push('/');
        }
    }, [productInfo, props.history]);

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