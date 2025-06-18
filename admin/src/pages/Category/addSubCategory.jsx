import React from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const AddSubCategory = () => {
   const [productCat, setProductCat] = React.useState("");
    const [productSubCat, setProductSubCat] = React.useState("");
    const [productFeatured, setProductFeatured] = React.useState("");
    const [productRams, setProductRams] = React.useState("");
    const [productWeight, setProductWeight] = React.useState("");
    const [productSize, setProductSize] = React.useState("");
  
  
    const handleChangeProductCat = (event) => {
      setProductCat(event.target.value);
    };
  
    const handleChangeProductSubCat = (event) => {
      setProductSubCat(event.target.value);
    };
  
    const handleChangeProductFeatured = (event) => {
      setProductFeatured(event.target.value);
    };
  
    const handleChangeProductRams = (event) => {
      setProductRams(event.target.value);
    };
  
    const handleChangeProductWeight = (event) => {
      setProductWeight(event.target.value);
    };
  
    const handleChangeProductSize = (event) => {
      setProductSize(event.target.value);
    };
  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8">
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4 pt-4">
          <div className="grid grid-cols-4 mb-3 gap-5">
            <div className="col ">
                <h3 className="text-[14px] font-[500] mb-1 text-black">
                  Product Category
                </h3>
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productRams}
                  label="Category"
                  onChange={handleChangeProductRams}
                >
                  <MenuItem value={"4GB"}>None</MenuItem>
                  <MenuItem value={"6GB"}>Male</MenuItem>
                  <MenuItem value={"8GB"}>Female</MenuItem>
                  <MenuItem value={"8GB"}>Kids</MenuItem>
                </Select>
              </div>
                <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
               Sub Category Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm p-3 text-sm"
              />
            </div>
          </div>

          <br />

        

          
        </div>
        
        <div className="w-[250px]">
          <Button type="button" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-[25px] text-white" />
            Publish and View
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddSubCategory;
