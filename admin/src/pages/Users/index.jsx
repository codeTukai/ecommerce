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
  { id: "image", label: "USER IMAGE", minWidth: 150 },
  { id: "name", label: "USER NAME", minWidth: 150 },
  { id: "email", label: "EMAIL", minWidth: 150, align: "right" },
  { id: "number", label: "PH-NUMBER", minWidth: 80, align: "right" },

];

const Users = () => {
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
         

       
         <h2 className="text-[40px] font-bold text-gray-800">
            Users List{" "}
            <span className="text-sm font-medium text-gray-500 ml-2">
              (Material UI Table)
            </span>
          </h2>

        <div className="flex flex-wrap items-center w-full p-5 justify-between gap-4">
          
          <div className="col w-[20%] ml-auto">
            <h4 className="font-semibold text-sm text-gray-700 mb-2">
              Search Products
            </h4>
            <SearchBox />
          </div>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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
                        src="https://mui.com/static/images/avatar/1.jpg"
                   
                        className="w-full h-full object-cover"
                      />
                    </div>
                  
                  </div>
                </TableCell>

                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p>John Deo</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="px-8">user@gmail.com</p>
                </TableCell>
                <TableCell style={{ minWidth: columns.minWidth }}>
                  <p className="flex items-center px-0 justify-between">
                    +91-8754854456
                  </p>
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

export default Users;
