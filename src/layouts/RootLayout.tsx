import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
