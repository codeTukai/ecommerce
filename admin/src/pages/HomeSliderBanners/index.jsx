import React, { useContext, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa6";
import { AiTwotoneDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Select row checkbox" } };

const columns = [
  { id: "image", label: "IMAGE", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const HomeSliderBanners = () => {
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
          Home Slider Banners{" "}
          <span className="text-[15px] font-[400]">(MUI Table)</span>
        </h2>

        <div className="w-[22%] ml-auto flex items-center gap-3">
          <Button className="!bg-green-600 !text-white">Export</Button>
          <Button
            className="!bg-blue-600 !text-white"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Home Slide",
              })
            }
          >
            <IoMdAdd className="text-white text-[20px]" />
            Add Home Slide
          </Button>
        </div>
      </div>

      <div className="card my-4 pt-5 shadow-md rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="home slider banners table">
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
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>

                {/* IMAGE COLUMN */}
                <TableCell>
                  <div className="flex items-center gap-4 w-[250px]">
                    <div className="w-full rounded-md overflow-hidden">
                      <img
                        src="https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?ga=GA1.1.479220675.1749501540&semt=ais_hybrid&w=740"
                        alt="Home Slide"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>

                {/* ACTION BUTTONS */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip title="Edit Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiOutlineEdit className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="View Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <FaRegEye className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiTwotoneDelete className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>

                {/* IMAGE COLUMN */}
                <TableCell>
                  <div className="flex items-center gap-4 w-[250px]">
                    <div className="w-full rounded-md overflow-hidden">
                      <img
                        src="https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?ga=GA1.1.479220675.1749501540&semt=ais_hybrid&w=740"
                        alt="Home Slide"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>

                {/* ACTION BUTTONS */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip title="Edit Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiOutlineEdit className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="View Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <FaRegEye className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiTwotoneDelete className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>

                {/* IMAGE COLUMN */}
                <TableCell>
                  <div className="flex items-center gap-4 w-[250px]">
                    <div className="w-full rounded-md overflow-hidden">
                      <img
                        src="https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?ga=GA1.1.479220675.1749501540&semt=ais_hybrid&w=740"
                        alt="Home Slide"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>

                {/* ACTION BUTTONS */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip title="Edit Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiOutlineEdit className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="View Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <FaRegEye className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiTwotoneDelete className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Checkbox {...label} size="small" />
                </TableCell>

                {/* IMAGE COLUMN */}
                <TableCell>
                  <div className="flex items-center gap-4 w-[250px]">
                    <div className="w-full rounded-md overflow-hidden">
                      <img
                        src="https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?ga=GA1.1.479220675.1749501540&semt=ais_hybrid&w=740"
                        alt="Home Slide"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </TableCell>

                {/* ACTION BUTTONS */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tooltip title="Edit Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiOutlineEdit className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="View Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <FaRegEye className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete Slide" placement="top">
                      <Button
                        className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                        style={{ minWidth: "35px" }}
                      >
                        <AiTwotoneDelete className="text-gray-700 text-[18px]" />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10} // Replace with actual total rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default HomeSliderBanners;
