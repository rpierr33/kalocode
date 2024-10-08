import "./App.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import SinglePortfolio from "./pages/SinglePortfolio";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import ChatWidget from "./utils/chartAgent";
import Admin from "./pages/Admin";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: "/pricing",
    element: (
      <Layout>
        <Pricing />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: "/portfolio",
    element: (
      <Layout>
        <Portfolio />
      </Layout>
    ),
  },
  {
    path: "/single-portfolio/:id",
    element: (
      <Layout>
        <SinglePortfolio />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
  },
]);

function App() {
  const noMessagesPages = ["/login", "/admin"];
  const currentPath = window.location.pathname; // Get the current path

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      anchorPlacement: "top-center",
    });
  }, []);

  return (
    <div className="App">
      {/* Conditionally render ChatWidget based on the current path */}
      {!noMessagesPages.includes(currentPath) && <ChatWidget />}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
