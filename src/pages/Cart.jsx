import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "../components/navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { removeCartItem, updateCartItem, fetchCart, clearCart } from '../components/store/actions/CartActions';

const Cart = ({ userId }) => {
    const dispatch = useDispatch();
    const { items, total, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart({ userId }));
    }, [dispatch, userId]);

    const handleRemove = (cartItemId) => {
        dispatch(removeCartItem({ userId, cartItemId }));
    };

    const handleUpdateCartItem = (cartItemId) => {
        dispatch(updateCartItem({ cartItemId }));
    };

    // const handleDecrease = (cartItemId) => {
    //     dispatch(decreaseQuantity({ cartItemId }));
    // };

    const handleClearCart = () => {
        dispatch(clearCart({ userId }));
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (error) return <p>{error}</p>;

    return (
        <>
            <NavBar />
            <div className="container-fluid py-5 my-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map(item => (
                                    <tr key={item.id}>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={item.image} className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{item.title}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{item.price} $</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: '100px' }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleUpdateCartItem(item.id)}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control form-control-sm text-center border-0" value={item.quantity} readOnly />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleUpdateCartItem(item.id)}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{(item.price * item.quantity).toFixed(2)} $</p>
                                        </td>
                                        <td>
                                            <button className="btn btn-md rounded-circle bg-light border mt-4" onClick={() => handleRemove(item.id)}>
                                                <FontAwesomeIcon icon={faTimes} className="text-danger" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row g-4 justify-content-end">
                        <div className="col-8"></div>
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-danger rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${calculateTotal()}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className="">
                                            <p className="mb-0">Flat rate: $3.00</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${(parseFloat(calculateTotal()) + 3).toFixed(2)}</p>
                                </div>
                                <button className="btn border-white rounded-pill px-4 py-3 text-white text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                                <button className="btn border-white rounded-pill px-4 py-3 text-white text-uppercase mb-4 ms-4" type="button" onClick={handleClearCart}>Clear Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
