import NavBar from "../components/navbar/NavBar";
import Banner from "../components/banner/Banner";
import About from "../components/about/About";
import Footer from "../components/layouts/Footer";

const Home = () => {
    return (
        <>
            <NavBar />
            <Banner banner_title="Savory, Seasoning & Spices"  content="Flavor your world with our savory sensations!" className="home-banner"/>
            <About />
            <Footer />
        </>
    )
}

export default Home;