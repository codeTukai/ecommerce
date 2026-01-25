import React, { useState, PureComponent, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { FaPlus } from "react-icons/fa6";
import DashBoardBoxes from "../../Components/DashboardBoxes";
import Badge from "../../Components/Badge";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";
import Pagination from "@mui/material/Pagination";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaAngleDown,FaAngleUp } from "react-icons/fa";
import CircularProgress from "@mui/material/CircularProgress";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Rating from "@mui/material/Rating";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { MyContext } from "../../App";
import SearchBox from "../../Components/SearchBox";
import { deleteData,fetchDataFromApi } from "../../utils/api";

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 200 },       // Product name + image
  { id: "category", label: "CATEGORY", minWidth: 150 },     // Main category
  { id: "subCategory", label: "SUB-CATEGORY", minWidth: 150 }, // Subcategory
  { id: "brand", label: "BRAND", minWidth: 120 },           // Brand name
  { id: "price", label: "PRICE", minWidth: 100, align: "right" }, // Product price
  { id: "sales", label: "SALES", minWidth: 200, align: "right" }, // Sales count
  { id: "rating", label: "RATING", minWidth: 200, align: "center" }, // Star rating
  { id: "action", label: "ACTION", minWidth: 150, align: "center" }, // Edit/Delete buttons
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const DashBoard = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);
   const context = useContext(MyContext)

  const handleToggleOrderedProduct = (index) => {
    setIsOpenOrderedProduct((prev) => (prev === index ? null : index));
  };

  const [page, setPage] = React.useState(0);




//

const [categoryFilterVal, setCategoryFilterVal] = useState("");
 const [subCategoryFilterVal, setSubCategoryFilterVal] = useState("");
  const [thirdSubCatFilterVal, setThirdSubCatFilterVal] = useState("");
   const [selectedIds, setSelectedIds] = useState([]);
     const [rowsPerPage, setRowsPerPage] = useState(10);
     const [productData, setProductData] = useState([]);
 const [loading, setLoading] = useState(false);





const handleChangeCatFilter = (event) => {
    const selectedCatId = event.target.value;
    setCategoryFilterVal(selectedCatId);
    setLoading(true);
    setSubCategoryFilterVal(""); // Reset sub category when category changes
    setThirdSubCatFilterVal(""); // Reset third-level category

    if (!selectedCatId) {
      getProducts(); // Load all products if "All Categories" selected
      return;
    }

    fetchDataFromApi(`/api/product/getAllProductsByCatId/${selectedCatId}`)
      .then((res) => {
        if (res?.products) {
          setProductData(res.products);
          setTimeout(()=>{

            setLoading(false); // ✅ update loading state after fetching
          }, 300); // ✅ update local product list
        } else {
          setProductData([]);
          context.alertBox("error", "No products found for this category");
        }
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
        context.alertBox("error", "Failed to fetch category products");
      });
  };

  
  const handleChangeSubCatFilter = (event) => {
    const subCatId = event.target.value;
    setSubCategoryFilterVal(subCatId);
    setLoading(true); // ✅ update loading state before fetching
    setThirdSubCatFilterVal("");


    if (!subCatId) {
      getProducts();
      return;
    }

    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${subCatId}`).then(
      (res) => {
        if (res?.error === false) {
          setProductData(res?.products);
          setTimeout(()=>{
            setLoading(false); // ✅ update loading state after fetching
          }, 300);
        } else {
          setProductData([]);
          context.alertBox("error", "No products found");
        }
      }
    );
  };

  const handleChangeThirdSubCatFilter = (event) => {
    const thirdId = event.target.value;
    setThirdSubCatFilterVal(thirdId);
    setLoading(true);

    if (!thirdId) {
      getProducts();
      return;
    }

    fetchDataFromApi(`/api/product/getAllProductsByThirdLavelCat/${thirdId}`)
      .then((res) => {
        if (res?.products?.length > 0) {
          setProductData(res.products);
          setTimeout(() => {
            setLoading(false); // ✅ update loading state after fetching
          }, 300); // ✅ update local product list
        } else {
          setProductData([]);
          context.alertBox("error", "No products found");
        }
      })
      .catch((err) => {
        console.error("Third-Level Fetch error:", err);
        context.alertBox("error", "Failed to fetch products");
      });
  };


 const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi("/api/product/getAllProducts");
      if (res?.error === false) {
        setProductData(res.products);
      } else {
        setProductData([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductData([]);
    } finally {
      setLoading(false);
    }
  };


  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    const confirm = window.confirm("Delete selected products?");
    if (!confirm) return;

    try {
      const res = await deleteData("/api/product/deleteMultiple", {
        ids: selectedIds,
      });

      if (res.success) {
        context.alertBox("success", res.message);
        setSelectedIds([]);
        getProducts(); // Refresh table
      } else {
        context.alertBox("error", res.message || "Deletion failed");
      }
    } catch (err) {
      console.error("❌ Deletion error:", err);
      context.alertBox("error", "Something went wrong.");
    }
  };
  
  

   useEffect(() => {
      getProducts();
    }, [context?.isOpenFullScreenPanel]);

     const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
      const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const deleteProduct = async (id) => {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete this product?"
        );
        if (!confirmDelete) return;
    
        try {
          const res = await deleteData(`/api/product/${id}`);
          if (res?.success) {
            getProducts();
          } else {
            console.warn("Product deletion failed:", res);
          }
        } catch (err) {
          console.error("❌ Error deleting product:", err);
        }
      };

  const [chart1Data, setChart1Data] = useState([
    {
      name: "JAN",
      TotalSales: 4000,
     TotalUsers: 2400,
      amt: 2400,
    },
    {
      name: "FEB",
      TotalSales: 3000,
     TotalUsers: 1398,
      amt: 2210,
    },
    {
      name: "MAR",
      TotalSales: 2000,
     TotalUsers: 9800,
      amt: 2290,
    },
    {
      name: "APRIL",
      TotalSales: 2780,
     TotalUsers: 3908,
      amt: 2000,
    },
    {
      name: "MAY",
      TotalSales: 1890,
     TotalUsers: 4800,
      amt: 2181,
    },
    {
      name: "JUNE",
      TotalSales: 2390,
     TotalUsers: 3800,
      amt: 2500,
    },
    {
      name: "JULY",
      TotalSales: 3490,
     TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "AUG",
      TotalSales: 3490,
     TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "SEPT",
      TotalSales: 3490,
     TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "OCT",
      TotalSales: 3490,
     TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "NOV",
      TotalSales: 3490,
     TotalUsers: 4300,
      amt: 2100,
    },
    {
      name: "DEC",
      TotalSales: 5644,
     TotalUsers: 4360,
      amt: 2100,
    },
  ]);
  return (
    <>
      {/* Greeting Section */}
      <div className="w-full px-5 py-4 bg-white shadow-sm rounded-lg mb-6 flex flex-wrap items-center justify-between">
        {/* Left: Greeting */}
        <div className="info max-w-[55%]">
          <h1 className="text-xl font-semibold text-gray-800">
            Good Morning, <span className="text-indigo-600">Cameron 👋</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Here's what’s happening on your store today. See the statistics at
            once.
          </p>

          <div className="mt-4">
            <Button
              variant="contained"
              startIcon={<FaPlus />}
              sx={{
                backgroundColor: "#4f46e5",
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#4338ca",
                },
              }}
              onClick={()=>context.setIsOpenFullScreenPanel({open:true, model:'Add product'})}
            >
              Add Product
            </Button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex items-end justify-end w-[300px] h-[180px]">
          <img
            src="Dashboard.png"
            alt="Dashboard Illustration"
            className="w-full object-contain"
          />
        </div>
      </div>

      {/* Dashboard Widgets */}
      <DashBoardBoxes />

      {/* Products Table */}
      {/* <div className="card my-4 shadow-md rounded-lg bg-white">
        <div className="flex items-center justify-between py-5 px-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Products<span className="text-[15px]">(Tailwindcss table)</span>
          </h2>
        </div>
        <div className="flex items-center w-full p-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={categoryFilterVal}
              label="Category"
              onChange={handleChangeCatFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[22%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white border-t-neutral-50">
              Export
            </Button>
            <Button className="btn !bg-blue-600 !text-white border-t-neutral-50"
            onClick={()=>context.setIsOpenFullScreenPanel({open:true, model:'Add product'})}
            
            >
              Add Product
            </Button>
          </div>
        </div>

        <div className="relative overflow-x-auto pt-5 pb-5">
          <table className="w-full text-sm text-left text-gray-700 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3 w-[50px] text-center">
                  <Checkbox {...label} size="small" />
                </th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Sub Category</th>
                <th className="px-6 py-3">Brand</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Sales</th>

                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
              <tr className="bg-white border-b hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-center">
                  <Checkbox {...label} size="small" />
                </td>

                <td className="px-6 py-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-3">Smartphones</td>
                <td className="px-6 py-3">Android</td>
                <td className="px-6 py-3">Motorola</td>
                <td className="px-6 py-3 font-medium text-gray-800">₹24,999</td>

                <td className="px-6 py-3 w-[180px]">
                  <p className="text-sm mb-1">
                    <span className="font-semibold">234</span> sales
                  </p>
                  <Progress value={80} type="warning" />
                </td>
                <td className="px-6 py-2">
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end mt-4 mb-4">
          <Pagination count={10} color="primary" />
        </div>
      </div> */}

      <div>
       <div className="flex flex-wrap items-center w-full p-5 justify-between gap-6">
        {/* Category Filter */}
        <div className="w-full sm:w-[250px]">
          <h4 className="font-semibold text-sm mb-2">Category By</h4>
          {Array.isArray(context?.catData) && context.catData.length > 0 && (
            <Select
              fullWidth
              size="small"
              style={{ zoom: "80%" }}
              className="w-full"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
              displayEmpty
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {context.catData.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>

        {/* Subcategory Filter */}
        <div className="w-full sm:w-[250px]">
          <h4 className="font-semibold text-sm mb-2">Sub-Category By</h4>
          <Select
            fullWidth
            className="w-full"
            style={{ zoom: "80%" }}
            size="small"
            value={subCategoryFilterVal}
            onChange={handleChangeSubCatFilter}
            displayEmpty
            disabled={!categoryFilterVal} // Disable when no category is selected
          >
            <MenuItem value="">
              <em>All Subcategories</em>
            </MenuItem>
            {context.catData
              ?.find((cat) => cat._id === categoryFilterVal)
              ?.children?.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.name}
                </MenuItem>
              ))}
          </Select>
        </div>

        {/* Third-Level Category Filter */}
        <div className="w-full sm:w-[250px]">
          <h4 className="font-semibold text-sm mb-2">
            Third Level Category By
          </h4>
          <Select
            fullWidth
            className="w-full"
            style={{ zoom: "80%" }}
            size="small"
            value={thirdSubCatFilterVal}
            onChange={handleChangeThirdSubCatFilter}
            displayEmpty
            disabled={!subCategoryFilterVal} // disable until subcategory selected
          >
            <MenuItem value="">
              <em>All Third-Level</em>
            </MenuItem>

            {context.catData
              ?.find((cat) => cat._id === categoryFilterVal)
              ?.children?.find((sub) => sub._id === subCategoryFilterVal)
              ?.children?.map((third) => (
                <MenuItem key={third._id} value={third._id}>
                  {third.name}
                </MenuItem>
              ))}
          </Select>
        </div>

        {/* Search */}
        <div className="col w-[20%] ml-auto">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">
            Search Products
          </h4>
          <SearchBox />
        </div>
     

      <TableContainer
        sx={{ maxHeight: 500 }}
        className="overflow-x-auto bg-white rounded-md shadow"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  {...label}
                  size="small"
                  checked={
                    selectedIds.length === productData.length &&
                    productData.length > 0
                  }
                  indeterminate={
                    selectedIds.length > 0 &&
                    selectedIds.length < productData.length
                  }
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    if (isChecked) {
                      setSelectedIds(productData.map((p) => p._id));
                    } else {
                      setSelectedIds([]);
                    }
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

       <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={columns.length + 1} align="center">
        <div className="py-10">
          <CircularProgress color="primary" />
        </div>
      </TableCell>
    </TableRow>
  ) : productData && productData.length > 0 ? (
    productData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((product, index) => (
        <TableRow key={product._id || index}>
          <TableCell>
            <Checkbox
              {...label}
              size="small"
              checked={selectedIds.includes(product._id)}
              onChange={() => handleCheckboxChange(product._id)}
            />
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-8">
              <div className="w-full h-full rounded-md overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center">
  <LazyLoadImage
    src={
      product?.images?.length > 0
        ? product.images[0]
        : product?.category?.images?.[0] || "/no-image.png"
    }
    alt={product.name}
    effect="blur"
    className="w-full h-full object-cover"
  />
</div>

              <div>
                <Link
                  to={`/product/${product._id}`}
                  className="text-gray-800 font-medium hover:text-indigo-500"
                >
                  {product.name}
                </Link>
                <p className="text-gray-500 text-xs">
                  {Array.isArray(product.productRam)
                    ? product.productRam.join(", ")
                    : product.productRam || "N/A"}{" "}
                  |{" "}
                  {Array.isArray(product.size)
                    ? product.size.join(", ")
                    : product.size || "N/A"}
                </p>
              </div>
            </div>
          </TableCell>

          <TableCell align="left">{product.catName || "N/A"}</TableCell>
          <TableCell align="left">{product.subCat || "N/A"}</TableCell>
          <TableCell align="left">{product.brand || "N/A"}</TableCell>
          <TableCell align="right">
            <div className="flex flex-col items-end">
              <span className="text-black font-medium">
                ₹{product?.price?.toLocaleString() || "0"}
              </span>
              {product?.oldPrice > product?.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{product.oldPrice.toLocaleString()}
                </span>
              )}
            </div>
          </TableCell>

          <TableCell align="right">
            <p className="text-sm mb-1">
              <span className="font-semibold">{product.sale || 0}</span> sales
            </p>
          </TableCell>
          <TableCell align="right">
            <p className="text-sm mb-1">
              <Rating
                name="half-rating"
                size="small"
                defaultValue={product?.rating}
               
              />
            </p>
          </TableCell>

          <TableCell align="center">
            <div className="flex justify-center items-center gap-2">
              <Button
                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border"
                onClick={() =>
                  context.setIsOpenFullScreenPanel({
                    open: true,
                    model: "Edit Product",
                    id: product._id,
                  })
                }
              >
                <AiOutlineEdit className="text-[18px]" />
              </Button>

              <Link to={`/product/${product._id}`}>
                <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border">
                  <IoEyeOutline className="text-[18px]" />
                </Button>
              </Link>

              <Button
                className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border"
                onClick={() => deleteProduct(product._id)}
              >
                <AiTwotoneDelete className="text-[18px]" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))
  ) : (
    <TableRow>
      <TableCell colSpan={columns.length + 1} align="center">
        No products found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

        </Table>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={productData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
       </div>
        <div className="flex items-center w-full p-5 justify-between pr-5">
          <div className="col w-[20%]">
            <h4 className="font-[600] text-[13px] mb-2">Category By</h4>
            <Select
              className="w-full"
              size="small"
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={categoryFilterVal}
              label="Category"
              onChange={handleChangeCatFilter}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Men</MenuItem>
              <MenuItem value={20}>Women</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
              <MenuItem value={30}>Kids</MenuItem>
            </Select>
          </div>

          <div className="col w-[22%] ml-auto flex items-center gap-3">
            <Button className="btn !bg-green-600 !text-white border-t-neutral-50">
              Export
            </Button>
            <Button className="btn !bg-blue-600 !text-white border-t-neutral-50"
            onClick={()=>context.setIsOpenFullScreenPanel({open:true, model:'Add product'})}
            >
              Add Product
            </Button>
          </div>
        </div>
        <br />

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-4">
                    <div className="w-[65px] h-[65px] rounded-md overflow-hidden border">
                      <img
                        src="https://api.spicezgold.com/download/file_1734771942206_motorola-edge-50-fusion-5g-hot-pink-256-gb-12-gb-ram-product-images-orvvh2thgzw-p609069813-1-202405250532.webp"
                        alt="Motorola Edge 50"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-[100px]">
                      <Link
                        to="/product/45745"
                        className="text-gray-800 font-medium hover:text-indigo-500"
                      >
                        Motorola Edge 50
                      </Link>
                      <p className="text-gray-500 text-xs">256GB | 12GB RAM</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>Smartphone</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">Android</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    Motorola
                  </p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center justify-between flex-col px-8 gap-5">
                    <span className="price text-[14px] font-[600]">
                      ₹24,999
                    </span>
                  </div>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="text-[14px] w-[100px]">
                    <span className="font-[600]">234</span> sales
                  </p>
                  <Progress value={40} type="success" />
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <div className="flex items-center gap-2">
                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>

                    <Button
                      className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                      style={{ minWidth: "35px" }}
                    >
                      <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>


   
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">&nbsp;</th>
                    <th className="px-6 py-3 whitespace-nowrap">Order Id</th>
                    <th className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                    <th className="px-6 py-3 whitespace-nowrap">Name</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">Address</th>
                    <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">Email</th>
                    <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      Order Status
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Order Row */}
                  <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4">
                      <Button
                        className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => handleToggleOrderedProduct(0)}
                      >
                        {isOpenOrderedProduct === 0 ? (
                          <FaAngleUp className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        ) : (
                          <FaAngleDown className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        )}
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-red-400">ORD12345</td>
                    <td className="px-6 py-4 text-red-400">PAY56789</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">9876543210</td>
                    <td className="px-6 py-4">123 Street, City</td>
                    <td className="px-6 py-4">400001</td>
                    <td className="px-6 py-4">₹1,499</td>
                    <td className="px-6 py-4">john@example.com</td>
                    <td className="px-6 py-4 text-red-400">USR123</td>
                    <td className="px-6 py-4">
                      <Badge status="confirm" />
                    </td>
                    <td className="px-6 py-4">2025-06-01</td>
                  </tr>

                  {/* Nested Product Table */}
                  {isOpenOrderedProduct === 0 && (
                    <tr>
                      <td colSpan={12} className="pl-20">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                              <tr>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Id
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Title
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Image
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Quantity
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Price
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Sub Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}




                     <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4">
                      <Button
                        className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => handleToggleOrderedProduct(1)}
                      >
                        {isOpenOrderedProduct === 1 ? (
                          <FaAngleUp className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        ) : (
                          <FaAngleDown className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        )}
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-red-400">ORD12345</td>
                    <td className="px-6 py-4 text-red-400">PAY56789</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">9876543210</td>
                    <td className="px-6 py-4">123 Street, City</td>
                    <td className="px-6 py-4">400001</td>
                    <td className="px-6 py-4">₹1,499</td>
                    <td className="px-6 py-4">john@example.com</td>
                    <td className="px-6 py-4 text-red-400">USR123</td>
                    <td className="px-6 py-4">
                      <Badge status="confirm" />
                    </td>
                    <td className="px-6 py-4">2025-06-01</td>
                  </tr>

                  {/* Nested Product Table */}
                  {isOpenOrderedProduct === 1 && (
                    <tr>
                      <td colSpan={12} className="pl-20">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                              <tr>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Id
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Title
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Image
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Quantity
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Price
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Sub Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>




        
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>











      

<div className="card my-4 shadow-md sm:rounded-lg bg-white">
  {/* Title */}
  <div className="px-5 pt-5">
    <h2 className="text-[18px] font-[600] mb-2">Total Users & Total Sales</h2>
  </div>

  {/* Indicators */}
  <div className="flex items-center gap-4 px-5 pb-5">
    <span className="flex items-center gap-2 text-[15px] text-gray-700 font-medium">
      <span className="block w-[8px] h-[8px] rounded-full bg-green-500"></span>
      Total Users
    </span>

    <span className="flex items-center gap-2 text-[15px] text-gray-700 font-medium">
      <span className="block w-[8px] h-[8px] rounded-full bg-blue-500"></span>
      Total Sales
    </span>
  </div>


        <LineChart
          width={1000}
          height={500}
          data={chart1Data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="none" />
          <XAxis dataKey="name" tick={{ fontSize: 12}} />
          <YAxis tick={{ fontSize: 12}}/>
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="TotalUsers" stroke="#82ca9d"  strokeWidth={3}/>
        </LineChart>
      </div>
    </>
  );
};

export default DashBoard;