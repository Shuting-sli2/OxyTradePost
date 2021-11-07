import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);


  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  // product: product object sent by productRouter
  // console.log(product);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.imageUrl}
                alt={product.name}
              ></img>
            </div>
            <div className="col-2">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>Pirce : ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
                <li>
                  <button className="primary block">Message Seller</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );


}