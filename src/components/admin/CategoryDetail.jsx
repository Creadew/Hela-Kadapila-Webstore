import React from "react";
import { useState, useContext } from "react";
import AdminLayout from "./AdminLayout";
import Loader from "../loader/Loader";
import myContext from "../../context/myContext";
import {
  FaPlusCircle,
  FaSearch,
  FaEye,
  FaPencilAlt,
  FaTrashAlt,
  FaShareAlt,
  FaFilter,
} from "react-icons/fa";
import toast from "react-hot-toast";

const CategoryDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllCategory, getAllCategoryFunction } =
    context;
  function handleEditCategory() {
    console.log("edit");
  }

  function handleDeleteCategory() {
    console.log("delete");
  }
  return (
    <div className="w-full overflow-x-auto mb-5 bg-adminBackground rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-adminPrimary uppercase bg-adminBackground border-b">
          <tr>
            <th scope="col" className="px-4 py-3 text-center">
              Icon
            </th>
            <th scope="col" className="px-4 py-3">
              Category Name
            </th>
            <th scope="col" className="px-4 py-3">
              Parent Category
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {getAllCategory.map((value, index) => {
            const { id, categoryName, parentCategory, categoryImage } = value;
            const actionButtonStyles =
              "inline-flex items-center p-2 m-1 font-medium text-center rounded-full focus:outline-none";
            return (
              <tr key={id} className="border-b align-middle">
                <td className="flex px-4 py-3 items-center justify-around ">
                  <div className="w-12 h-12 text-center rounded-full overflow-hidden border border-adminSecondary">
                    {!(categoryImage === "No Image") ? (
                      <img
                        src={categoryImage}
                        alt={categoryName}
                        className="w-12 h-12"
                      />
                    ) : (
                      <div className="text-xs text-adminSecondary flex text-center align-middle justify-around h-full w-full px-1 py-2 leading-3">
                        No Image
                      </div>
                    )}
                  </div>
                </td>
                <td
                  className="px-4 py-1 font-semibold text-adminPrimary whitespace-nowrap h-full"
                  title={categoryName}
                >
                  {categoryName.length > 30
                    ? categoryName.substring(0, 30) + "..."
                    : categoryName}
                </td>

                <td
                  className="px-4 py-1 font-semibold text-adminPrimary whitespace-nowrap h-full"
                  title={parentCategory}
                >
                  {parentCategory.length > 30
                    ? parentCategory.substring(0, 30) + "..."
                    : parentCategory}
                </td>

                <td>
                  <div className="px-4 py-3 flex items-end align-middle h-full">
                    <button
                      title="Edit Category"
                      id={id}
                      className={actionButtonStyles + " hover:text-accent"}
                      type="button"
                      onClick={() => handleEditCategory(value)}
                    >
                      <FaPencilAlt />
                    </button>

                    <button
                      onClick={() => handleDeleteCategory(id)}
                      title="Delete Category"
                      id={id}
                      className={actionButtonStyles + " hover:text-accent"}
                      type="button"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryDetail;
