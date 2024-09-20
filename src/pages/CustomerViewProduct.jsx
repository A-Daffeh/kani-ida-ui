import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import NavBar from '../components/navbar/NavBar';
import { useFetchProductById } from '../services/ProductService';


function CustomerViewProductPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: product, isLoading, error } = useFetchProductById(id);

    const handleReturn = () => {
        navigate("/products/spices");
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <>
        
        <NavBar/>
        <div className="product-details-container">
            <div className="product-image">
                <img src={product.imageUrl} className="img-fluid" alt={product.name} />
            </div>
            <div className="product-info">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-category"><strong>Category:</strong> {product.productCategory.name}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-price"><strong>Price:</strong> ${product.price}</p>
                <p className="product-availability"><strong>Availability:</strong> {product.availability ? 'Available' : 'Out of Stock'}</p>
                <p className="product-quantity"><strong>Quantity in Stock:</strong> {product.quantity}</p>
                <div className="product-actions">
                    <button className="btn btn-primary">Add to cart</button>
                    <button className="btn btn-secondary ml-3" onClick={handleReturn}>
                        Back
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default CustomerViewProductPage;
