import AdminNav from "./AdminNav";
import AdminTopbar from "./AdminTopbar";
const AdminLayout = ({ children }) => {
  return (
    <div className="bg-background main-content min-h-screen  h-full scrollbar-thumb-primary scrollbar-track-secondary">
      <div className="flex flex-col md:flex-row h-screen">
        <AdminNav />
        <div className="flex flex-col min-w-[75vw] w-full">
          <AdminTopbar />
          <div className="flex-grow px-4 py-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
