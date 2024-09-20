import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useLocation } from 'react-router-dom';
import NavBar from "../components/navbar/NavBar";

const stripePromise = loadStripe('pk_live_51OxO7DRoDw2IDRBGiGtq9LDeKh7ziJlPEKpjoqbWErC1cyp35vbp1tXj6n3JHZzXJAc90n2hodRrtGKlGIRkbmiq0093HSq314');

const Checkout = () => {
    const location = useLocation();
    const { cartItems, totalAmount } = location.state || { cartItems: [], totalAmount: 0 };

    return (
        <>
            <NavBar />
            <div className="container-fluid py-5 my-5">
                <div className="container py-5">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Checkout;