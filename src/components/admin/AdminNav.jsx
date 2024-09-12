import React from "react";
import config from "../../../system.config";
import { useLocation } from "react-router-dom";

import {
  FaStoreAlt,
  FaBoxes,
  FaShoppingBasket,
  FaUsers,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaListAlt,
} from "react-icons/fa";

import { FaList } from "react-icons/fa6";

const AdminNav = () => {
  const inactiveLink =
    "flex gap-4 p-3 font-semibold hover:bg-accent hover:text-text items-center rounded-xl";
  const activeLink = inactiveLink + " bg-secondary text-text";
  const location = useLocation();

  return (
    <nav className=" bg-adminBackground text-adminText min-w-[15vw]  top-0 p-4 fixed w-full h-full md:static md:w-auto transition-all z-50">
      <a className="flex-col gap-1 justify-center items-center" href="/">
        <img
          src={config.logo}
          alt={`${config.siteName} Logo`}
          className=" w-32 p-2 mx-6 my-2"
        />
        <div className="flex-col gap-2">
          <h1 className="text-center text-adminText font-bold text-2xl mb-1">
            {config.siteName}
          </h1>
          <h2 className="text-center text-secondary font-semibold text-sm">
            {config.siteTitle}
          </h2>
        </div>
      </a>

      <ul className="flex flex-col gap-2 mt-8">
        <li>
          <a
            href="/hk-admin"
            className={
              location.pathname === "/hk-admin" ? activeLink : inactiveLink
            }
          >
            <FaStoreAlt />
            Dashboard
          </a>
        </li>

        <li>
          <a
            href="/hk-admin/products"
            className={
              location.pathname === "/hk-admin/products"
                ? activeLink
                : inactiveLink
            }
          >
            <FaBoxes />
            Products
          </a>
        </li>

        <li>
          <a
            href="/hk-admin/categories"
            className={
              location.pathname === "/hk-admin/categories"
                ? activeLink
                : inactiveLink
            }
          >
            <FaListAlt />
            Categories
          </a>
        </li>

        <li>
          <a
            href="/hk-admin/orders"
            className={
              location.pathname === "/hk-admin/orders"
                ? activeLink
                : inactiveLink
            }
          >
            <FaShoppingBasket />
            Orders
          </a>
        </li>

        <li>
          <a
            href="/hk-admin/customers"
            className={
              location.pathname === "/hk-admin/customers"
                ? activeLink
                : inactiveLink
            }
          >
            <FaUsers />
            Customers
          </a>
        </li>

        <li>
          <a
            href="/hk-admin/settings"
            className={
              location.pathname === "/hk-admin/settings"
                ? activeLink
                : inactiveLink
            }
          >
            <FaCog />
            Settings
          </a>
        </li>

        <li>
          <a
            href="/hk-admin/my-profile"
            className={
              location.pathname === "/hk-admin/my-profile"
                ? activeLink
                : inactiveLink
            }
          >
            <FaUser />
            My Profile
          </a>
        </li>

        <li>
          <a
            href="/login"
            className={
              location.pathname === "/hk-admin/login"
                ? activeLink
                : inactiveLink
            }
            onClick={() => {
              localStorage.removeItem("users");
            }}
          >
            <FaSignOutAlt />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
