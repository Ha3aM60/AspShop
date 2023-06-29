import { Link, useNavigate } from "react-router-dom";
import "./DefaultHeader.css";
import { useSelector } from "react-redux";
import { store } from "../../../../store";
import { AuthUserActionType, IAuthUser } from "../../Auth/AuthReducer/types";
import { useDispatch } from "react-redux";
import http from "../../../../http";

const DefaultHeader = () => {

  const { isAuth, user } = useSelector((store: any) => store.auth as IAuthUser);
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const logout = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("token");
    http.defaults.headers.common["Authorization"] = ``;
    dispatch({ type: AuthUserActionType.LOGOUT_USER });
    navigator('/');
  };

  const isAdmin = user?.roles === "Admin";

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
                {isAdmin &&
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/admin"
                    >
                      Адмін панель
                    </Link>
                  </li>}

              </ul>
              {isAuth ? (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/profile"
                    >
                      {user?.email}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="btn btn-primary"
                      aria-current="page"
                      to="/logout"
                      onClick={logout}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/Auth/register">
                      Sign up
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="btn btn-primary" aria-current="page" to="/Auth/login">
                      Sign in
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
export default DefaultHeader
