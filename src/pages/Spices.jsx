import Banner from "../components/banner/Banner";
import NavBar from "../components/navbar/NavBar";
import ProductCardListing from "../components/product/ProductCardListing";

const products = [
    {
        id: "1",
        image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        category: 'Fruits',
        title: 'Grapes',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: '$4.99',
    },
    {
        id: "2",
        image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        category: 'Fruits',
        title: 'Apples',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: '$3.99',
    },
    {
        id: "3",
        image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        category: 'Fruits',
        title: 'Apples',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: '$3.99',
    },
    {
        id: "4",
        image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        category: 'Fruits',
        title: 'Apples',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: '$3.99',
    },
    {
        id: "5",
        image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        category: 'Fruits',
        title: 'Apples',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: '$3.99',
    },
    {
        id: "6",
        image: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
        category: 'Fruits',
        title: 'Apples',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: '$3.99',
    },
];

const Spices = () => {
    return (
        <>
            <NavBar />
            <Banner banner_title="Spices" className="spices-banner" />
            <div className="container-fluid">
                <ProductCardListing products={products} />
            </div>
        </>
    )
}

export default Spices;