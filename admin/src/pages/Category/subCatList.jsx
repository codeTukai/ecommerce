import React, { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import {
  Button,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
} from "@mui/material";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";

const columns = [
  { id: "image", label: "IMAGE", minWidth: 100 },
  { id: "categoryName", label: "CATEGORY NAME", minWidth: 150 },
  { id: "subCategoryName", label: "SUB CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const label = { inputProps: { "aria-label": "Select row checkbox" } };

// Sample data
const rows = [
  {
    id: 1,
    imageUrl:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/6.webp",
    categoryName: "Fashion",
    subCategoryName: ["Men", "Women", "Kids"],
  },
  {
    id: 2,
    imageUrl:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/7.webp",
    categoryName: "Fashion",
    subCategoryName: ["Men", "Women", "Kids"],
  },
  {
    id: 3,
    imageUrl:
      "https://isomorphic-furyroad.s3.amazonaws.com/public/products/modern/8.webp",
    categoryName: "Fashion",
    subCategoryName: ["Men", "Women", "Kids"],
  },
];

const SubCategoryList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const context = useContext(MyContext);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="flex items-center justify-between py-0 px-2 mt-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Sub Category List
          <span className="text-[15px] font-[400] ml-2">
            (Material UI table)
          </span>
        </h2>
        <div className="col w-[22%] ml-auto flex items-center gap-3">
          <Button className="btn !bg-green-600 !text-white border-t-neutral-50">
            Export
          </Button>
          <Button
            className="btn !bg-blue-600 !text-white border-t-neutral-50"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New  Sub Category",
              })
            }
          >
            Add New Sub Category
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    width={column.minWidth}
                    align={column.align || "left"}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox {...label} size="small" />
                    </TableCell>

                    {/* Image Cell */}
                    <TableCell>
                      <div className="flex items-center gap-4 w-[80px]">
                        <div className="w-full rounded-md overflow-hidden group">
                          <Link to={`/product/${row.id}`} data-discover="true">
                            <LazyLoadImage
                              src={row.imageUrl}
                              effect="blur"
                              className="w-full group-hover:scale-105 transition-all"
                            />
                          </Link>
                        </div>
                      </div>
                    </TableCell>

                    {/* Category Name */}
                    <TableCell>
                      <span className="text-sm text-gray-800">
                        {row.categoryName}
                      </span>
                    </TableCell>

                    
                    {/* Sub Category Name */}
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {row.subCategoryName.map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-[3px] bg-blue-500 text-white text-sm rounded-full"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </TableCell>

                    {/* Actions */}
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
                        <Tooltip
                          title="View Product Details"
                          placement="top-end"
                        >
                         
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

export default SubCategoryList;
