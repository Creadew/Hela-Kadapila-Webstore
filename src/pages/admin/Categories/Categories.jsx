import React from "react";
import AddCategory from "./AddCategory";
import { useState, useContext } from "react";
import AdminLayout from "../../../components/admin/AdminLayout";
import Loader from "../../../components/loader/Loader";
import myContext from "../../../context/myContext";
import CategoryDetail from "../../../components/admin/CategoryDetail";

const Categories = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  return (
    <AdminLayout>
      {/* Add category  */}
      <div className="flex flex-col gap-3 lg:flex-row justify-evenly w-full h-full">
        <div className="flex basis-1/2  bg-adminBackground p-4 rounded-lg">
          <AddCategory />
        </div>
        <div className="flex basis-1/2 bg-adminBackground p-4 rounded-lg flex-col">
          {/* table  */}
          <CategoryDetail />
          {loading && (
            <div className="flex justify-center relative top-20 w-full">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;
