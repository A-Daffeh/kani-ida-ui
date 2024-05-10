import { useEffect, useState } from 'react';
import './Banner.css';

const Banner = ({ banner_title, content = "", className }) => {
    const [description, setDescription] = useState(false);
    const combinedClassName = `banner ${className}`;

    useEffect(() => {
        if (content.length > 0) {
            setDescription(true);
        }
    }, []);

    return (
        <div className={combinedClassName} id="banner">
            <div>
                <h3>{banner_title}</h3>
                {description && <h5>{content}</h5>}
            </div>
        </div>
    )
}

export default Banner;


// do sign up button, make it a modal, with username and password, dont have account yet? Register, when that is clicked a new modal shows up
// change the about us text (done)
// finish contact page, with routing (done)
// shopping cart icon, and cart (done)
