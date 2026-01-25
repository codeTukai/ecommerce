import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { createContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";



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
import HomeSliderBanners from "./pages/HomeSliderBanners";
import CategoryList from "./pages/Category";
import SubCategoryList from "./pages/Category/subCatList";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Profile from "./pages/profile";
import { fetchDataFromApi } from "./utils/api";
import ProductDetails from "./pages/Products/productDetails";
import AddRAMS from "./pages/Products/addRAMS";
import AddWeight from "./pages/Products/addWeight";
import AddSize from "./pages/Products/addSize";

export const MyContext = createContext();



function App() {
  const [isSidebarOpen, setisSidebarOpen] = useState(true);
  const [isLogin, setisLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isOpenFullScreenPanel, setIsOpenFullScreenPanel] = useState({
    open: false,
    model: "",
  });

  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
  const [productRams, setProductRams] = useState("");
  const [productWeight, setProductWeight] = useState("");
  const [productSize, setProductSize] = useState("");
  const [catData, setCatData] = useState([]);
  const [productList, setProductList] = useState([]);

  // editCategory persist via localStorage
  const [editCategory, setEditCategory] = useState(() => {
    const saved = localStorage.getItem("editCategory");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (editCategory) {
      localStorage.setItem("editCategory", JSON.stringify(editCategory));
    } else {
      localStorage.removeItem("editCategory");
    }
  }, [editCategory]);

  const alertBox = (type, message) => {
    if (type === "success") toast.success(message);
    else if (type === "error") toast.error(message);
    else toast(message);
  };

  const fetchUserDetails = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setisLogin(false);
      setUserData(null);
      return;
    }

    try {
      const res = await fetchDataFromApi("/api/user/user-details");
      if (res?.error === false && res?.data?._id) {
        setisLogin(true);
        setUserData(res.data);
      } else {
        setisLogin(false);
        setUserData(null);
      }
    } catch (err) {
      console.error("Error fetching user details:", err);
      setisLogin(false);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    getCat(); // Load categories with nesting
  }, []);

  // ✅ Fetch and structure categories with subcategories
  const getCat = async () => {
    try {
      const res = await fetchDataFromApi("/api/category");
      if (res?.success && Array.isArray(res?.data)) {
        const all = res.data;

        // Group subcategories under parent categories
        const grouped = all
          .filter((cat) => !cat.parentId) // only top-level
          .map((parent) => ({
            ...parent,
            subCategories: all.filter((sub) => sub.parentId === parent._id),
          }));

        setCatData(grouped);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const values = {
    isSidebarOpen,
    setisSidebarOpen,
    isLogin,
    setisLogin,
    isOpenFullScreenPanel,
    setIsOpenFullScreenPanel,
    alertBox,
    userData,
    setUserData,
    fetchUserDetails,
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
    editCategory,
    setEditCategory,
    catData,
    setCatData,
    getCat,
    productList,
    setProductList,
    
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
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">{children}</div>
      </div>
    </section>
  );

  const withLayout = (PageComponent) => (
    <MainLayout>
      <PageComponent />
    </MainLayout>
  );

 const router = createBrowserRouter([
  { path: "/", element: withLayout(DashBoard) },
  { path: "/login", element: <Login /> },
  
  { path: "/verify", element: <Verify /> },
  { path: "/sign-up", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/change-password", element: <ChangePassword /> },
  { path: "/profile", element: withLayout(Profile) },
  { path: "/products", element: withLayout(Products) },
  { path: "/product/:id", element: withLayout(ProductDetails) },
  { path: "/product/addRams", element: withLayout(AddRAMS) },
  { path: "/product/addWeight", element: withLayout(AddWeight) },
  { path: "/product/addSize", element: withLayout(AddSize) },
 // ✅ NEW: dynamic route
  { path: "/homeSlider/list", element: withLayout(HomeSliderBanners) },
  { path: "/category/list", element: withLayout(CategoryList) },
  { path: "/SubCategory/list", element: withLayout(SubCategoryList) },
  { path: "/users", element: withLayout(Users) },
  { path: "/orders", element: withLayout(Orders) },
]);


  return (
    <MyContext.Provider value={values}>
      <RouterProvider router={router} />

      {/* Full screen Dialog Panel */}
     

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