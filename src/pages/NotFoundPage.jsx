import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <>
        <div>
        <h2 className="text-primary">404 not found</h2>
        <Link to="/">Home</Link>
        </div>
        </>

    )
}

export default NotFoundPage;