import React from "react";
import myContext from "../../context/myContext";
import { useContext } from "react";

const AdminTopbar = () => {
  const user = JSON.parse(localStorage.getItem("users"));
  const context = useContext(myContext);
  const { getAllProduct, getAllOrder, getAllUser } = context;
  return (
    <div className=" bg-primary flex justify-between w-full items-center py-2 px-4 border-b border-gray-200 text-center text-adminText font-bold text-xl mb-1">
      <div className="text-lg  text-adminText font-bold ">
        Welcome, {user?.name || "Administrator"}
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium">{user?.email}</div>
        <div className="text-sm font-medium text-secondary">
          {`(${user?.role})`}
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
