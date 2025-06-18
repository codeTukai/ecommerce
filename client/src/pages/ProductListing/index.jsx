import React, { useState } from "react";
import { Sidebar } from "../../components/SideBar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItem from "../../components/ProductItem";
import ProductItemListView from "../../components/ProductItemListView";
import Button from "@mui/material/Button";
import { IoGridSharp } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';

const ProductListing = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Dummy data to simulate products
  const productCount = 8;
  const productComponents = Array.from({ length: productCount }, (_, i) =>
    itemView === "grid" ? <ProductItem key={i} /> : <ProductItemListView key={i} />
  );

  return (
    <section className="py-5 pb-0">
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/" className="link transition">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/" className="link transition">
            Fashion
          </Link>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-2 mt-4">
        <div className="container flex gap-3">
          {/* Sidebar */}
          <aside className="w-[20%] h-full bg-white">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <main className="w-[80%] py-3">
            {/* Toolbar */}
            <div className="bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${itemView === "list" && 'active'}`}
                  onClick={() => setItemView("list")}
                >
                  <LuMenu className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Button
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${itemView === "grid" && 'active'}`}
                  onClick={() => setItemView("grid")}
                >
                  <IoGridSharp className="text-[rgba(0,0,0,0.7)]" />
                </Button>
                <Typography className="text-sm font-medium pl-3 text-[rgba(0,0,0,0.7)]">
                  There are {productCount} products.
                </Typography>
              </div>

              {/* Sorting Dropdown */}
              <div className="ml-auto flex items-center gap-3 pr-4">
                <Typography className="text-sm font-medium text-[rgba(0,0,0,0.7)]">
                  Sort By
                </Typography>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-white !text-xs !text-[#000] !capitalize !border-2 !border-[#000]"
                >
                  Sales, highest to lowest
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{ "aria-labelledby": "basic-button" }}
                >
                  {[
                    "Sales, highest to lowest",
                    "Relevance",
                    "Name, A to Z",
                    "Name, Z to A",
                    "Price, low to high",
                    "Price, high to low",
                  ].map((label, idx) => (
                    <MenuItem
                      key={idx}
                      onClick={handleClose}
                      className="!text-sm !text-[#000] !capitalize"
                    >
                      {label}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>

            {/* Product Grid/List */}
            <div className={`grid ${itemView === "grid" ? "grid-cols-4 md:grid-cols-4" : "grid-cols-1"} gap-4`}>
              {productComponents}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-5">
              <Pagination count={10} showFirstButton showLastButton />
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;
