import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
