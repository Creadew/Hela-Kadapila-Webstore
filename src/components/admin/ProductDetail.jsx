import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import config from "../../../system.config";
import {
  FaPlusCircle,
  FaSearch,
  FaEye,
  FaPencilAlt,
  FaTrashAlt,
  FaShareAlt,
  FaFilter,
} from "react-icons/fa";

const actionButtonStyles =
  "inline-flex items-center p-2 m-1 font-medium text-center rounded-full focus:outline-none";

const ProductDetail = () => {
  const context = useContext(myContext);
  const {
    loading,
    setLoading,
    getAllProduct,
    getAllProductFunction,
    getAllCategory,
  } = context;

  // navigate
  const navigate = useNavigate();

  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product Deleted successfully");
      getAllProductFunction();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const editProduct = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  return (
    <div>
      {/* Loading  */}
      <div className="flex justify-center relative top-20">
        {loading && <Loader />}
      </div>

      {/* table  */}
      <div className="w-full overflow-x-auto mb-5 bg-adminBackground rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-adminPrimary uppercase bg-adminBackground border-b">
            <tr>
              <th scope="col" className="px-4 py-3">
                Product name
              </th>
              <th scope="col" className="px-4 py-3">
                Category
              </th>
              <th scope="col" className="px-4 py-3">
                Description
              </th>
              <th scope="col" className="px-4 py-3 text-end">
                Price
              </th>
              <th scope="col" className="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {getAllProduct.map((item, index) => (
              <tr key={item.id} className="border-b dark:border-gray-700">
                <th
                  scope="row"
                  className="px-4 py-3 font-semibold text-adminPrimary whitespace-nowrap"
                  title={item.title}
                >
                  {item.title.length > 40
                    ? item.title.substring(0, 40) + "..."
                    : item.title}
                </th>

                <td className="px-4 py-3" title={"Product Category"}>
                  {(() => {
                    const category = getAllCategory.find(
                      (value) =>
                        value.id.toString() === item.category?.toString()
                    );

                    // Check if both category and parentCategory exist
                    const parentCategory = category?.parentCategory;
                    const categoryName = category?.categoryName;

                    return parentCategory
                      ? `${parentCategory} / ${categoryName}`
                      : categoryName;
                  })()}
                </td>

                <td className="px-4 py-3" title={item.description}>
                  {item.description.length > 40
                    ? item.description.substring(0, 40) + "..."
                    : item.description}
                </td>

                <td
                  className="px-4 py-3 text-end"
                  title={`Price is displayed in ${config.mainCurrency}`}
                >
                  {config.currencySign + parseFloat(item.price).toFixed(2)}
                </td>

                <td className="px-4 py-3 flex items-center justify-end">
                  <button
                    title="Click to copy the link of the product"
                    id={item.id}
                    className={actionButtonStyles + " hover:text-accent"}
                    type="button"
                    onClick={() => {
                      console.log(item.id + "Copied");
                    }}
                  >
                    <FaShareAlt />
                  </button>

                  <a
                    href={`/item/${item.id}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <button
                      title="View Product"
                      id={item.id}
                      className={actionButtonStyles + " hover:text-accent"}
                      type="button"
                    >
                      <FaEye />
                    </button>
                  </a>

                  <button
                    title="Edit Product"
                    id={item.id}
                    className={actionButtonStyles + " hover:text-accent"}
                    type="button"
                    onClick={() => editProduct(item.id)}
                  >
                    <FaPencilAlt />
                  </button>

                  <button
                    onClick={() => deleteProduct(item.id)}
                    title="Delete Product"
                    id={item.id}
                    className={actionButtonStyles + " hover:text-accent"}
                    type="button"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
