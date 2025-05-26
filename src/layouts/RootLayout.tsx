import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import { ScrollRestoration } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="layout-container">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default RootLayout;
