import React from "react";
import { LiaShippingFastSolid, LiaGiftSolid } from "react-icons/lia";
import { PiKeyReturnLight } from "react-icons/pi";
import { BsWallet2 } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { IoChatboxOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { LinkOffRounded } from "@mui/icons-material";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquarePinterest } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="py-10 bg-[#fafafa]">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4">
          {/* Feature Boxes */}
          <div className="flex flex-wrap justify-center gap-6 pb-8">
            {[
              {
                icon: <LiaShippingFastSolid />,
                title: "Free Shipping",
                subtitle: "For all orders over $100",
              },
              {
                icon: <PiKeyReturnLight />,
                title: "30 Days Returns",
                subtitle: "For an Exchange Product",
              },
              {
                icon: <BsWallet2 />,
                title: "Secured Payment",
                subtitle: "Payment Cards Accepted",
              },
              {
                icon: <LiaGiftSolid />,
                title: "Special Gifts",
                subtitle: "Our First Product Order",
              },
              {
                icon: <BiSupport />,
                title: "Support 24/7",
                subtitle: "Contact us Anytime",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[45%] md:w-[18%] flex flex-col items-center text-center group"
              >
                <div className="text-[40px] transition-all duration-300 group-hover:text-amber-700 group-hover:-translate-y-1">
                  {item.icon}
                </div>
                <h3 className="text-[16px] font-semibold mt-3">{item.title}</h3>
                <p className="text-[12px] font-medium">{item.subtitle}</p>
              </div>
            ))}
          </div>

          <hr className="my-6" />

          {/* Footer Main Content */}
          <div className="flex flex-wrap gap-8 text-sm">
            {/* Contact Info */}
            <div className="w-full md:w-[25%] border-r border-gray-200 pr-4">
              <h2 className="text-[18px] font-semibold mb-4">Contact us</h2>
              <address className="not-italic mb-4 text-[13px] font-normal leading-relaxed">
                Easycart - Mega Super Store
                <br />
                507-Union Trade Centre, India
              </address>
              <a
                href="mailto:sales@easycart.com"
                className="block text-[13px] text-blue-600 hover:underline"
              >
                sales@easycart.com
              </a>
              <span className="text-[22px] font-semibold text-amber-700 block mt-3 mb-5">
                (+91) 9876-543-210
              </span>
              <div className="flex items-start gap-3">
                <IoChatboxOutline className="text-[40px] text-amber-700" />
                <span className="text-[14px] font-semibold leading-tight">
                  Online Chat
                  <br />
                  Get Expert Help
                </span>
              </div>
            </div>

            {/* Product Links */}
            <div className="w-full sm:w-[45%] md:w-[35%] flex gap-4 pl-4">
              <div className="w-1/2">
                <h2 className="text-[18px] font-semibold mb-4">Products</h2>
                <ul>
                  {[
                    "Prices drop",
                    "New products",
                    "Best sales",
                    "Contact Us",
                    "Sitemap",
                    "Stores",
                  ].map((text, idx) => (
                    <li key={idx} className="mb-2">
                      <Link to="/" className="hover:underline text-[14px]">
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="w-1/2">
                <h2 className="text-[18px] font-semibold mb-4">Our company</h2>
                <ul>
                  {[
                    "Delivery",
                    "Legal Notice",
                    "Terms And Conditions Of Use",
                    "About Us",
                    "Secure Payment",
                    "Login",
                  ].map((text, idx) => (
                    <li key={idx} className="mb-2">
                      <Link to="/" className="hover:underline text-[14px]">
                        {text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full md:w-[35%] pl-4 pr-4">
              <h2 className="text-[18px] font-semibold mb-4">
                Subscribe to newsletter
              </h2>
              <p className="text-[13px] mb-5">
                Subscribe to our latest newsletter to get news about special
                discounts.
              </p>
              <form>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full h-[45px] border border-gray-300 rounded px-4 mb-4 focus:outline-none focus:border-gray-500"
                />
                <Button
                  variant="contained"
                  className="bg-amber-700 hover:bg-amber-800 text-white w-full mb-2"
                >
                  SUBSCRIBE
                </Button>
                <FormControlLabel
                  control={<Checkbox />}
                  label={
                    <span className="text-[13px]">
                      I agree to the terms and conditions and the privacy policy
                    </span>
                  }
                />
              </form>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Strip */}
      <div className="bottomStrip border-t border-[rgba(0,0,0,0.2)] py-3 bg-white">
        <div className="container flex items-center justify-between flex-wrap gap-2">
          {/* Social Icons */}
          <ul className="flex items-center gap-2">
            {[
              { icon: <FaFacebookF />, color: "group-hover:bg-amber-600" },
              { icon: <FaInstagram />, color: "group-hover:bg-amber-600" },
              { icon: <FaSquarePinterest />, color: "group-hover:bg-amber-600" },
              { icon: <IoLogoYoutube />, color: "group-hover:bg-amber-700" },
            ].map((item, idx) => (
              <li key={idx} className="list-none">
                <Link
                  to="/"
                  target="_blank"
                  className={`w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.2)] flex items-center justify-center group transition-all ${item.color}`}
                >
                  <div className="text-[15px] group-hover:text-white">
                    {item.icon}
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Center Text */}
          <p className="text-[13px] text-center mb-0">
            @ 2025 - Ecommerce Template
          </p>

          {/* Payment Image */}
          <div className="flex items-center">
            <img
              src="cb_visa_mastercard_logo-1.webp"
              alt="payment methods"
              className="h-[30px] object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
