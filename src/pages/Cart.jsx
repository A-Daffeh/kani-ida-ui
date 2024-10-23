import NavBar from "../components/navbar/NavBar";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
    useFetchCart,
    useRemoveCartItem,
    useUpdateCartItem,
    useClearCart
} from '../services/CartService';
import { useSelector } from 'react-redux';

const Cart = () => {
    const userId = useSelector((state) => state.auth.user?.data.authResponse.user.id);
    const navigate = useNavigate();

    const { data: cart, isLoading, error } = useFetchCart(userId);
    const removeCartItem = useRemoveCartItem();
    const updateCartItem = useUpdateCartItem();
    const clearCart = useClearCart();

    const handleRemove = (cartItemId) => {
        removeCartItem.mutate({ userId, cartItemId });
    };

    const handleUpdateCartItem = (cartItemId, quantity) => {
        updateCartItem.mutate({ cartItemId, quantity });
    };

    const handleClearCart = () => {
        clearCart.mutate({ userId });
    };

    const handleProceedToCheckout = () => {
        navigate('/checkout', { state: { cartItems: cart.cartItems, totalAmount: cart.totalAmount, cartId: cart.cartId } });
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    if (!cart || cart.cartItems.length === 0) {
        return (
            <>
                <NavBar />
                <div className="container-fluid py-5 my-5">
                    <div className="container py-5">
                        <p className='text-danger'>Cart is Empty</p>
                    </div>
                </div>
            </>
        )
    }

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
                                {cart.cartItems.map( item => (
                                    <tr key={item.id}>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={item.imageUrl} className="img-fluid me-5 rounded-circle" style={{ width: '80px', height: '80px' }} />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{item.productName}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">$ {item.price}</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: '100px' }}>
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-minus rounded-circle bg-light border" onClick={() => handleUpdateCartItem(item.id, item.quantity - 1)}>
                                                        <FontAwesomeIcon icon={faMinus} />
                                                    </button>
                                                </div>
                                                <input type="text" className="form-control form-control-sm text-center border-0" value={item.quantity} readOnly />
                                                <div className="input-group-btn">
                                                    <button className="btn btn-sm btn-plus rounded-circle bg-light border" onClick={() => handleUpdateCartItem(item.id, item.quantity + 1)}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">$ {(item.totalPrice).toFixed(2)}</p>
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
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Subtotal</h5>
                                    <p className="mb-0 pe-4">${(cart.totalAmount).toFixed(2)}</p>
                                </div>
                                <button className="btn border-white rounded-pill px-4 py-3 text-white text-uppercase mb-4 ms-4" onClick={handleProceedToCheckout}>
                                    Proceed to Checkout
                                </button>
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
