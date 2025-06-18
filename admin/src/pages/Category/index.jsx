import React, { useContext, useState } from "react";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { Button, Tooltip, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Checkbox } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const columns = [
  { id: "image", label: "IMAGE", minWidth: 250 },
  { id: "name", label: "CATEGORY NAME", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const label = { inputProps: { "aria-label": "Select row checkbox" } };

// Sample row data
const rows = Array(5).fill({
  id: 45745,
  imageUrl: "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp"
});

const CategoryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const context = useContext(MyContext)

  return (
    <>
      <div className="flex items-center justify-between py-0 px-2 mt-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Category List{" "}
          <span className="text-[15px] font-[400]">(Material UI Table)</span>
        </h2>

        <div className="col w-[22%] ml-auto flex items-center gap-3">
          <Button className="btn !bg-green-600 !text-white border-t-neutral-50">
            Export
          </Button>
          <Button
          className="!bg-blue-600 !text-white"
             onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              })
            }
          >
            Add New Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md sm:rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="category table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} width={column.minWidth}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 w-[80px]">
                      <div className="w-full rounded-md overflow-hidden group">
                        <Link to={`/product/${row.id}`} data-discover="true">
                          <img
                            src={row.imageUrl}
                            className="w-full group-hover:scale-105 transition-all"
                            alt="Product"
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell width={100}>
                    Fashion
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Tooltip title="Edit Product" placement="top-end">
                        <Button
                          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                          style={{ minWidth: "35px" }}
                        >
                          <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                      </Tooltip>

                      <Tooltip title="View Product Details" placement="top-end">
                        <Button
                          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                          style={{ minWidth: "35px" }}
                        >
                          <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                      </Tooltip>

                      <Tooltip title="Remove Product" placement="top-end">
                        <Button
                          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                          style={{ minWidth: "35px" }}
                        >
                          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default CategoryList;
