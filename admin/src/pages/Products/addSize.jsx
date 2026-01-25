import React, { useState, useEffect, useContext } from "react";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import Checkbox from "@mui/material/Checkbox";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import {
  fetchDataFromApi,
  postData,
  deleteData,
  editData,
} from "../../utils/api";
import { MyContext } from "../../App";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AddSize = () => {
  const [ramValue, setRamValue] = useState("");
  const [ramList, setRamList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const context = useContext(MyContext);

  // ✅ Fetch RAMs
  const getRams = async () => {
    try {
      const res = await fetchDataFromApi(`/api/product/productSize/get`);
      if (res?.success) setRamList(res.data);
      else setRamList([]);
    } catch (err) {
      console.error("Failed to fetch Sizes:", err);
      context.alertBox?.("error", "Failed to fetch Sizes");
    }
  };

  // ✅ Create new RAM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ramValue.trim()) {
      context.alertBox?.("error", "Size name is required");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        // Edit existing RAM
        const res = await editData(`/api/product/updateProductSize/${editId}`, {
          name: ramValue,
        });

        if (res?.success) {
          context.alertBox?.("success", "Size updated successfully");
        } else {
          context.alertBox?.("error", res.message || "Failed to update Size");
        }
      } else {
        // Create new RAM
        const res = await postData(`/api/product/productSize/create`, {
          name: ramValue,
        });

        if (res?.success) {
          context.alertBox?.("success", "Size added successfully");
        } else {
          context.alertBox?.("error", res.message || "Failed to create Size");
        }
      }

      setRamValue("");
      setEditId(""); // Reset to creation mode
      getRams();
    } catch (err) {
      console.error("Submit Size error:", err);
      context.alertBox?.("error", "Server error while submitting Size");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete RAM
  const deleteRam = (id) => {
    deleteData(`/api/product/productSize/${id}`).then((res) => {
      getRams();
      context.alertBox("success", "Size deleted");
    });
  };

  useEffect(() => {
    getRams();
  }, []);

  const editRam = (id) => {
    fetchDataFromApi(`/api/product/productSize/${id}`).then((res) => {
      setRamValue(res?.data?.name);
      setEditId(res?.data?._id);
    });
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl mx-5 mt-6 px-6 py-4 border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Add Product Sizes</h2>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <form className="form py-3 px-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium mb-3 text-black block">
              PRODUCT SIZE
            </label>
            <input
              type="text"
              name="name"
              value={ramValue}
              onChange={(e) => setRamValue(e.target.value)}
              className="w-full h-[40px] border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-gray-600"
              placeholder="e.g. S, M, XL, etc."
            />
          </div>

          <Button
            type="submit"
            className="btn-blue btn-lg w-full flex gap-2 !bg-blue-600 !text-white"
          >
            {loading === true ? (
              <CircularProgress color="inherit" />
            ) : (
              <>
                <FaCloudUploadAlt className="text-[25px] text-white" />
                {editId ? "Update SIZE" : "Publish and View"}
              </>
            )}
          </Button>
        </form>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <div className="relative overflow-x-auto pt-5 pb-5">
          <table className="w-full text-sm text-left text-gray-700 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 w-[10%]">
                  <Checkbox
                    {...label}
                    size="small"
                    checked={
                      selectedIds.length === ramList.length &&
                      ramList.length > 0
                    }
                    indeterminate={
                      selectedIds.length > 0 &&
                      selectedIds.length < ramList.length
                    }
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setSelectedIds(
                        isChecked ? ramList.map((r) => r._id) : []
                      );
                    }}
                  />
                </th>
                <th className="px-6 py-3 w-[60%]">Product Size</th>
                <th className="px-6 py-3 w-[30%] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {ramList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No Sizes available.
                  </td>
                </tr>
              ) : (
                ramList.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3 text-center">
                      <Checkbox
                        {...label}
                        size="small"
                        checked={selectedIds.includes(item._id)}
                        onChange={() =>
                          setSelectedIds((prev) =>
                            prev.includes(item._id)
                              ? prev.filter((id) => id !== item._id)
                              : [...prev, item._id]
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-3">{item.name}</td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                          onClick={() => editRam(item._id)}
                        >
                          <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                        </Button>
                        <Button
                          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                          onClick={() => deleteRam(item._id)}
                        >
                          <AiTwotoneDelete className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddSize;
