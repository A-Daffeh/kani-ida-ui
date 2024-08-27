import PropTypes from 'prop-types';
import './ProductCard.css';
import { useAddItemToCart } from '../../services/CartService';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../layouts/Toast';

const ProductCard = ({ image, name, category, description, price, productId, userId }) => {
    const addItemToCart = useAddItemToCart();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (!userId) {
            showToast('You need to be logged in to add items to your cart', 'warning');
            navigate('/login');
            return;
        }

        addItemToCart.mutate(
            { userId, item: { productId, name, price, quantity: 1, image } },
            {
                onSuccess: () => {
                    showToast('Item added to cart successfully', 'success');
                },
                onError: (error) => {
                    const errorMessage = error.response?.data?.message || 'Failed to add item to cart';
                    showToast(errorMessage, 'error');
                },
            }
        );
    };

    return (
        <div className="rounded position-relative product-item">
            <div className="product-img">
                <img src={image} className="img-fluid w-100 rounded-top" alt={name} />
            </div>
            <div className="p-4 border border-secondary border-top-0 rounded-bottom product-info">
                <h4>{name}</h4>
                <h6 className='text-danger'>{category}</h6>
                <p>{description}</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold mb-0">${price}</p>
                    <button onClick={handleAddToCart} className="btn border border-secondary rounded-pill px-3 text-primary">
                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productId: PropTypes.string.isRequired,
    userId: PropTypes.number,
};

export default ProductCard;
