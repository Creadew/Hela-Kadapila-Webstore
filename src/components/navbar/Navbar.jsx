import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import config from "../../../system.config";

const Navbar = () => {
  // get user from localStorage
  const user = JSON.parse(localStorage.getItem("users"));

  // navigate
  const navigate = useNavigate();

  // logout function
  const logout = () => {
    localStorage.clear("users");
    navigate("/");
  };

  // CartItems
  const cartItems = useSelector((state) => state.cart);

  // navList Data
  const navList = (
    <ul className="flex gap-4 text-white font-medium text-md px-4 ">
      {/* Home */}
      <li>
        <Link to={"/"}>Home</Link>
      </li>

      {/* All Product */}
      <li>
        <Link to={"/shop"}>Shop</Link>
      </li>

      {/* Signup */}
      {!user ? (
        <li>
          <Link to={"/signup"}>Signup</Link>
        </li>
      ) : (
        ""
      )}

      {/* Signup */}
      {!user ? (
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
      ) : (
        ""
      )}

      {/* User */}
      {user?.role === "user" && (
        <li>
          <Link to={"/user-dashboard"}>User</Link>
        </li>
      )}

      {/* Admin */}
      {user?.role === "admin" && (
        <li>
          <Link to={"/hk-admin"}>Admin</Link>
        </li>
      )}

      {/* logout */}
      {user && (
        <li className=" cursor-pointer" onClick={logout}>
          logout
        </li>
      )}

      {/* Cart */}
      <li>
        <Link to={"/cart"}>Cart({cartItems.length})</Link>
      </li>
    </ul>
  );
  return (
    <nav className="bg-primary sticky top-0">
      {/* main  */}
      <div className="lg:flex lg:justify-between items-center py-1 lg:px-3 ">
        {/* left  */}
        <div className="left py-3 lg:py-0">
          <Link
            to={"/"}
            className="flex flex-row gap-2 align-middle items-center"
          >
            <img
              src={config.logo}
              alt={`${config.siteName} Logo`}
              className=" w-32 mx-6 my-2"
            />
          </Link>
        </div>

        {/* right  */}
        <SearchBar />

        {/* Search Bar  */}
        <div className="right flex justify-center mb-4 lg:mb-0">{navList}</div>
      </div>
    </nav>
  );
};

export default Navbar;
