import Sidebar from "../sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";

function WithSidebarLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="d-flex">
        <Sidebar />
        <div className="content p-4 flex-grow-1">
          {children}
        </div>
      </div>
    </div>
  );
}

export default WithSidebarLayout;
