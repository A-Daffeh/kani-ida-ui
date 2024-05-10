import NavBar from "../components/navbar/NavBar";
import Banner from "../components/banner/Banner";
import About from "../components/about/About";

const Home = () => {
    return (
        <>
            <NavBar />
            <Banner banner_title="Savory, Seasoning & Spices"/>
            <About />
        </>
    )
}

export default Home;