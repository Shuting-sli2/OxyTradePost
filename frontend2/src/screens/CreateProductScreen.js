import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditScreen(props) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const handleNameChange = e =>{
    setName(e.target.value);
  }

  const handlePriceChange = e =>{
    setPrice(e.target.value);
  }

  const handleImageChange = e =>{
    setImage(e.target.value);
  }

  const handleDescriptionChange = e =>{
    setDescription(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // alert(`name: ${name}\n price: ${price}\n image: ${image}\ndescription: ${description}\n `);
    // TODO: dispatch update product
  };

  return (
    <div>
      <form className="form" onSubmit = {submitHandler}>
        <div>
          <h1>Create a post</h1>
        </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
                value = {name}
                onChange = {handleNameChange}
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
                value = {price}
                onChange = {handlePriceChange}
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value = {image}
                onChange = {handleImageChange}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value = {description}
                onChange = {handleDescriptionChange}
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