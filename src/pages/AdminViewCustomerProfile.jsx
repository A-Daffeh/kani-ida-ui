import { useNavigate, useParams } from "react-router-dom";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import Header from "../components/header/Header";
import { useFetchUserById } from "../services/UserService";

const AdminViewCustomerProfile = () => {
    const { userId } = useParams();
    const { data: user, isLoading, error } = useFetchUserById(userId);

    const navigate = useNavigate();

    const handleReturn = () => {
        navigate("/user/management");
    };

    if (isLoading) {
        return <div>Loading user profile...</div>;
    }

    if (error) {
        return <div>Error loading user profile</div>;
    }

    return (
        <>
            <Header pageTitle="User Management" />
            <Container className="mt-5">
                <h2 className="text-muted">User Profile</h2>
            <Card className="mb-4 shadow">
                <Card.Body>
                <Row className="align-items-center">
                    {/* Profile Image */}
                    <Col md={3} className="text-center">
                    <img
                        src={user.imageUrl || "https://via.placeholder.com/150"}
                        alt="Profile"
                        className="img-fluid rounded-circle"
                        style={{ maxWidth: "120px" }}
                    />
                    </Col>

                    {/* User Information */}
                    <Col md={9} className="text-md-end">
                    <h3>{user.fullName}</h3>
                    <p className="text-muted mb-1">{user.role}</p>
                    <p className="text-muted">
                        {user.addresses[0]?.city}, {user.addresses[0]?.country}
                    </p>
                    </Col>
                </Row>
                </Card.Body>
            </Card>

            <Card className="mb-4 shadow">
                <Card.Header as="h5">Personal Information</Card.Header>
                <Card.Body>
                <Row>
                    <Col md={6}>
                    <p>
                        <strong>First Name:</strong> {user.fullName.split(" ")[0]}
                    </p>
                    <p>
                        <strong>Email Address:</strong> {user.email}
                    </p>
                    <p>
                        <strong>Phone Number:</strong> {user.phoneNumber || "N/A"}
                    </p>
                    </Col>
                    <Col md={6}>
                    <p>
                        <strong>Last Name:</strong> {user.fullName.split(" ")[1]}
                    </p>
                    <p>
                        <strong>Date of Birth:</strong> {user.dob || "N/A"}
                    </p>
                    <p>
                        <strong>User Role:</strong> {user.role}
                    </p>
                    </Col>
                </Row>
                </Card.Body>
            </Card>

            <Card className="shadow">
                <Card.Header as="h5">Address</Card.Header>
                <Card.Body>
                <Row>
                    <Col md={6}>
                    <p>
                        <strong>Country:</strong> {user.addresses[0]?.country || "N/A"}
                    </p>
                    <p>
                        <strong>Street:</strong> {user.addresses[0]?.street || "N/A"}
                    </p>
                    </Col>
                    <Col md={6}>
                    <p>
                        <strong>City:</strong> {user.addresses[0]?.city || "N/A"}
                    </p>
                    <p>
                        <strong>Postal Code:</strong> {user.addresses[0]?.postalCode || "N/A"}
                    </p>
                    </Col>
                </Row>
                </Card.Body>
            </Card>

            <div className="mt-4 text-center">
                <Button variant="secondary" onClick={handleReturn}>
                Back
                </Button>
            </div>
            </Container>
        </>
  );
}

export default AdminViewCustomerProfile;