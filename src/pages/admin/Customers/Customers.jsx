import React from "react";
import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import UserDetails from "../../../components/admin/UserDetail";
import { FaPlusCircle } from "react-icons/fa";
import AddCustomer from "./AddCustomer";

const Customers = () => {
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  return (
    <AdminLayout>
      <div className="bg-adminBackground py-4 flex justify-between items-center px-4 mb-6 rounded-lg">
        <h1 className=" text-xl text-adminText font-bold">
          {showAddCustomer ? "Add Customer" : "All Customer"}
        </h1>
        <button
          className="flex gap-4 py-3 px-6 font-semibold hover:bg-accent hover:text-text items-center rounded-xl bg-secondary text-text"
          onClick={() => setShowAddCustomer(!showAddCustomer)}
        >
          {!showAddCustomer ? (
            <>
              <FaPlusCircle />
              Add Customer
            </>
          ) : (
            "Cancel"
          )}
        </button>
      </div>
      {showAddCustomer && <AddCustomer />}
      {!showAddCustomer && <UserDetails />}
    </AdminLayout>
  );
};

export default Customers;
