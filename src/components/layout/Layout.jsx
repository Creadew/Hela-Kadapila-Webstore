import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-bgGray main-content min-h-screen  h-full scrollbar-thumb-primary scrollbar-track-secondary">
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
