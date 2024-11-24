import { useNavigate } from 'react-router-dom';
import Footer from '../components/layouts/Footer';
import NavBar from '../components/navbar/NavBar';

function CustomerViewProductPage() {
    const navigate = useNavigate();

    const product = {
        imageUrl: 'https://via.placeholder.com/300', 
        name: 'KANI IDA RED PEPPER',
        productCategory: { name: 'Savory & Seasoning' },
        description: 'Kani Ida\'s Red Pepper is a fiery fusion, blending the rich umami of crab with the bold kick of red pepper. This tantalizing dish boasts a perfect balance of savory and spicy, captivating taste buds with every bite.',
        price: 11.99,
        availability: true,
    };

    const handleReturn = () => {
        navigate("/products/spices");
    };

    return (
        <>
            <NavBar />
           
            <div className="contact" style={{ overflowX: "hidden", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <div className="container flex-grow-1">
            <div className="flex-grow-1">
                    <div className="container">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-12 col-lg-5 text-center mb-4">
                                {/* Product Image */}
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="img-fluid rounded"
                                    style={{
                                        maxWidth: "80%",
                                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                                    }}
                                />
                            </div>
                            <div className="col-12 col-lg-6">
                                {/* Product Details */}
                                <h1 className="product-title mb-3">{product.name}</h1>
                                <p className="product-category text-muted mb-2">
                                    <strong>{product.productCategory.name}</strong>
                                </p>
                                <p className="product-description text-dark mb-4">
                                    {product.description}
                                </p>
                                <p className="product-price text-dark mb-4">
                                    <strong>${product.price.toFixed(2)}</strong>
                                </p>
                                <p className="product-price text-dark mb-4">
                                <strong>Availability:</strong>{" "}
                                    <span
                                        className={product.availability ? "text-success" : "text-danger"}
                                    >
                                        {product.availability ? "Available" : "Out of Stock"}
                                    </span>
                                </p>
                                <div className="d-flex gap-3">
                                    <button className="btn btn-primary">Add to cart</button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={handleReturn}
                                    >
                                        Back
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
      
    </div>
  

<Footer />
</div>
             
        </>
    );
}

export default CustomerViewProductPage;



