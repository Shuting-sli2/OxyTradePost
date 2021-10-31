import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function PostListScreen(props) {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    /*
    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
          dispatch(deleteProduct(product._id));
        }
    };
    */

    // also need to dispatch listProducts when product is created/deleted
    useEffect(() => {
        dispatch(listProducts({ seller: userInfo._id }));
    }, [dispatch, props.history, userInfo._id]);
    // [createdProduct,dispatch,props.history,sellerMode,successCreate,successDelete,userInfo._id]

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
            </div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="small"
                                        // onClick={() => deleteHandler(product)}
                                    >Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}