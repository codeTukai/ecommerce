import React, { useState, createContext, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import { ProductDetails } from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/Cart";
import Verify from "./pages/Verify";
import ForgotPassword from "./pages/ForgotPassword";
import Checkout from "./pages/Checkout";
import MyAccount from "./pages/MyAccount";
import MyList from "./pages/MyList";
import Orders from "./pages/Orders";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { MdClose } from "react-icons/md";
import Drawer from "@mui/material/Drawer";
import { IoCloseOutline } from "react-icons/io5";

import { ProductZoom } from "./components/ProductZoom";
import ProductDetailsComponent from "./components/ProductDetails";
import CartPanel from "./components/CartPanel";

import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromApi } from "./utils/api";

// Contexts
const ProductModalContext = createContext();
const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userData, setUserData] = useState(null);
  const [openCartPanel, setOpenCartPanel] = useState(false);

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

  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    if (status === "error") toast.error(msg);
  };

  const modalContextValue = {
    setOpenProductDetailsModal,
    handleClosesProductDetailsModal: () => setOpenProductDetailsModal(false),
    openCartPanel,
    setOpenCartPanel,
    toggleCartPanel: (newOpen) => () => setOpenCartPanel(newOpen),
  };

  const myContextValue = {
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    refreshUserData: fetchUserDetails, // ✅ Optional: Call this after login/register
    setOpenCartPanel,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={myContextValue}>
          <ProductModalContext.Provider value={modalContextValue}>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ProductListing" element={<ProductListing />} />
              <Route path="/Product/:id" element={<ProductDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/my-list" element={<MyList />} />
              <Route path="/my-orders" element={<Orders />} />
            </Routes>
            <Footer />
            <ProductDetailsDialog open={openProductDetailsModal} />
          </ProductModalContext.Provider>
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

function ProductDetailsDialog({ open }) {
  const context = useContext(ProductModalContext);
  if (!context) throw new Error("Must use within ProductModalContext.Provider");

  const { handleClosesProductDetailsModal, openCartPanel, toggleCartPanel } = context;

  return (
    <>
      {/* Product Details Modal */}
      <Dialog
        open={open}
        onClose={handleClosesProductDetailsModal}
        fullWidth
        maxWidth="lg"
        className="productDetailsModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="!w-[40px] h-[40px] !min-w-[40px] !rounded-full text-[#000] !absolute top-[15px] right-[15px] !bg-[#f1f1f1]"
              onClick={handleClosesProductDetailsModal}
            >
              <MdClose className="text-[20px]" />
            </Button>
            <div className="col1 w-[40%] px-3">
              <ProductZoom />
            </div>
            <div className="col2 w-[60%] p-8 px-8 pr-16 productContent">
              <ProductDetailsComponent />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cart Drawer */}
      <Drawer
        open={openCartPanel}
        onClose={toggleCartPanel(false)}
        anchor="right"
        className="cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4>Shopping Cart</h4>
          <IoCloseOutline
            className="text-[20px] bg-[#fff] cursor-pointer"
            onClick={toggleCartPanel(false)}
          />
        </div>
        <CartPanel />
      </Drawer>
    </>
  );
}

export default App;
export { ProductModalContext, MyContext };
