import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import ChatBox from '../components/ChatBox';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  // product: product object sent by productRouter
  // console.log(product.seller);
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
                <li><b>Pirce: </b>${product.price}</li>
                <li>
                  <b>Contact seller at phone: </b>{product.phone}
                </li>
                <li>
                   <pre><b>Description: </b>{product.description}</pre>
                  
                </li>  
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/*

*/