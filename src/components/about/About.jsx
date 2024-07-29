import './About.css';
import { assets } from '../../assets/assets';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
    return (
        <section className="about" id="about">
            <Container>
                <h2>About Us</h2>
                <Row className="mb-5">
                    <Col xs={12} md={{ span: 6, order: 2 }}>
                        <div className="about-img">
                            <img src={assets.about_img} alt="About Image" />
                        </div>
                    </Col>
                    <Col xs={12} md={{ span: 6, order: 1 }}>
                        <p className='about-para'>
                            Welcome to Savory Seasonings & Spices, a Gambian-owned haven 
                            for exquisite seasonings and spices! Founded by Ida, 
                            our passion is to infuse every dish with unparalleled flavor. 
                            Whether you're a home chef or a culinary professional, 
                            let us be your trusted companion on your flavor-filled journey. 
                            Dive into our collection and discover the essence of Gambian cuisine with Kani IDA
                        </p>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default About;
