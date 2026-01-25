import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
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
  Select,
  MenuItem,
} from "@mui/material";
import { AiOutlineEdit, AiTwotoneDelete } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi, postData } from "../../utils/api";

import CircularProgress from "@mui/material/CircularProgress";
import Rating from "@mui/material/Rating";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 200 }, // Product name + image
  { id: "category", label: "CATEGORY", minWidth: 150 }, // Main category
  { id: "subCategory", label: "SUB-CATEGORY", minWidth: 150 }, // Subcategory
  { id: "brand", label: "BRAND", minWidth: 120 }, // Brand name
  { id: "price", label: "PRICE", minWidth: 100, align: "right" }, // Product price
  { id: "sales", label: "SALES", minWidth: 200, align: "right" }, // Sales count
  { id: "rating", label: "RATING", minWidth: 200, align: "center" }, // Star rating
  { id: "action", label: "ACTION", minWidth: 150, align: "center" }, // Edit/Delete buttons
];

const Products = () => {
  const context = useContext(MyContext);
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [productData, setProductData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [subCategoryFilterVal, setSubCategoryFilterVal] = useState("");
  const [thirdSubCatFilterVal, setThirdSubCatFilterVal] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeCatFilter = (event) => {
    const selectedCatId = event.target.value;
    setCategoryFilterVal(selectedCatId);
    setLoading(true);
    setSubCategoryFilterVal(""); // Reset sub category when category changes
    setThirdSubCatFilterVal(""); // Reset third-level category

    if (!selectedCatId) {
      getProducts(); // Load all products if "All Categories" selected
      return;
    }

    fetchDataFromApi(`/api/product/getAllProductsByCatId/${selectedCatId}`)
      .then((res) => {
        if (res?.products) {
          setProductData(res.products);
          setTimeout(() => {
            setLoading(false); // ✅ update loading state after fetching
          }, 300); // ✅ update local product list
        } else {
          setProductData([]);
          context.alertBox("error", "No products found for this category");
        }
      })
      .catch((err) => {
        console.error("Category fetch error:", err);
        context.alertBox("error", "Failed to fetch category products");
      });
  };

  const handleChangeSubCatFilter = (event) => {
    const subCatId = event.target.value;
    setSubCategoryFilterVal(subCatId);
    setLoading(true); // ✅ update loading state before fetching
    setThirdSubCatFilterVal("");

    if (!subCatId) {
      getProducts();
      return;
    }

    fetchDataFromApi(`/api/product/getAllProductsBySubCatId/${subCatId}`).then(
      (res) => {
        if (res?.error === false) {
          setProductData(res?.products);
          setTimeout(() => {
            setLoading(false); // ✅ update loading state after fetching
          }, 300);
        } else {
          setProductData([]);
          context.alertBox("error", "No products found");
        }
      }
    );
  };

  const handleChangeThirdSubCatFilter = (event) => {
    const thirdId = event.target.value;
    setThirdSubCatFilterVal(thirdId);
    setLoading(true);

    if (!thirdId) {
      getProducts();
      return;
    }

    fetchDataFromApi(`/api/product/getAllProductsByThirdLavelCat/${thirdId}`)
      .then((res) => {
        if (res?.products?.length > 0) {
          setProductData(res.products);
          setTimeout(() => {
            setLoading(false); // ✅ update loading state after fetching
          }, 300); // ✅ update local product list
        } else {
          setProductData([]);
          context.alertBox("error", "No products found");
        }
      })
      .catch((err) => {
        console.error("Third-Level Fetch error:", err);
        context.alertBox("error", "Failed to fetch products");
      });
  };

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await fetchDataFromApi("/api/product/getAllProducts");
      if (res?.error === false) {
        setProductData(res.products);
      } else {
        setProductData([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProductData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    const confirm = window.confirm("Delete selected products?");
    if (!confirm) return;

    try {
      const res = await deleteData("/api/product/deleteMultiple", {
        ids: selectedIds,
      });

      if (res.success) {
        context.alertBox("success", res.message);
        setSelectedIds([]);
        getProducts(); // Refresh table
      } else {
        context.alertBox("error", res.message || "Deletion failed");
      }
    } catch (err) {
      console.error("❌ Deletion error:", err);
      context.alertBox("error", "Something went wrong.");
    }
  };

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const res = await deleteData(`/api/product/${id}`);
      if (res?.success) {
        getProducts();
      } else {
        console.warn("Product deletion failed:", res);
      }
    } catch (err) {
      console.error("❌ Error deleting product:", err);
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-xl mx-5 mt-6 px-6 py-4 border border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-800">Products</h2>

        <div className="flex gap-3 ml-auto">
          <Button
            variant="outlined"
            className="!text-red-600 normal-case shadow-sm hover:shadow-md"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
          >
            Delete Selected
          </Button>

          <Button
            variant="contained"
            className="!bg-green-600 !text-white normal-case shadow-sm hover:shadow-md"
          >
            Export
          </Button>
          <Button
            variant="contained"
            className="!bg-blue-600 !text-white normal-case shadow-sm hover:shadow-md"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center w-full p-5 justify-between gap-6">
        {/* Category Filter */}
        <div className="w-full sm:w-[250px]">
          <h4 className="font-semibold text-sm mb-2">Category By</h4>
          {Array.isArray(context?.catData) && context.catData.length > 0 && (
            <Select
              fullWidth
              size="small"
              style={{ zoom: "80%" }}
              className="w-full"
              value={categoryFilterVal}
              onChange={handleChangeCatFilter}
              displayEmpty
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {context.catData.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>

        {/* Subcategory Filter */}
        <div className="w-full sm:w-[250px]">
          <h4 className="font-semibold text-sm mb-2">Sub-Category By</h4>
          <Select
            fullWidth
            className="w-full"
            style={{ zoom: "80%" }}
            size="small"
            value={subCategoryFilterVal}
            onChange={handleChangeSubCatFilter}
            displayEmpty
            disabled={!categoryFilterVal} // Disable when no category is selected
          >
            <MenuItem value="">
              <em>All Subcategories</em>
            </MenuItem>
            {context.catData
              ?.find((cat) => cat._id === categoryFilterVal)
              ?.children?.map((sub) => (
                <MenuItem key={sub._id} value={sub._id}>
                  {sub.name}
                </MenuItem>
              ))}
          </Select>
        </div>

        {/* Third-Level Category Filter */}
        <div className="w-full sm:w-[250px]">
          <h4 className="font-semibold text-sm mb-2">
            Third Level Category By
          </h4>
          <Select
            fullWidth
            className="w-full"
            style={{ zoom: "80%" }}
            size="small"
            value={thirdSubCatFilterVal}
            onChange={handleChangeThirdSubCatFilter}
            displayEmpty
            disabled={!subCategoryFilterVal} // disable until subcategory selected
          >
            <MenuItem value="">
              <em>All Third-Level</em>
            </MenuItem>

            {context.catData
              ?.find((cat) => cat._id === categoryFilterVal)
              ?.children?.find((sub) => sub._id === subCategoryFilterVal)
              ?.children?.map((third) => (
                <MenuItem key={third._id} value={third._id}>
                  {third.name}
                </MenuItem>
              ))}
          </Select>
        </div>

        {/* Search */}
        <div className="col w-[20%] ml-auto">
          <h4 className="font-semibold text-sm text-gray-700 mb-2">
            Search Products
          </h4>
          <SearchBox />
        </div>

        <TableContainer
          sx={{ maxHeight: 500 }}
          className="overflow-x-auto bg-white rounded-md shadow"
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    {...label}
                    size="small"
                    checked={
                      selectedIds.length === productData.length &&
                      productData.length > 0
                    }
                    indeterminate={
                      selectedIds.length > 0 &&
                      selectedIds.length < productData.length
                    }
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setSelectedIds(productData.map((p) => p._id));
                      } else {
                        setSelectedIds([]);
                      }
                    }}
                  />
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || "left"}
                    style={{ minWidth: column.minWidth }}
                  >
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
                      <CircularProgress color="primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : productData && productData.length > 0 ? (
                productData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((product, index) => (
                    <TableRow key={product._id || index}>
                      <TableCell>
                        <Checkbox
                          {...label}
                          size="small"
                          checked={selectedIds.includes(product._id)}
                          onChange={() => handleCheckboxChange(product._id)}
                        />
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-8">
                          <div className="w-full h-full rounded-md overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center">
                            <LazyLoadImage
                              src={
                                product?.images?.length > 0
                                  ? product.images[0]
                                  : product?.category?.images?.[0] ||
                                    "/no-image.png"
                              }
                              alt={product.name}
                              effect="blur"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <Link
                              to={`/product/${product._id}`}
                              className="text-gray-800 font-medium hover:text-indigo-500"
                            >
                              {product.name}
                            </Link>
                            <p className="text-gray-500 text-xs">
                              {Array.isArray(product.productRam)
                                ? product.productRam.join(", ")
                                : product.productRam || "N/A"}{" "}
                              |{" "}
                              {Array.isArray(product.size)
                                ? product.size.join(", ")
                                : product.size || "N/A"}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="left">
                        {product.catName || "N/A"}
                      </TableCell>
                      <TableCell align="left">
                        {product.subCat || "N/A"}
                      </TableCell>
                      <TableCell align="left">
                        {product.brand || "N/A"}
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex flex-col items-end">
                          <span className="text-black font-medium">
                            ₹{product?.price?.toLocaleString() || "0"}
                          </span>
                          {product?.oldPrice > product?.price && (
                            <span className="text-sm text-gray-400 line-through">
                              ₹{product.oldPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </TableCell>

                      <TableCell align="right">
                        <p className="text-sm mb-1">
                          <span className="font-semibold">
                            {product.sale || 0}
                          </span>{" "}
                          sales
                        </p>
                      </TableCell>
                      <TableCell align="right">
                        <p className="text-sm mb-1">
                          <Rating
                            name="half-rating"
                            size="small"
                            defaultValue={product?.rating} readOnly
                          />
                        </p>
                      </TableCell>

                      <TableCell align="center">
                        <div className="flex justify-center items-center gap-2">
                          <Button
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border"
                            onClick={() =>
                              context.setIsOpenFullScreenPanel({
                                open: true,
                                model: "Edit Product",
                                id: product._id,
                              })
                            }
                          >
                            <AiOutlineEdit className="text-[18px]" />
                          </Button>

                          <Link to={`/product/${product._id}`}>
                            <Button className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border">
                              <IoEyeOutline className="text-[18px]" />
                            </Button>
                          </Link>

                          <Button
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !border"
                            onClick={() => deleteProduct(product._id)}
                          >
                            <AiTwotoneDelete className="text-[18px]" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={productData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
};

export default Products;
