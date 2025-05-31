import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import { ProductDetails } from './pages/ProductDetails';
import Login from "./pages/Login";
import Register from "./pages/Register";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { MdClose } from "react-icons/md";

import { ProductZoom } from "./components/ProductZoom";
import ProductDetailsComponent from './components/ProductDetails';

const ProductModalContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);

  const handleClosesProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const contextValue = {
    setOpenProductDetailsModal,
    handleClosesProductDetailsModal,
  };

  return (
    <BrowserRouter>
      <ProductModalContext.Provider value={contextValue}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductListing" element={<ProductListing />} />
          <Route path="/Product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
        <ProductDetailsDialog open={openProductDetailsModal} />
      </ProductModalContext.Provider>
    </BrowserRouter>
  );
}

function ProductDetailsDialog({ open }) {
  const context = useContext(ProductModalContext);
  if (!context) throw new Error("Must use within ProductModalContext.Provider");

  const { handleClosesProductDetailsModal } = context;

  return (
    <Dialog
      open={open}
      onClose={handleClosesProductDetailsModal}
      fullWidth
      maxWidth="lg"
      aria-labelledby="product-details-dialog"
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
  );
}

export default App;
export { ProductModalContext };
