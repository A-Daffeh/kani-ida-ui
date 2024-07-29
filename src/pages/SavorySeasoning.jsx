import Banner from "../components/banner/Banner";
import NavBar from "../components/navbar/NavBar";
import ProductCardListing from "../components/product/ProductCardListing";
import axios from "axios";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Footer from "../components/layouts/Footer";

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

// const fetchProducts = async (page, size) => {
//     const { data } = await axios.get("http://localhost:5173/api/products", {
//         params: { page, size }
//     });

//     return data;
// }

const SavorySeasoning = () => {
    // const [page, setPage] = useState(0);
    // const [size, setSize] = useState(4);

    // const { data, isLoading, isError } = useQuery(
    //     ['products', page, size],
    //     () => fetchProducts(page, size),
    //     {
    //         keepPreviousData: true,
    //     }
    // );

    // if (isLoading) {
    //     return <div>Loading....</div>
    // }

    // if (isError) {
    //     return <div>Error fetching products</div>
    // }

    // const handleNextPage = () => setPage((prevPage) => prevPage + 1);
    // const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 0));

    return (
        <>
        <NavBar />
        <Banner banner_title="Savory & Seasoning" className="savory-banner"/>
        <div className="container-fluid">
            <ProductCardListing products={products} />
            {/* <div className="pagination">
            <button onClick={handlePreviousPage} disabled={page === 0}>
                Previous
            </button>
            <button onClick={handleNextPage} disabled={!data.hasNext}>
                Next
            </button>
            </div> */}
        </div>
        <Footer />
        </>
    );
};

export default SavorySeasoning;