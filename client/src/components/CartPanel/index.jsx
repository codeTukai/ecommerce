import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";

const initialCart = [
  {
    id: "1001",
    name: "Floral Anarkali Dress",
    qty: 1,
    price: 68,
    image:
      "https://api.spicezgold.com/download/file_1734529362999_gosriki-women-s-pink-ethnic-motifs-printed-kurta-with-trouser-dupatta-product-images-rvpkyh5qdr-0-202310141511.webp",
  },
  {
    id: "1002",
    name: "Cotton Printed Kurti",
    qty: 2,
    price: 42,
    image:
      "https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg",
  },
  {
    id: "1003",
    name: "Men's Casual Sneakers",
    qty: 1,
    price: 59,
    image:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/y/f/o/6-mrj2240-6-aadi-white-grey-original-imagqphzbsw5zquq.jpeg",
  },
  {
    id: "1004",
    name: "Silver Plated Bracelet",
    qty: 1,
    price: 29,
    image:
      "https://rukminim2.flixcart.com/image/832/832/xif0q/jewellery-set/p/e/n/na-na-bracelet-set-4pcs-combo-latest-fashion-designs-for-girls-original-imagkzwmh3vhkkny.jpeg",
  },
];

const CartPanel = () => {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const shipping = 8;
  const total = subtotal + shipping;

  return (
    <>
      <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="cartItem w-full flex items-center gap-4 border-b border-[rgba(0,0,0,0.1)] pb-4"
          >
            <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
              <Link to={`/product/${item.id}`} className="block group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </Link>
            </div>
            <div className="info w-[75%] pr-5 relative">
              <h4 className="text-[14px] font-[500]">
                <Link to={`/product/${item.id}`} className="link transition-all">
                  {item.name}
                </Link>
              </h4>
              <p className="flex items-center gap-5 mt-2 mb-2 text-sm">
                <span>
                  Qty: <span>{item.qty}</span>
                </span>
                <span className="text-[#ff5252] font-bold">
                  Price: ${item.qty * item.price}
                </span>
              </p>
              <MdOutlineDeleteOutline
                onClick={() => handleDelete(item.id)}
                className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] text-gray-600 hover:text-red-500 transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bottomSec absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5">
        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col gap-1">
          <div className="flex items-center justify-between w-full text-sm font-medium">
            <span>{cartItems.length} Items</span>
            <span className="text-[#ff5252] font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between w-full text-sm font-medium">
            <span>Shipping</span>
            <span className="text-[#ff5252] font-bold">${shipping.toFixed(2)}</span>
          </div>
        </div>

        <div className="bottomInfo py-3 px-4 w-full border-t border-[rgba(0,0,0,0.1)] flex flex-col gap-3">
          <div className="flex items-center justify-between w-full text-sm font-semibold">
            <span>Total (tax excl.)</span>
            <span className="text-[#ff5252] font-bold">${total.toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between w-full gap-4">
            <Link to="/cart" className="w-1/2">
              <Button variant="contained" fullWidth className="!bg-[#ff5252]">
                View Cart
              </Button>
            </Link>
            <Link to="/checkout" className="w-1/2">
              <Button variant="outlined" fullWidth className="!border-[#ff5252] !text-[#ff5252]">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
