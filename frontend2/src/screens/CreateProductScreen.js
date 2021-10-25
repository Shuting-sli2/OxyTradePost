import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductEditScreen(props) {
    /*
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const dispatch = useDispatch();
  useEffect(() => {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image); 
      setDescription(product.description);
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    // TODO: dispatch update product
  };
*/
  return (
    <div>
      <form className="form" >
        <div>
          <h1>Create a post</h1>
        </div>
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter name"
              ></input>
            </div>
            <div>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                placeholder="Enter price"
              ></input>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div>
              <label></label>
              <button className="primary" type="submit">
                Publish
              </button>
            </div>
      </form>
    </div>
  );
}