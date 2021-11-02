import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function PostListScreen(props) {
    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();
    const productDelete = useSelector((state) => state.productDelete);
    const { successDelete } = productDelete;

    const productCreate = useSelector((state) => state.productCreate);
    const {
        successCreate,
    } = productCreate;

    const deleteHandler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
            dispatch(deleteProduct(product._id));
        }
    };
    // console.log("userInfo._id: ", userInfo._id); 
    // also need to dispatch listProducts when product is created/deleted
    useEffect(() => {
        if (successCreate) {
            // ????: what does PRODUCT_CREATE_RESET Action do? 
            dispatch({ type: PRODUCT_CREATE_RESET });
          }
        if (successDelete) {
            dispatch({ type: PRODUCT_DELETE_RESET });
        }
        dispatch(listProducts({ seller: userInfo._id }));
    }, [dispatch, userInfo._id, successDelete, successCreate]);

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
                                        onClick={() => deleteHandler(product)}
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