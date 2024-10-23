import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useLocation } from 'react-router-dom';
import NavBar from "../components/navbar/NavBar";

// const stripePromise = loadStripe('pk_live_51OxO7DRoDw2IDRBGiGtq9LDeKh7ziJlPEKpjoqbWErC1cyp35vbp1tXj6n3JHZzXJAc90n2hodRrtGKlGIRkbmiq0093HSq314');
const stripePromise = loadStripe('pk_test_51OxO7DRoDw2IDRBGYNO8qo8SLEbFKDX9nm8aj7m0kZbhiwry9J9DHEve0hrTDnWrCIovJSA52uY9cfur2UXKA7O800bmaKqX9b');

const Checkout = () => {
    const location = useLocation();
    const { cartItems, totalAmount, cartId } = location.state || { cartItems: [], totalAmount: 0, cartId: null };

    return (
        <>
            <NavBar />
            <div className="container-fluid py-5 my-5">
                <div className="container py-5">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm cartItems={cartItems} totalAmount={totalAmount} cartId={cartId} />
                    </Elements>
                </div>
            </div>
        </>
    );
};

export default Checkout;