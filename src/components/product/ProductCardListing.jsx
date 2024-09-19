import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import './ProductCardListing.css';
import { useSelector } from 'react-redux';

const ProductCardListing = ({ products }) => {
    const userId = useSelector((state) => state.auth.user?.data.authResponse.user.id);

    return (
        <div className="product-card-listing m-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    image={product.imageUrl}
                    category={product.productCategory.name}
                    name={product.name}
                    price={product.price}
                    productId={product.id}
                    userId={userId}
                />
            ))}
        </div>
    );
};

ProductCardListing.propTypes = {
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        productCategory: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
    })).isRequired,
};

export default ProductCardListing;
