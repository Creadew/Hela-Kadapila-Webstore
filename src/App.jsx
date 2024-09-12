import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import NoPage from "./pages/noPage/NoPage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import ScrollTop from "./components/scrollTop/ScrollTop";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/products/Products";
import Categories from "./pages/admin/Categories/Categories";
import Orders from "./pages/admin/Orders/Orders";
import Customers from "./pages/admin/Customers/Customers";
import Settings from "./pages/admin/Settings/Settings";
import Myprofile from "./pages/admin/MyProfile/Myprofile";

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/item/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shop" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />

          {/* Protected user route */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />

          {/* Protected admin routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />

          <Route
            path="/hk-admin"
            element={
              <ProtectedRouteForAdmin>
                <Outlet />
              </ProtectedRouteForAdmin>
            }
          >
            <Route
              path=""
              element={
                <ProtectedRouteForAdmin>
                  <Dashboard />
                </ProtectedRouteForAdmin>
              }
            />

            {/* Products */}
            <Route
              path="products"
              element={
                <ProtectedRouteForAdmin>
                  <Products />
                </ProtectedRouteForAdmin>
              }
            >
              <Route
                path="add-product"
                element={
                  <ProtectedRouteForAdmin>
                    <AddProductPage />
                  </ProtectedRouteForAdmin>
                }
              />
            </Route>

            {/* Category */}
            <Route
              path="categories"
              element={
                <ProtectedRouteForAdmin>
                  <Categories />
                </ProtectedRouteForAdmin>
              }
            />

            {/* Orders */}
            <Route
              path="orders"
              element={
                <ProtectedRouteForAdmin>
                  <Orders />
                </ProtectedRouteForAdmin>
              }
            ></Route>

            {/* Customers */}
            <Route
              path="customers"
              element={
                <ProtectedRouteForAdmin>
                  <Customers />
                </ProtectedRouteForAdmin>
              }
            ></Route>

            {/* Settings */}
            <Route
              path="settings"
              element={
                <ProtectedRouteForAdmin>
                  <Settings />
                </ProtectedRouteForAdmin>
              }
            ></Route>

            {/* MyProfile */}
            <Route
              path="my-profile"
              element={
                <ProtectedRouteForAdmin>
                  <Myprofile />
                </ProtectedRouteForAdmin>
              }
            ></Route>
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
