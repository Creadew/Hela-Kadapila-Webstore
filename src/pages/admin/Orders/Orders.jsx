import React from "react";
import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import OrderDetails from "../../../components/admin/OrderDetail";
import { FaPlusCircle } from "react-icons/fa";
import AddOrder from "./AddOrder";

const Orders = () => {
  const [showAddOrder, setShowAddOrder] = useState(false);
  return (
    <AdminLayout>
      <div className="bg-adminBackground py-4 flex justify-between items-center px-4 mb-6 rounded-lg">
        <h1 className=" text-xl text-adminText font-bold">
          {showAddOrder ? "Add Order" : "All Order"}
        </h1>
        <button
          className="flex gap-4 py-3 px-6 font-semibold hover:bg-accent hover:text-text items-center rounded-xl bg-secondary text-text"
          onClick={() => setShowAddOrder(!showAddOrder)}
        >
          {!showAddOrder ? (
            <>
              <FaPlusCircle />
              Add Order
            </>
          ) : (
            "Cancel"
          )}
        </button>
      </div>
      {showAddOrder && <AddOrder />}
      {!showAddOrder && <OrderDetails />}
    </AdminLayout>
  );
};

export default Orders;
