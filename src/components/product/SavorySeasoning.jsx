import NavBar from "../navbar/NavBar";
import Banner from "../banner/Banner";
import ProductCardListing from "./ProductCardListing";

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

const SavorySeasoning = () => {
    return (
        <>
            <NavBar />
            <Banner banner_title="Savory & Seasoning" className="savory-banner"/>
            <div className="container-fluid">
                <ProductCardListing products={products} />
            </div>
        </>
    )
}

export default SavorySeasoning;