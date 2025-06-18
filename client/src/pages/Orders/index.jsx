import React, { useState } from "react";
import AccountSideBar from "../../components/AccountSideBar";
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import Badge from "../../components/Badge";
import { FaAngleUp } from "react-icons/fa";

const Orders = () => {
  const [isOpenOrderedProduct, setIsOpenOrderedProduct] = useState(null);

  const handleToggleOrderedProduct = (index) => {
    setIsOpenOrderedProduct((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        {/* Sidebar */}
        <div className="w-[20%]">
          <AccountSideBar />
        </div>

        {/* Main content */}
        <div className="w-[70%]">
          <div className="shadow-md rounded-md bg-white p-4">
            <div className="border-b border-[rgba(0,0,0,0.1)] pb-3 mb-3">
              <h2 className="text-xl font-semibold">My Orders</h2>
              <p className="mt-1">
                There are <span className="font-bold text-red-400">2</span>{" "}
                Orders
              </p>
            </div>

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">&nbsp;</th>
                    <th className="px-6 py-3 whitespace-nowrap">Order Id</th>
                    <th className="px-6 py-3 whitespace-nowrap">Payment Id</th>
                    <th className="px-6 py-3 whitespace-nowrap">Name</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      Phone Number
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">Address</th>
                    <th className="px-6 py-3 whitespace-nowrap">Pincode</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      Total Amount
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">Email</th>
                    <th className="px-6 py-3 whitespace-nowrap">User Id</th>
                    <th className="px-6 py-3 whitespace-nowrap">
                      Order Status
                    </th>
                    <th className="px-6 py-3 whitespace-nowrap">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {/* Order Row */}
                  <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4">
                      <Button
                        className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => handleToggleOrderedProduct(0)}
                      >
                        {isOpenOrderedProduct === 0 ? (
                          <FaAngleUp className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        ) : (
                          <FaAngleDown className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        )}
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-red-400">ORD12345</td>
                    <td className="px-6 py-4 text-red-400">PAY56789</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">9876543210</td>
                    <td className="px-6 py-4">123 Street, City</td>
                    <td className="px-6 py-4">400001</td>
                    <td className="px-6 py-4">₹1,499</td>
                    <td className="px-6 py-4">john@example.com</td>
                    <td className="px-6 py-4 text-red-400">USR123</td>
                    <td className="px-6 py-4">
                      <Badge status="confirm" />
                    </td>
                    <td className="px-6 py-4">2025-06-01</td>
                  </tr>

                  {/* Nested Product Table */}
                  {isOpenOrderedProduct === 0 && (
                    <tr>
                      <td colSpan={12} className="pl-20">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                              <tr>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Id
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Title
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Image
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Quantity
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Price
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Sub Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}




                     <tr className="bg-white border-b border-gray-200">
                    <td className="px-6 py-4">
                      <Button
                        className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                        onClick={() => handleToggleOrderedProduct(1)}
                      >
                        {isOpenOrderedProduct === 1 ? (
                          <FaAngleUp className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        ) : (
                          <FaAngleDown className="text-[20px] text-[rgba(0,0,0,0.7)]" />
                        )}
                      </Button>
                    </td>
                    <td className="px-6 py-4 text-red-400">ORD12345</td>
                    <td className="px-6 py-4 text-red-400">PAY56789</td>
                    <td className="px-6 py-4">John Doe</td>
                    <td className="px-6 py-4">9876543210</td>
                    <td className="px-6 py-4">123 Street, City</td>
                    <td className="px-6 py-4">400001</td>
                    <td className="px-6 py-4">₹1,499</td>
                    <td className="px-6 py-4">john@example.com</td>
                    <td className="px-6 py-4 text-red-400">USR123</td>
                    <td className="px-6 py-4">
                      <Badge status="confirm" />
                    </td>
                    <td className="px-6 py-4">2025-06-01</td>
                  </tr>

                  {/* Nested Product Table */}
                  {isOpenOrderedProduct === 1 && (
                    <tr>
                      <td colSpan={12} className="pl-20">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left text-gray-600">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                              <tr>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Id
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Product Title
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Image
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Quantity
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Price
                                </th>
                                <th className="px-6 py-3 whitespace-nowrap">
                                  Sub Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                              <tr className="bg-white border-b border-gray-200">
                                <td className="px-6 py-4">PROD001</td>
                                <td className="px-6 py-4">
                                  Wireless Headphones
                                </td>
                                <td className="px-6 py-4">
                                  <img
                                    src="https://betanews.com/wp-content/uploads/2021/06/img19_1920x1200.jpg"
                                    className="w-[80px] h-[80px] object-cover rounded-md"
                                    alt="product"
                                  />
                                </td>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4">₹749</td>
                                <td className="px-6 py-4">₹1,498</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
