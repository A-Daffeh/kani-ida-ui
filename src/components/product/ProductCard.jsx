import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({ image, category, title, description, price }) => {
    return (
        <div className="rounded position-relative product-item">
            <div className="product-img">
                <img src={image} className="img-fluid w-100 rounded-top" alt={title} />
            </div>
            <div className="text-white bg-secondary px-3 py-1 rounded position-absolute" style={{ top: '10px', left: '10px' }}>
                view
            </div>
            <div className="p-4 border border-secondary border-top-0 rounded-bottom product-info">
                <h4>{title}</h4>
                <h6 className='text-danger'>{category}</h6>
                <p>{description}</p>
                <div className="d-flex justify-content-between flex-lg-wrap">
                    <p className="text-dark fs-5 fw-bold mb-0">{price}</p>
                    <a href="#" className="btn border border-secondary rounded-pill px-3 text-primary">
                        <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to cart
                    </a>
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
};

export default ProductCard;
