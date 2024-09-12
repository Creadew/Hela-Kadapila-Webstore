import React from "react";
import { useState } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import ProductDetails from "../../../components/admin/ProductDetail";
import { FaPlusCircle } from "react-icons/fa";
import AddProduct from "./AddProduct";

const Products = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  return (
    <AdminLayout>
      <div className="bg-adminBackground py-4 flex justify-between items-center px-4 mb-6 rounded-lg">
        <h1 className=" text-xl text-adminText font-bold">
          {showAddProduct ? "Add Product" : "All Product"}
        </h1>
        <button
          className="flex gap-4 py-3 px-6 font-semibold hover:bg-accent hover:text-text items-center rounded-xl bg-secondary text-text"
          onClick={() => setShowAddProduct(!showAddProduct)}
        >
          {!showAddProduct ? (
            <>
              <FaPlusCircle />
              Add Product
            </>
          ) : (
            "Cancel"
          )}
        </button>
      </div>
      {showAddProduct && <AddProduct />}
      {!showAddProduct && <ProductDetails />}
    </AdminLayout>
  );
};

export default Products;
