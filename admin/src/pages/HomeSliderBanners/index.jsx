import React, { useContext, useEffect, useState } from "react";
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
  CircularProgress,
} from "@mui/material";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";

const label = { inputProps: { "aria-label": "Select row checkbox" } };

const columns = [
  { id: "image", label: "IMAGE", minWidth: 250 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const HomeSliderBanners = () => {
  const context = useContext(MyContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [slideData, setSlideData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch slider data
  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi(`/api/homeSlides`);
      setSlideData(res?.data || []);
    } catch (error) {
      console.error("Failed to fetch home slides:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [context?.isOpenFullScreenPanel]);

  // ✅ Checkbox: individual row
  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // ✅ Checkbox: delete selected
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    const confirm = window.confirm("Delete selected slides?");
    if (!confirm) return;

    try {
      const res = await deleteData("/api/homeSlides/deleteMultipleSlides", {
        ids: selectedIds,
      });
      if (res.success) {
        context.alertBox("success", res.message);
        setSelectedIds([]);
        getData(); // Refresh
      } else {
        context.alertBox("error", res.message || "Deletion failed");
      }
    } catch (err) {
      console.error("❌ Deletion error:", err);
      context.alertBox("error", "Something went wrong.");
    }
  };

  // ✅ Checkbox: delete single slide
  const deleteSlide = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this slide?");
    if (!confirm) return;
    try {
      await deleteData(`/api/homeSlides/${id}`);
      getData();
    } catch (err) {
      console.error("Error deleting slide:", err);
    }
  };

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
          Home Slider Banners
        </h2>

        <div className="w-[22%] ml-auto flex items-center gap-3">
          <Button
            className="!bg-red-600 !text-white"
            disabled={selectedIds.length === 0}
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </Button>
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
                  <Checkbox
                    {...label}
                    size="small"
                    checked={selectedIds.length === slideData.length && slideData.length > 0}
                    indeterminate={
                      selectedIds.length > 0 && selectedIds.length < slideData.length
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      if (checked) {
                        setSelectedIds(slideData.map((item) => item._id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} width={column.minWidth}>
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
                      <CircularProgress />
                    </div>
                  </TableCell>
                </TableRow>
              ) : slideData?.length > 0 ? (
                slideData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={item._id || index}>
                      <TableCell>
                        <Checkbox
                          {...label}
                          size="small"
                          checked={selectedIds.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                        />
                      </TableCell>

                      {/* IMAGE */}
                      <TableCell>
                        <div className="flex items-center gap-4 w-[250px]">
                          <div className="w-[80px] rounded-md overflow-hidden">
                            <img
                              src={item?.images?.[0] || "/no-image.png"}
                              alt="slide"
                              className="w-full group-hover:scale-105 transition-all"
                            />
                          </div>
                        </div>
                      </TableCell>

                      {/* ACTION */}
                      <TableCell>
                        <div className ="flex items-center gap-2">
                          <Tooltip title="Edit Slide" placement="top">
                            <Button
                              className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                              style={{ minWidth: "35px" }}
                            >
                              <AiOutlineEdit className="text-gray-700 text-[18px]" />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Delete Slide" placement="top">
                            <Button
                              className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-gray-400"
                              style={{ minWidth: "35px" }}
                              onClick={() => deleteSlide(item._id)}
                            >
                              <AiTwotoneDelete className="text-gray-700 text-[18px]" />
                            </Button>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No slides found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={slideData.length}
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
