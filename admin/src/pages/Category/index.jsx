import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@mui/material";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MyContext } from "../../App";
import { fetchDataFromApi, deleteData } from "../../utils/api";

const columns = [
  { id: "image", label: "IMAGE", minWidth: 250 },
  { id: "name", label: "CATEGORY NAME", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const label = { inputProps: { "aria-label": "Select row checkbox" } };

const CategoryList = () => {
  const context = useContext(MyContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteCat = async (id) => {
    await deleteData(`/api/category/${id}`);
    const res = await fetchDataFromApi("/api/category");
    context?.setCatData(res?.data);
  };

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res?.data);
    });
  }, [context?.isOpenFullScreenPanel]);

  return (
    <>
      <div className="flex items-center justify-between py-0 px-2 mt-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Category List {" "}
          <span className="text-[15px] font-[400]">(Material UI Table)</span>
        </h2>
        <div className="col w-[22%] ml-auto flex items-center gap-3">
          <Button className="btn !bg-green-600 !text-white">Export</Button>
          <Button
            className="!bg-blue-600 !text-white"
            onClick={() => {
              context.setEditCategory(null); // Reset editing state
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              });
            }}
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
              {context?.catData?.length > 0 ? (
                context.catData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={row._id || index}>
                      <TableCell>
                        <Checkbox {...label} size="small" />
                      </TableCell>

                      {/* Image Cell */}
                      <TableCell>
                        <div className="flex items-center gap-4 w-[80px]">
                          <div className="w-full rounded-md overflow-hidden group">
                            <Link to={`/product/${row._id}`} data-discover="true">
                              <img
                                src={row.imageUrl || row.images?.[0]}
                                className="w-full group-hover:scale-105 transition-all"
                                alt="Category"
                              />
                            </Link>
                          </div>
                        </div>
                      </TableCell>

                      {/* Name Cell */}
                      <TableCell width={100}>{row.name}</TableCell>

                      {/* Action Buttons */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Tooltip title="Edit Category" placement="top-end">
                            <Button
                              onClick={() => {
                                context.setEditCategory(row);
                                context.setIsOpenFullScreenPanel({
                                  open: true,
                                  model: "Edit Category",
                                });
                              }}
                              className="!w-[35px] !h-[35px] bg-[#f1f1f1]"
                            >
                              <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                            </Button>
                          </Tooltip>
                          <Tooltip title="View Details" placement="top-end">
                            <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1]">
                              <IoEyeOutline className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete Category" placement="top-end">
                            <Button
                              onClick={() => deleteCat(row._id)}
                              className="!w-[35px] !h-[35px] bg-[#f1f1f1]"
                            >
                              <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[18px]" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No categories found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={context?.catData?.length || 0}
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