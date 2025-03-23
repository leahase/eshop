import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/footer.css"


export const Layout = () => {
    return (
      <>
      <div className="layout">
        <header>
            <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
        </div>
      </>
    );
  };