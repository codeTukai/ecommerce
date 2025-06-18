import React, { useState, PureComponent, useContext } from "react";
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

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 150 },
  {
    id: "sub-category",
    label: "SUB-CATEGORY",
    minWidth: 150,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "brand",
    label: "BRAND",

    minWidth: 80,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "price",
    label: "PRICE",
    minWidth: 80,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "sales",
    label: "SALES",
    minWidth: 150,
    align: "right",
    format: (value) => value.toFixed(2),
  },

  {
    id: "action",
    label: "ACTION",
    minWidth: 150,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];
function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const DashBoard = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const handleToggleOrderedProduct = (index) => {
    setIsOpenOrderedProduct((prev) => (prev === index ? null : index));
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [categoryFilterVal, setcategoryFilterVal] = React.useState("");

  const handleChangeCatFilter = (event) => {
    setcategoryFilterVal(event.target.value);
  };

  const context = useContext(MyContext)

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
      <div className="card my-4 shadow-md rounded-lg bg-white">
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
      </div>

      <div>
        <div className="flex items-center justify-between py-5 px-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Products
            <span className="text-[15px] font-[400]">(Materialui table)</span>
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
