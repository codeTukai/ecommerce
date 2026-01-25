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

const AddRAMS = () => {
  const [ramValue, setRamValue] = useState("");
  const [ramList, setRamList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState("");
  const context = useContext(MyContext);

  // ✅ Fetch RAMs
  const getRams = async () => {
    try {
      const res = await fetchDataFromApi(`/api/product/productRAMS/get`);
      if (res?.success) setRamList(res.data);
      else setRamList([]);
    } catch (err) {
      console.error("Failed to fetch RAMs:", err);
      context.alertBox?.("error", "Failed to fetch RAMs");
    }
  };

  // ✅ Create new RAM
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ramValue.trim()) {
      context.alertBox?.("error", "RAM name is required");
      return;
    }

    setLoading(true);

    try {
      if (editId) {
        // Edit existing RAM
        const res = await editData(`/api/product/updateProductRAMS/${editId}`, {
          name: ramValue,
        });

        if (res?.success) {
          context.alertBox?.("success", "RAM updated successfully");
        } else {
          context.alertBox?.("error", res.message || "Failed to update RAM");
        }
      } else {
        // Create new RAM
        const res = await postData(`/api/product/ProductRAMS/create`, {
          name: ramValue,
        });

        if (res?.success) {
          context.alertBox?.("success", "RAM added successfully");
        } else {
          context.alertBox?.("error", res.message || "Failed to create RAM");
        }
      }

      setRamValue("");
      setEditId(""); // Reset to creation mode
      getRams();
    } catch (err) {
      console.error("Submit RAM error:", err);
      context.alertBox?.("error", "Server error while submitting RAM");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete RAM
  const deleteRam = (id) => {
    deleteData(`/api/product/productRAMS/${id}`).then((res) => {
      getRams();
      context.alertBox("success", "RAM deleted");
    });
  };

  useEffect(() => {
    getRams();
  }, []);

  const editRam = (id) => {
    fetchDataFromApi(`/api/product/productRAMS/${id}`).then((res) => {
      setRamValue(res?.data?.name);
      setEditId(res?.data._id);
    });
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl mx-5 mt-6 px-6 py-4 border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Add Product RAMs</h2>
      </div>

      <div className="card my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <form className="form py-3 px-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-sm font-medium mb-3 text-black block">
              PRODUCT RAM
            </label>
            <input
              type="text"
              name="name"
              value={ramValue}
              onChange={(e) => setRamValue(e.target.value)}
              className="w-full h-[40px] border border-gray-300 rounded-sm p-3 text-sm focus:outline-none focus:border-gray-600"
              placeholder="e.g. 8GB, 16GB, etc."
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
                {editId ? "Update RAM" : "Publish and View"}
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
                <th className="px-6 py-3 w-[60%]">Product RAM</th>
                <th className="px-6 py-3 w-[30%] text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {ramList.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-4">
                    No RAMs available.
                  </td>
                </tr>
              ) : (
                ramList.map((ram) => (
                  <tr
                    key={ram._id}
                    className="bg-white border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3 text-center">
                      <Checkbox
                        {...label}
                        size="small"
                        checked={selectedIds.includes(ram._id)}
                        onChange={() =>
                          setSelectedIds((prev) =>
                            prev.includes(ram._id)
                              ? prev.filter((id) => id !== ram._id)
                              : [...prev, ram._id]
                          )
                        }
                      />
                    </td>
                    <td className="px-6 py-3">{ram.name}</td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center items-center gap-2">
                        <Button
                          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                          onClick={() => editRam(ram._id)}
                        >
                          <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                        </Button>
                        <Button
                          className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)]"
                          onClick={() => deleteRam(ram._id)}
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

export default AddRAMS;
