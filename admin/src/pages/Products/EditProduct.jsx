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
import { editData, fetchDataFromApi, uploadImage } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import UploadBox from "../../Components/UploadBox";

const EditProduct = () => {
  const context = useContext(MyContext);
  const [previewsFun, setPreviewsFun] = useState();
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    image: [],
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
    productRam: [], // ✅ must be an array
    size: [], // ✅ must be an array
    productWeight: [],
    bannerImages: [],
    bannerTitleName: "",
  });


 useEffect(() => {
  const id = context?.isOpenFullScreenPanel?.id;
  if (!id) return;

  fetchDataFromApi(`/api/product/${id}`).then((res) => {
    if (res?.product) {
      const BASE_IMAGE_URL =
        "https://dyzqdxtcy.cloudinary.com/myshop123/image/upload/";

      const product = res.product;

      // ✅ Set form fields
setFormFields({
  name: product?.name || "",
  description: product?.description || "",

  image: Array.isArray(product?.images)
    ? product.images.map((img) =>
        typeof img === "string" && img.startsWith("http")
          ? img
          : `${BASE_IMAGE_URL}${img}`
      )
    : [],

  bannerImages: Array.isArray(product?.bannerImages)
    ? product.bannerImages.map((img) =>
        typeof img === "string" && img.startsWith("http")
          ? img
          : `${BASE_IMAGE_URL}${img}`
      )
    : [],

  brand: product?.brand || "",
  price: product?.price || "",
  oldPrice: product?.oldPrice || "",

  catId: product?.catId || "",
  catName: product?.catName || "",

  subCatId: product?.subCatId || "",
  subCat: product?.subCat || "",

  thirdsubCatId: product?.thirdsubCatId || "",
  thirdsubCat: product?.thirdsubCat || "",

  countInStock: product?.countInStock || "",
  rating: typeof product?.rating === "number" ? product.rating : 0,
  isFeatured: !!product?.isFeatured,
  discount: product?.discount || "",

  productRam: Array.isArray(product?.productRam)
    ? product.productRam
    : typeof product?.productRam === "string"
    ? product.productRam.split(",").map((x) => x.trim())
    : [],

  size: Array.isArray(product?.size)
    ? product.size
    : typeof product?.size === "string"
    ? product.size.split(",").map((x) => x.trim())
    : [],

  productWeight: Array.isArray(product?.productWeight)
    ? product.productWeight
    : typeof product?.productWeight === "string"
    ? product.productWeight.split(",").map((x) => x.trim())
    : [],

  bannerTitleName: product?.bannerTitleName || "",
});





      // ✅ Also set the `images` state used for uploading
      const formattedImages = (product.images || []).map((img) =>
        img.startsWith("http") ? img : `${BASE_IMAGE_URL}${img}`
      );
      setImages(formattedImages); // ✅ sets previewable Cloudinary URLs
    }
  });
}, [context?.isOpenFullScreenPanel?.id]);


  // 🔁 Add this dependency so it runs on ID change

  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };



const handleImageUpload = async (e) => {
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
    const res = await uploadImage("/api/product/uploadImages", formData); // ✅ use product endpoint
    const uploaded = res?.data?.images || res?.images || [];

    if (uploaded.length) {
      setFormFields((prev) => ({
        ...prev,
        image: [...prev.image, ...uploaded],
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
  const filteredFiles = files.filter((file) => validTypes.includes(file.type));

  if (filteredFiles.length === 0) {
    context.alertBox("error", "Only JPEG, PNG, or WEBP images are allowed.");
    return;
  }

  const formData = new FormData();
  filteredFiles.forEach((file) => formData.append("images", file));

  setIsLoading(true);

  try {
    const res = await uploadImage("/api/homeSlides/uploadImages", formData);

    // Fallback to multiple potential response formats
    const uploadedImages = res?.data?.images || res?.images || res?.uploaded || [];

    if (uploadedImages.length > 0) {
      setFormFields((prev) => ({
        ...prev,
        bannerImages: [...(prev.bannerImages || []), ...uploadedImages],
      }));
      context.alertBox("success", "Banner images uploaded successfully");
    } else {
      throw new Error("No images returned from server.");
    }
  } catch (error) {
    console.error("Banner Upload Error:", error);
    context.alertBox("error", error?.message || "Banner image upload failed");
  } finally {
    setIsLoading(false);
  }
};











  const removeImage = (index) => {
    setFormFields((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };
  const removeBannerImage = (index) => {
    setFormFields((prev) => ({
      ...prev,
      image: prev.image.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

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

    if (formFields.image.length === 0) {
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

  images: formFields.image, // required for backend
  bannerImages: formFields.bannerImages, // optional, if used

  productRam: formFields.productRam.join(", "), // backend expects string
  size: formFields.size.join(", "),
  productWeight: formFields.productWeight.join(", "),

  catName: selectedCategory?.name || formFields.catName,
  subCat: selectedSubCat?.name || formFields.subCat,
  thirdsubCat: selectedThirdSubCat?.name || formFields.thirdsubCat,

  category: {
    _id: selectedCategory?._id || formFields.catId,
    name: selectedCategory?.name || formFields.catName,
    createdAt: selectedCategory?.createdAt || "",
  },
};



    // ✅ Fixed endpoint with slash before ID
    const productId = context?.isOpenFullScreenPanel?.id;

    editData(`/api/product/updateProduct/${productId}`, payload).then((res) => {
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

const handleRemoveBannerImage = (index) => {
  setFormFields((prev) => ({
    ...prev,
    bannerImages: prev.bannerImages.filter((_, i) => i !== index),
  }));
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
                value={formFields.productRam || []} // ✅ Always an array
                onChange={(e) => {
                  const value = e.target.value;
                  setFormFields((prev) => ({
                    ...prev,
                    productRam: Array.isArray(value) ? value : [value],
                  }));
                }}
                renderValue={(selected) =>
                  Array.isArray(selected) && selected.length > 0 ? (
                    selected.join(", ")
                  ) : (
                    <em>Select RAM</em>
                  )
                }
              >
                <MenuItem disabled value="">
                  <em>Select RAM</em>
                </MenuItem>
                <MenuItem value="4GB">4GB</MenuItem>
                <MenuItem value="6GB">6GB</MenuItem>
                <MenuItem value="8GB">8GB</MenuItem>
                <MenuItem value="12GB">12GB</MenuItem>
                <MenuItem value="16GB">16GB</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Weight</h3>
              <Select
                multiple
                size="small"
                className="w-full"
                displayEmpty
                value={
                  Array.isArray(formFields.productWeight)
                    ? formFields.productWeight
                    : []
                }
                onChange={(e) => {
                  const value = e.target.value;
                  setFormFields((prev) => ({
                    ...prev,
                    productWeight: Array.isArray(value) ? value : [value],
                  }));
                }}
                renderValue={(selected) =>
                  Array.isArray(selected) && selected.length > 0 ? (
                    selected.join(", ")
                  ) : (
                    <em>Select Weight</em>
                  )
                }
              >
                <MenuItem disabled value="">
                  <em>Select Weight</em>
                </MenuItem>
                <MenuItem value="2KG">2KG</MenuItem>
                <MenuItem value="4KG">4KG</MenuItem>
                <MenuItem value="5KG">5KG</MenuItem>
              </Select>
            </div>
            <div className="col">
              <h3 className="text-sm font-medium mb-1">Product Size</h3>
              <Select
                multiple
                size="small"
                className="w-full"
                displayEmpty
                value={Array.isArray(formFields.size) ? formFields.size : []}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormFields((prev) => ({
                    ...prev,
                    size: Array.isArray(value) ? value : [value],
                  }));
                }}
                renderValue={(selected) =>
                  Array.isArray(selected) && selected.length > 0 ? (
                    selected.join(", ")
                  ) : (
                    <em>Select Size</em>
                  )
                }
              >
                <MenuItem disabled value="">
                  <em>Select Size</em>
                </MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
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
                onChange={(event, newValue) =>
                  setFormFields((prev) => ({
                    ...prev,
                    rating: newValue !== null ? Number(newValue) : 0,
                  }))
                }
              />
            </div>
          </div>

          {/* Media Uploads */}
          <div className="col w-full p-5 px-0">
            <h3 className="font-bold text-lg mb-2">Media & Images</h3>

            <div className="grid grid-cols-7 gap-4">
              {formFields.image.map((img, i) => (
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

                <UploadBox
              multiple={false}
              onChange={handleImageUpload}
              url="/api/product/uploadImages"
            />

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

          {/* banner images */}
       <div className="col w-full p-5 px-0">
  <h3 className="font-bold text-lg mb-2">Banner Images</h3>

  <div className="grid grid-cols-7 gap-4">
    {(formFields?.bannerImages || []).map((img, i) => (
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
            alt={`banner-${i}`}
            src={img}
            effect="blur"
          />
        </div>
      </div>
    ))}

    {/* UploadBox for banner images */}
    <UploadBox
      multiple={true}
      onChange={handleBannerImageUpload}
      url="/api/homeSlides/uploadImages"
    />

    {/* Backup manual upload input (optional) */}
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



       


          {/* <div className="grid grid-cols-7 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative h-[150px]">
                <span
                  onClick={() => removeImage(index)}
                  className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                >
                  <IoMdClose className="text-white text-[17px]" />
                </span>
                <div className="uploadbox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-full w-full bg-gray-100 flex items-center justify-center relative">
                  <LazyLoadImage
                    className="w-full h-full object-cover"
                    alt={`category-image-${index}`}
                    effect="blur"
                    src={img}
                  />
                </div>
              </div>
            ))}

            <UploadBox
              multiple={true}
              onChange={handleImageUpload}
              url="/api/product/uploadImages"
            />
          </div> */}
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

export default EditProduct;
