import './Banner.css';

const Banner = ({ banner_title }) => {
    return (
        <div className="banner" id="banner">
            <div>
                <h3>{banner_title}</h3>
                <h5>Flavor your world with our savory sensations!</h5>
            </div>
        </div>
    )
}

export default Banner;