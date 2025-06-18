import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { MdOutlineClose } from "react-icons/md";

// Layout Components
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";

// Pages
import DashBoard from "./pages/Dashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Verify from "./pages/Verify";
import ChangePassword from "./pages/ChangePassword";
import Products from "./pages/Products";
import AddProduct from "./pages/Products/AddProduct";
import HomeSliderBanners from "./pages/HomeSliderBanners";
import AddHomeSlide from "./pages/HomeSliderBanners/AddHomeSlide";
import CategoryList from "./pages/Category";
import AddCategory from "./pages/Category/addCategory";
import SubCategoryList from "./pages/Category/subCatList";
import AddSubCategory from "./pages/Category/addSubCategory";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import { fetchDataFromApi } from "./utils/api";

export const MyContext = createContext();

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
  });
  
    const [userData, setUserData] = useState(null);

  // Product attributes (shared state across pages if needed)
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productRams, setProductRams] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");

  // Global alert box (toast)
  const alertBox = (type, message) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else toast(message);
  };

   const fetchUserDetails = () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      setIsLogin(false);
      setUserData(null);
      return;
    }
  
    fetchDataFromApi("/api/user/user-details")
      .then((res) => {
        if (res?.error === false) {
          setIsLogin(true);
          setUserData(res.data);
        } else {
          setIsLogin(false);
          setUserData(null);
        }
      })
      .catch(() => {
        setIsLogin(false);
        setUserData(null);
      });
  };
  useEffect(() => {
      fetchUserDetails();
    }, []); // ✅ Run once on mount

  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setIsLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    alertBox,

    productCat,
    setProductCat,
    productSubCat,
    setProductSubCat,
    productFeatured,
    setProductFeatured,
    productRams,
    setProductRams,
    productWeight,
    setProductWeight,
    productSize,
    setProductSize,
  };

  const MainLayout = ({ children }) => (
    <section className="main h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-300 bg-white shadow-md h-full ${
            isSidebarOpen ? "w-[240px]" : "w-[60px]"
          }`}
        >
          <Sidebar isCollapsed={!isSidebarOpen} />
        </div>
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {children}
        </div>
      </div>
    </section>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MyContext.Provider value={values}>
          <MainLayout>
            <DashBoard />
          </MainLayout>
        </MyContext.Provider>
      ),
    },
    { path: "/login", element: <Login /> },
    { path: "/verify", element: <Verify /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/change-password", element: <ChangePassword /> },

    {
      path: "/products",
      element: (
        <MyContext.Provider value={values}>
          <MainLayout>
            <Products />
          </MainLayout>
        </MyContext.Provider>
      ),
    },
    {
      path: "/homeSlider/list",
      element: (
        <MyContext.Provider value={values}>
          <MainLayout>
            <HomeSliderBanners />
          </MainLayout>
        </MyContext.Provider>
      ),
    },
    {
      path: "/category/list",
      element: (
        <MyContext.Provider value={values}>
          <MainLayout>
            <CategoryList />
          </MainLayout>
        </MyContext.Provider>
      ),
    },
    {
      path: "/SubCategory/list",
      element: (
        <MyContext.Provider value={values}>
          <MainLayout>
            <SubCategoryList />
          </MainLayout>
        </MyContext.Provider>
      ),
    },
    {
      path: "/users",
      element: (
        <MyContext.Provider value={values}>
          <MainLayout>
            <Users />
          </MainLayout>
        </MyContext.Provider>
      ),
    },
    {
      path: "/orders",
      element: (
        <MyContext.Provider value={values}>
          <MainLayout>
            <Orders />
          </MainLayout>
        </MyContext.Provider>
      ),
    },
  ]);

  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />

      {/* Fullscreen Dialog Panel for Add Actions */}
      <Dialog
        fullScreen
        open={isOpenFullScreenPanel.open}
        onClose={() => setIsOpenFullScreenPanel({ open: false })}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setIsOpenFullScreenPanel({ open: false })}
              aria-label="close"
            >
              <MdOutlineClose />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <span className="text-white">
                {isOpenFullScreenPanel?.model}
              </span>
            </Typography>
          </Toolbar>
        </AppBar>

        {isOpenFullScreenPanel?.model === "Add Product" && <AddProduct />}
        {isOpenFullScreenPanel?.model === "Add Home Slide" && <AddHomeSlide />}
        {isOpenFullScreenPanel?.model === "Add New Category" && <AddCategory />}
        {isOpenFullScreenPanel?.model === "Add New  Sub Category" && (
          <AddSubCategory />
        )}
      </Dialog>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </MyContext.Provider>
  );
}

export default App;