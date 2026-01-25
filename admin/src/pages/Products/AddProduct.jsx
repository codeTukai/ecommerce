import React, { useContext, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { MyContext } from "../../App";
import { fetchDataFromApi, postData, uploadImage } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import UploadBox from "../../Components/UploadBox";

const AddProduct = () => {
  const context = useContext(MyContext);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [ramOptions, setRamOptions] = useState([]);
  const [sizeOptions, setSizeOptions] = useState([]);
  const [weightOptions, setWeightOptions] = useState([]);
  const [previewsFun, setPreviewsFun] = useState();

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    bannerImages: [],
    brand: "",
    price: "",
    oldPrice: "",
    catId: "",
    catName: "",
    subCatId: "",
    subCat: "",
    thirdsubCatId: "",
    thirdsubCat: "",
    countInStock: "",
    rating: 4,
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
    bannerTitleName: "",
  });
  const renderRamOptions = () => {
    return ramOptions.map((item) => (
      <MenuItem key={item._id} value={item.name}>
        {item.name}
      </MenuItem>
    ));
  };

  // ✅ Render Weight options
  const renderWeightOptions = () => {
    return weightOptions.map((item) => (
      <MenuItem key={item._id} value={item.name}>
        {item.name}
      </MenuItem>
    ));
  };

  // ✅ Render Size options
  const renderSizeOptions = () => {
    return sizeOptions.map((item) => (
      <MenuItem key={item._id} value={item.name}>
        {item.name}
      </MenuItem>
    ));
  };

  const setsBannerImagesFun = (previewsArr) => {
  setFormFields((prev) => ({
    ...prev,
    bannerImages: previewsArr,
  }));
};


  useEffect(() => {
    fetchDataFromApi(`/api/product/productRAMS/get`).then((res) => {
      if (res?.success) setRamOptions(res?.data || []);
    });

    fetchDataFromApi(`/api/product/productWeight/get`).then((res) => {
      if (res?.success) setWeightOptions(res?.data || []);
    });

    fetchDataFromApi(`/api/product/productSize/get`).then((res) => {
      if (res?.success) setSizeOptions(res?.data || []);
    });
  }, []);

  

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e, type = "product") => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const filtered = files.filter((file) => validTypes.includes(file.type));

    if (filtered.length === 0) {
      context.alertBox("error", "Only JPEG, PNG, or WEBP images are allowed.");
      return;
    }

    const formData = new FormData();
    filtered.forEach((file) => formData.append("images", file));

    setIsLoading(true);
    try {
      const res = await uploadImage("/api/category/uploadImages", formData);
      const uploaded = res?.data?.images || res?.images || [];

      if (uploaded.length) {
        setFormFields((prev) => ({
          ...prev,
          [type === "banner" ? "bannerImages" : "images"]: [
            ...prev[type === "banner" ? "bannerImages" : "images"],
            ...uploaded,
          ],
        }));
        context.alertBox("success", "Images uploaded successfully");
      } else {
        throw new Error("No images returned from server.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      context.alertBox("error", error?.message || "Upload failed");
    } finally {
      setIsLoading(false);
    }
  };



   const handleBannerImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const filtered = files.filter((file) => validTypes.includes(file.type));

    if (filtered.length === 0) {
      context.alertBox("error", "Only JPEG, PNG, or WEBP images are allowed.");
      return;
    }

    const formData = new FormData();
    filtered.forEach((file) => formData.append("images", file));

    setIsLoading(true);
    try {
      const res = await uploadImage("/api/homeSlides/uploadImages", formData);
      const uploaded = res?.data?.images || res?.images || [];

      if (uploaded.length) {
        setFormFields((prev) => ({
          ...prev,
          bannerImages: [...prev.bannerImages, ...uploaded],
        }));
        context.alertBox("success", "Banner images uploaded successfully");
      } else {
        throw new Error("No banner images returned from server.");
      }
    } catch (err) {
      console.error("Banner upload failed:", err);
      context.alertBox("error", err?.message || "Banner upload failed");
    } finally {
      setIsLoading(false);
    }
  };




  const removeImage = (index) => {
    setFormFields((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  const removeBannerImage = (index) => {
    setFormFields((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // ✅ Render RAM options

    const requiredFields = [
      [formFields.name, "Please enter product name"],
      [formFields.description, "Please enter product description"],
      [formFields.catId, "Please select product category"],
      [formFields.subCatId, "Please select product sub category"],
      [formFields.thirdsubCatId, "Please select product third level category"],
      [formFields.price, "Please enter product price"],
      [formFields.oldPrice, "Please enter old price"],
      [formFields.countInStock, "Please enter product stock"],
      [formFields.brand, "Please enter product brand"],
      [formFields.discount, "Please enter discount"],
    
    ];

    for (const [value, message] of requiredFields) {
      if (!value || value.trim?.() === "") {
        context.alertBox("error", message);
        setIsLoading(false);
        return;
      }
    }

    if (formFields.images.length === 0) {
      context.alertBox("error", "Please upload at least one image");
      setIsLoading(false);
      return;
    }

    if (!formFields.rating || formFields.rating < 1 || formFields.rating > 5) {
      context.alertBox("error", "Please enter a valid product rating (1 to 5)");
      setIsLoading(false);
      return;
    }

    if (formFields.productRam.length === 0) {
      context.alertBox("error", "Please select at least one RAM option");
      setIsLoading(false);
      return;
    }
    if (formFields.productWeight.length === 0) {
      context.alertBox("error", "Please select at least one product weight");
      setIsLoading(false);
      return;
    }
    if (formFields.size.length === 0) {
      context.alertBox("error", "Please select at least one product size");
      setIsLoading(false);
      return;
    }
    if (!formFields.bannerTitleName.trim()) {
  return context.alertBox("error", "Banner title name is required.");
}


    const selectedCategory = context.catData.find(
      (cat) => cat._id === formFields.catId
    );
    const selectedSubCat = selectedCategory?.children?.find(
      (sub) => sub._id === formFields.subCatId
    );
    const selectedThirdSubCat = selectedSubCat?.children?.find(
      (third) => third._id === formFields.thirdsubCatId
    );

    const payload = {
  ...formFields,
  bannerTitleName: "", // Ensure it's not empty
  productRam: formFields.productRam.join(", "),
  productWeight: formFields.productWeight.join(", "),
  size: formFields.size.join(", "),
  catName: selectedCategory?.name || "",
  subCat: selectedSubCat?.name || "",
  thirdsubCat: selectedThirdSubCat?.name || "",
  category: {
    _id: selectedCategory?._id,
    name: selectedCategory?.name,
    createdAt: selectedCategory?.createdAt,
  },
};


    postData("/api/product/create", payload).then((res) => {
      if (res.error === false) {
        context.alertBox("success", res?.message);
        setTimeout(() => {
          setIsLoading(false);
          context.setIsOpenFullScreenPanel({ open: false });
          navigate("/products");
        }, 1000);
      } else {
        setIsLoading(false);
        context.alertBox("error", res?.message);
      }
    });
  };
 
  

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8" onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">
          {/* Name & Description */}
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-sm font-medium mb-1 text-black">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-10 border border-gray-300 rounded-sm p-3 text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-sm font-medium mb-1 text-black">
                Product Description
              </h3>
              <textarea
                className="w-full h-36 border border-gray-300 rounded-sm p-3 text-sm"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          {/* Category & SubCategory */}
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-1">Product Category</h3>
              <Select
                size="small"
                className="w-full"
                value={formFields.catId}
                onChange={(e) =>
                  setFormFields((prev) => ({
                    ...prev,
                    catId: e.target.value,
                    subCatId: "",
                  }))
                }
                displayEmpty
              >
                <MenuItem value="">
                  <em>Choose</em>
                </MenuItem>
                {context.catData?.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-1">Product Subcategory</h3>
              <Select
                size="small"
                className="w-full"
                value={formFields.subCatId}
                onChange={(e) =>
                  setFormFields((prev) => ({
                    ...prev,
                    subCatId: e.target.value,
                  }))
                }
                displayEmpty
              >
                <MenuItem value="">
                  <em>Choose</em>
                </MenuItem>
                {context.catData
                  ?.find((cat) => cat._id === formFields.catId)
                  ?.children?.map((subCat) => (
                    <MenuItem key={subCat._id} value={subCat._id}>
                      {subCat.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-1">
                Product Third Level Category
              </h3>
              <Select
                size="small"
                className="w-full"
                value={formFields.thirdsubCatId}
                onChange={(e) => {
                  const selectedId = e.target.value;

                  const selectedName =
                    context.catData
                      ?.find((cat) => cat._id === formFields.catId)
                      ?.children?.find(
                        (subCat) => subCat._id === formFields.subCatId
                      )
                      ?.children?.find((third) => third._id === selectedId)
                      ?.name || "";

                  setFormFields((prev) => ({
                    ...prev,
                    thirdsubCatId: selectedId,
                    thirdsubCatName: selectedName, // ✅ Store name
                  }));
                }}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Choose</em>
                </MenuItem>
                {context.catData
                  ?.find((cat) => cat._id === formFields.catId)
                  ?.children?.find(
                    (subCat) => subCat._id === formFields.subCatId
                  )
                  ?.children?.map((third) => (
                    <MenuItem key={third._id} value={third._id}>
                      {third.name}
                    </MenuItem>
                  ))}
              </Select>
            </div>

            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Price</h3>
              <input
                type="number"
                name="price"
                className="w-full h-10 border border-gray-300 rounded-sm p-3 text-sm"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Old Price</h3>
              <input
                type="number"
                name="oldPrice"
                className="w-full h-10 border border-gray-300 rounded-sm p-3 text-sm"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>
            <div className="col">
              <h3 className="text-sm font-medium mb-1">Is Featured?</h3>
              <Select
                size="small"
                className="w-full"
                value={formFields.isFeatured ? "true" : "false"}
                onChange={(e) =>
                  setFormFields((prev) => ({
                    ...prev,
                    isFeatured: e.target.value === "true",
                  }))
                }
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Stock</h3>
              <input
                type="number"
                name="countInStock"
                className="w-full h-10 border border-gray-300 rounded-sm p-3 text-sm"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Brand</h3>
              <input
                type="text"
                name="brand"
                className="w-full h-10 border border-gray-300 rounded-sm p-3 text-sm"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Discount</h3>
              <input
                type="number"
                name="discount"
                className="w-full h-10 border border-gray-300 rounded-sm p-3 text-sm"
                value={formFields.discount}
                onChange={onChangeInput}
              />
            </div>
            <div className="col">
               <h3 className="text-sm font-medium mb-1">Product RAM</h3>
              <Select
                multiple
                size="small"
                className="w-full"
                displayEmpty
                value={formFields.productRam}
                onChange={(e) =>
                  setFormFields((prev) => ({
                    ...prev,
                    productRam: Array.isArray(e.target.value)
                      ? e.target.value
                      : e.target.value.split(","),
                  }))
                }
                renderValue={(selected) =>
                  selected.length === 0 ? (
                    <em>Select RAM</em>
                  ) : (
                    selected.join(", ")
                  )
                }
              >
                <MenuItem disabled value="">
                  <em>Select RAM</em>
                </MenuItem>
                {renderRamOptions()}
              </Select>
            </div>

            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Weight</h3>
              <Select
                multiple
                size="small"
                className="w-full"
                displayEmpty
                value={formFields.productWeight}
                onChange={(e) =>
                  setFormFields((prev) => ({
                    ...prev,
                    productWeight: Array.isArray(e.target.value)
                      ? e.target.value
                      : e.target.value.split(","),
                  }))
                }
                renderValue={(selected) =>
                  selected.length === 0 ? (
                    <em>Select Weight</em>
                  ) : (
                    selected.join(", ")
                  )
                }
              >
                <MenuItem disabled value="">
                  <em>Select Weight</em>
                </MenuItem>
                {renderWeightOptions()}
              </Select>
            </div>
            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Size</h3>
              <Select
                multiple
                size="small"
                className="w-full"
                displayEmpty
                value={formFields.size}
                onChange={(e) =>
                  setFormFields((prev) => ({
                    ...prev,
                    size: Array.isArray(e.target.value)
                      ? e.target.value
                      : e.target.value.split(","),
                  }))
                }
                renderValue={(selected) =>
                  selected.length === 0 ? (
                    <em>Select Size</em>
                  ) : (
                    selected.join(", ")
                  )
                }
              >
                <MenuItem disabled value="">
                  <em>Select Size</em>
                </MenuItem>
                {renderSizeOptions()}
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Rating</h3>
              <Rating
                name="rating"
                value={Number(formFields.rating)}
                precision={0.5}
                defaultValue={1}
                onChange={(event, newValue) =>
                  setFormFields((prev) => ({ ...prev, rating: newValue }))
                }
              />
            </div>
          </div>

          {/* Media Uploads */}
          <div className="col w-full p-5 px-0">
            <h3 className="font-bold text-lg mb-2">Media & Images</h3>

            <div className="grid grid-cols-7 gap-4">
              {formFields.images.map((img, i) => (
                <div className="uploadBoxWrapper relative" key={i}>
                  <span
                    onClick={() => removeImage(i)}
                    className="absolute w-5 h-5 bg-red-700 -top-1 -right-1 flex items-center justify-center rounded-full z-50 cursor-pointer"
                  >
                    <IoMdClose className="text-white text-sm" />
                  </span>
                  <div className="uploadbox rounded-md overflow-hidden border border-dashed h-[150px] w-full bg-gray-100 flex items-center justify-center">
                    <LazyLoadImage
                      className="w-full h-full object-cover"
                      alt={`image-${i}`}
                      src={img}
                      effect="blur"
                    />
                  </div>
                </div>
              ))}

              <label className="cursor-pointer flex items-center justify-center border border-dashed h-[150px] w-full bg-gray-100 hover:bg-gray-200 rounded-md">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <FiUpload className="text-xl" />
                  <p className="text-xs">Upload</p>
                </div>
              </label>
            </div>
          </div>
          <div className="col w-full p-5 px-0">
            <h3 className="font-bold text-lg mb-2">Banner Images</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
              {formFields.bannerImages.map((img, i) => (
                <div className="uploadBoxWrapper relative" key={i}>
                  <span
                    onClick={() => removeBannerImage(i)}
                    className="absolute w-5 h-5 bg-red-700 -top-1 -right-1 flex items-center justify-center rounded-full z-50 cursor-pointer"
                  >
                    <IoMdClose className="text-white text-sm" />
                  </span>
                  <div className="uploadbox rounded-md overflow-hidden border border-dashed h-[150px] w-full bg-gray-100 flex items-center justify-center">
                    <LazyLoadImage
                      className="w-full h-full object-cover"
                      alt={`image-${i}`}
                      src={img}
                      effect="blur"
                    />
                  </div>
                </div>
              ))}

              <label className="cursor-pointer flex items-center justify-center border border-dashed h-[150px] w-full bg-gray-100 hover:bg-gray-200 rounded-md">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerImageUpload}
                />
                <div className="flex flex-col items-center gap-2 text-gray-600">
                  <FiUpload className="text-xl" />
                  <p className="text-xs">Upload</p>
                </div>
              </label>
            </div>
          </div>
          {/* <UploadBox
            multiple={true}
            name="bannerImages"
            url="/api/homeSlides/uploadImages"
            setPreviewsFun={setsBannerImagesFun}
          /> */}

        
         <h3 className="font-[700] text-[18px] mb-3">Banner Title</h3>
<input
  label="Banner Title"
  name="bannerTitleName"
  value={formFields.bannerTitleName}
  onChange={(e) =>
    setFormFields((prev) => ({
      ...prev,
      bannerTitleName: e.target.value,
    }))
  }
/>



        </div>

        <hr className="my-4" />
        <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
          {isLoading === true ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              <FaCloudUploadAlt className="text-[25px] text-white" />
              Publish and View
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddProduct;
