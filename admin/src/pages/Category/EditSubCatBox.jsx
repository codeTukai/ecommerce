import React, { useContext, useEffect, useState } from "react";
import { Button, MenuItem, Select } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { MyContext } from "../../App";
import { editData, deleteData } from "../../utils/api";

const EditSubCatBox = ({ name, id, parentId, parentCatName, catData }) => {
  const context = useContext(MyContext);

  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState({
    name: name || "",
    parentId: parentId || "",
    parentCatName: parentCatName || "",
  });

  useEffect(() => {
    setFormFields({
      name: name || "",
      parentId: parentId || "",
      parentCatName: parentCatName || "",
    });
  }, [name, parentId, parentCatName]);

  const handleChange = (e) => {
    const selectedId = e.target.value;
    const selectedItem = catData.find((item) => item._id === selectedId);
    setFormFields((prev) => ({
      ...prev,
      parentId: selectedId,
      parentCatName: selectedItem?.name || "",
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const deleteCat = async () => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      setIsLoading(true);
      const res = await deleteData(`/api/category/${id}`);
      context.alertBox("success", res?.message || "Category deleted successfully.");
      context.getCat();
    } catch (err) {
      context.alertBox("error", err?.message || "Delete failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formFields.name.trim()) {
      context.alertBox("error", "Please enter subcategory name.");
      return;
    }

    try {
      setIsLoading(true);
      const res = await editData(`/api/category/${id}`, formFields);
      context.alertBox("success", res?.data?.message || "Updated successfully");
      context.getCat();
      setEditMode(false);
    } catch (err) {
      context.alertBox("error", err?.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full flex items-center gap-3" onSubmit={handleSubmit}>
      {editMode ? (
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full">
          <div className="w-full sm:w-[150px]">
            <Select
              size="small"
              value={formFields.parentId}
              onChange={handleChange}
              displayEmpty
              className="w-full"
            >
              <MenuItem value="" disabled>Select Parent</MenuItem>
              {catData?.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </div>

          <input
            type="text"
            name="name"
            value={formFields.name}
            onChange={onChangeInput}
            placeholder="Subcategory Name"
            className="flex-1 h-[34px] border border-gray-300 px-2 rounded text-sm"
          />

          <Button
            variant="contained"
            size="small"
            className="!bg-blue-600 !text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={() => setEditMode(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-between gap-2">
          <span className="font-medium text-sm">{name}</span>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              size="small"
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full"
              onClick={() => setEditMode(true)}
            >
              <MdOutlineModeEdit />
            </Button>
            <Button
              size="small"
              className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full"
              onClick={deleteCat}
              disabled={isLoading}
            >
              <FaRegTrashAlt />
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default EditSubCatBox;
