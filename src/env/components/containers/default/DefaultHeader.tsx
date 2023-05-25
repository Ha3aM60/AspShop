import { Link } from "react-router-dom";
import "./DefaultHeader.css";

const DefaultHeader = () => {
    return (
        <>
            <header data-bs-theme="dark">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/">
              Shop
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/categories/create">
                    Add
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="#">
                    Link
                  </a>
                </li>
              </ul>
              <Link className="btn btn-primary" aria-current="page" to="/Auth/register">
                    Sign up
                  </Link>
            </div>
          </div>
        </nav>
      </header>
        </>
    );
}
export default DefaultHeader