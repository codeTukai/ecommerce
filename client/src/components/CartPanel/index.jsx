import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import API from "../../utils/api";

const CartPanel = () => {
  const [cartItems, setCartItems] = useState([]);

  // GET CART ITEMS
  const fetchCartItems = async () => {
    try {
      const res = await API.get("/api/cart/get");
      if (res.data.success) {
        setCartItems(res.data.cartItems);
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  // DELETE CART ITEM
  const handleDelete = async (cartItemId) => {
    try {
      await API.delete("/api/cart/delete-cart-item", {
        data: { cartItemId },
      });
      fetchCartItems(); // refresh cart
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.qty * item.productId.price,
    0
  );

  const shipping = cartItems.length > 0 ? 8 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <div className="scroll w-full max-h-[300px] overflow-y-scroll py-3 px-4">
        {cartItems.map((item) => (
          <div key={item._id} className="flex gap-4 border-b pb-4">
            <div className="w-[25%] h-[80px] overflow-hidden rounded-md">
              <img
                src={item.productId.images[0]}
                alt={item.productId.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-[75%] relative pr-5">
              <h4 className="text-sm font-medium">
                {item.productId.name}
              </h4>

              <p className="flex gap-5 mt-2 text-sm">
                <span>Qty: {item.qty}</span>
                <span className="text-[#ff5252] font-bold">
                  ${item.qty * item.productId.price}
                </span>
              </p>

              <MdOutlineDeleteOutline
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 right-2 cursor-pointer text-xl hover:text-red-500"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t">
        <div className="flex justify-between text-sm font-medium">
          <span>{cartItems.length} Items</span>
          <span className="text-[#ff5252] font-bold">${subtotal}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span>Shipping</span>
          <span className="text-[#ff5252] font-bold">${shipping}</span>
        </div>

        <div className="flex justify-between font-semibold mt-2">
          <span>Total</span>
          <span className="text-[#ff5252] font-bold">${total}</span>
        </div>

        <div className="flex gap-3 mt-4">
          <Link to="/cart" className="w-1/2">
            <Button fullWidth variant="contained" className="!bg-[#ff5252]">
              View Cart
            </Button>
          </Link>
          <Link to="/checkout" className="w-1/2">
            <Button fullWidth variant="outlined">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartPanel;
