import NavBar from "../components/navbar/NavBar";
import Banner from "../components/banner/Banner";
import About from "../components/about/About";

const Home = () => {
    return (
        <>
            <NavBar />
            <Banner banner_title="Savory, Seasoning & Spices"  content="Flavor your world with our savory sensations!" className="home-banner" />
            <About />
        </>
    )
}

export default Home;