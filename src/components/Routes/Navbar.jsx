import { Outlet, Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import './Navbar.css'


const Navbar = () => {
  // const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    return <Navigate replace to="/login" />;

    // return navigate("/login")
  };

  return (
    <div className="nav-main-div">
      <div className="username-div">
        <p style={{ display: "flex", gap: "10px", margin: "15px", fontSize: "2rem" }}>@{localStorage.getItem("CurrentUsername")}'s todo list</p>
      </div>
      <div className="nav-bar-div">
        <nav>
          <ul className="navbar-ul">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/todo">Todo Notes</Link>
            </li>
            <li onClick={handleLogout}>
              <Link to="/login" onClick={handleLogout} >Logout</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>

    </div>
  )
};

export default Navbar;
