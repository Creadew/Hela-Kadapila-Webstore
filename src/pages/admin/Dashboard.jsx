import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { useContext } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
const Dashboard = () => {
  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser, loading } = context;
  return (
    <AdminLayout>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-adminBackground p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl text-secondary">
              {getAllProduct.length || 0}
            </h3>
            <p className="text-adminText">Products</p>
          </div>
          <div className="bg-adminBackground p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl text-secondary">{0}</h3>
            <p className="text-adminText">Categories</p>
          </div>
          <div className="bg-adminBackground p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl text-secondary">
              {getAllUser.length || 0}
            </h3>
            <p className="text-adminText">Customers</p>
          </div>
          <div className="bg-adminBackground p-4 rounded-lg shadow-sm">
            <h3 className="text-2xl text-secondary">
              {getAllOrder.length || 0}
            </h3>
            <p className="text-adminText">Orders</p>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center relative top-20 w-full">
            <Loader />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
