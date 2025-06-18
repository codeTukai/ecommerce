import React, { useState, PureComponent, useContext } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { FaPlus } from "react-icons/fa6";

import Badge from "../../Components/Badge";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { AiTwotoneDelete } from "react-icons/ai";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 150 },
  { id: "subCategory", label: "SUB-CATEGORY", minWidth: 150, align: "right" },
  { id: "brand", label: "BRAND", minWidth: 80, align: "right" },
  { id: "price", label: "PRICE", minWidth: 80, align: "right" },
  { id: "sales", label: "SALES", minWidth: 150, align: "right" },
  { id: "action", label: "ACTION", minWidth: 150, align: "right" },
];

const Products = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

    const context = useContext(MyContext);

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const handleToggleOrderedProduct = (index) => {
    setIsOpenOrderedProduct((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <div>
        <div className="bg-white shadow-md rounded-xl mx-5 mt-6 px-6 py-4 border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">
            Products{" "}
            <span className="text-sm font-medium text-gray-500 ml-2">
              (Material UI Table)
            </span>
          </h2>

          <div className="flex gap-3 ml-auto">
            <Button
              variant="contained"
              className="!bg-green-600 !text-white normal-case shadow-sm hover:shadow-md"
            >
              Export
            </Button>
            <Button
              variant="contained"
              className="!bg-blue-600 !text-white normal-case shadow-sm hover:shadow-md"
              onClick={()=>context.setIsOpenFullScreenPanel({open:true, model:'Add product'})}
            >
              Add Product
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap items-center w-full p-5 justify-between gap-4">
          <div className="w-full sm:w-[250px]">
            <h4 className="font-semibold text-sm mb-2">Category By</h4>
            <Select
              fullWidth
              size="small"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
              displayEmpty
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
            </Select>
          </div>
          <div className="col w-[20%] ml-auto">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">
              Search Products
            </h4>
            <SearchBox />
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
            </TableBody>
          </Table>
        </TableContainer>

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
    </>
  );
};

export default Products;
