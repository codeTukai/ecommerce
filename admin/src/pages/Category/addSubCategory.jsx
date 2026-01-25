import React, { useState, useContext } from "react";
import {
  Button,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddSubCategory = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const [formFields2, setFormFields2] = useState({
    name: "",
    parentCatName: null,
    parentId: null,
  });

  const [productCat, setProductCat] = useState("");
  const [productCat2, setProductCat2] = useState("");
  const [isLoading, setIsLoading] = useState({ sub: false, third: false });

  const context = useContext(MyContext);
  const navigate = useNavigate();

  // 🌱 Sub-category
  const handleChangeProductCat = (event) => {
    const selectedId = event.target.value;
    const selectedCategory = context.catData.find(
      (cat) => cat._id === selectedId
    );
    setProductCat(selectedId);
    setFormFields((prev) => ({
      ...prev,
      parentId: selectedId,
      parentCatName: selectedCategory?.name || null,
    }));
  };

  // 🌿 Third-level category
  const handleChangeProductCat2 = (event) => {
    const selectedId = event.target.value;
    const subcategory = context.catData
      .flatMap((cat) => cat.children || [])
      .find((sub) => sub._id === selectedId);

    setProductCat2(selectedId);
    setFormFields2((prev) => ({
      ...prev,
      parentId: selectedId,
      parentCatName: subcategory?.name || null,
    }));
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChangeInput2 = (e) => {
    const { name, value } = e.target;
    setFormFields2((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitSubCategory = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, sub: true }));

    if (formFields.name.trim() === "" || !formFields.parentId) {
      context.alertBox("error", "Fill in all fields for sub-category");
      setIsLoading((prev) => ({ ...prev, sub: false }));
      return;
    }

    const payload = { ...formFields, images: [] };
    try {
      const res = await postData("/api/category/create", payload);
      if (res?.success) {
        context.alertBox("success", "Sub-category created!");
        setFormFields({ name: "", parentCatName: null, parentId: null });
        setProductCat("");
        context.getCat();
        
      } else {
        context.alertBox("error", res?.message);
      }
    } catch (err) {
      console.error(err);
      context.alertBox("error", "Server error");
    } finally {
      setIsLoading((prev) => ({ ...prev, sub: false }));
    }
  };

  const submitThirdCategory = async (e) => {
    e.preventDefault();
    setIsLoading((prev) => ({ ...prev, third: true }));

    if (formFields2.name.trim() === "" || !formFields2.parentId) {
      context.alertBox("error", "Fill in all fields for 3rd-level category");
      setIsLoading((prev) => ({ ...prev, third: false }));
      return;
    }

    const payload = { ...formFields2, images: [] };
    try {
      const res = await postData("/api/category/create", payload);
      if (res?.success) {
        context.alertBox("success", "3rd-level category created!");
        setFormFields2({ name: "", parentCatName: null, parentId: null });
        setProductCat2("");
        context.getCat();
        navigate("/SubCategory/list"); // ← add this line
      } else {
        context.alertBox("error", res?.message);
      }
    } catch (err) {
      console.error(err);
      context.alertBox("error", "Server error");
    } finally {
      setIsLoading((prev) => ({ ...prev, third: false }));
    }
  };

  return (
    <section className="p-5 bg-green-50 grid grid-cols-2 gap-4">
      {/* Add Sub-category */}
      <form
        className="bg-white p-6 rounded shadow"
        onSubmit={submitSubCategory}
      >
        <h3 className="font-semibold mb-4">Add Sub-Category</h3>
        <FormControl fullWidth size="small" className="mb-4">
          <Select
            value={productCat}
            displayEmpty
            onChange={handleChangeProductCat}
          >
            <MenuItem value="" disabled>
              -- Select Parent Category --
            </MenuItem>
            {context?.catData?.map((cat) => (
              <MenuItem key={cat._id} value={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="text"
          name="name"
          value={formFields.name}
          onChange={onChangeInput}
          placeholder="Sub-category name"
          className="w-full h-[40px] border p-3 text-sm mb-4 rounded-sm"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading.sub}
        >
          {isLoading.sub ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <>
              <FaCloudUploadAlt className="mr-2" /> Publish
            </>
          )}
        </Button>
      </form>

      {/* Add 3rd-level category */}
      <form
        className="bg-white p-6 rounded shadow"
        onSubmit={submitThirdCategory}
      >
        <h3 className="font-semibold mb-4">Add 3rd-Level Category</h3>
        <FormControl fullWidth size="small" className="mb-4">
          <Select
            value={productCat2}
            displayEmpty
            onChange={handleChangeProductCat2}
          >
            <MenuItem value="" disabled>
              -- Select Sub-Category --
            </MenuItem>
            {context?.catData?.flatMap(
              (cat) =>
                cat.children?.map((sub) => (
                  <MenuItem key={sub._id} value={sub._id}>
                    {cat.name} → {sub.name}
                  </MenuItem>
                )) || []
            )}
          </Select>
        </FormControl>

        <input
          type="text"
          name="name"
          value={formFields2.name}
          onChange={onChangeInput2}
          placeholder="3rd-level category name"
          className="w-full h-[40px] border p-3 text-sm mb-4 rounded-sm"
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isLoading.third}
        >
          {isLoading.third ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <>
              <FaCloudUploadAlt className="mr-2" /> Publish
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddSubCategory;
