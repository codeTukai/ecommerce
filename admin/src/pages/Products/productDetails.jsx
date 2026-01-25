import React, { useEffect, useRef, useState, useCallback } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import { fetchDataFromApi } from "../../utils/api";
import { TbBrandCraft } from "react-icons/tb";
import { BiCategoryAlt } from "react-icons/bi";
import { MdFilterVintage } from "react-icons/md";
import { LuWeight } from "react-icons/lu";
import { MdOutlineRateReview } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const zoomSliderSml = useRef(null);
  const zoomSliderBig = useRef(null);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();

  const goto = useCallback((index) => {
    setSlideIndex(index);
    if (zoomSliderBig.current?.swiper) {
      zoomSliderBig.current.swiper.slideTo(index);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi(`/api/product/${id}`)
      .then((res) => {
        if (res?.success && res?.product) {
          setProduct(res.product);
          setError("");
        } else {
          setError("Product not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product data");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="px-6 text-gray-500">Loading...</p>;
  if (error) return <p className="px-6 text-red-500">{error}</p>;

  return (
   <>
   
      <div className="flex flex-col md:flex-row gap-6">
        {/* === Left: Image Gallery & Zoom === */}
        <div className="flex gap-4 w-full md:w-[60%]">
          {/* Thumbnails */}
          <div className="w-[90px] h-[500px] overflow-hidden">
          <Swiper
            ref={zoomSliderSml}
            direction="vertical"
            slidesPerView={5}
            spaceBetween={10}
            modules={[Navigation]}
            navigation
            className={`zoomProductSliderThumbs h-[400px] overflow-hidden ${
              product?.images?.length > 5 && "space"
            }`}
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`cursor-pointer p-1 w-full flex items-center rounded overflow-hidden border ${
                    slideIndex === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => goto(index)}
                >
                  <img
                    src={img}
                    alt={`thumb-${index}`}
                    className="w-full h-[100px] object-contain bg-white"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Zoom Area */}
        <div className="flex-1  flex items-center justify-center bg-white rounded-md shadow">
          <Swiper
            ref={zoomSliderBig}
            slidesPerView={1}
            spaceBetween={0}
            navigation={false}
            onSlideChange={(swiper) => setSlideIndex(swiper.activeIndex)}
            className="w-full h-full"
          >
            {product.images.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1.5}
                    src={img}
                    alt={`product-${index}`}
                    className="max-h-[480px] object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* === Right: Product Details === */}
      <div className="w-full md:w-[50%] flex flex-col justify-start">
        <h1 className="text-[25px] font-[500] mb-2">{product?.name}</h1>
       

        {/* Additional fields if needed */}
        <div className="flex items-center py-1">
          <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
            <TbBrandCraft className="opacity-65" />
            Brand:{" "}
          </span>
          <span className="text-[14px]">{product?.brand}</span>
        </div>
        <div className="flex items-center py-1">
          <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
            <BiCategoryAlt className="opacity-65" />
            Category:{" "}
          </span>
          <span className="text-[14px]">{product?.catName}</span>
        </div>
        <div className="flex items-center py-1">
          <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
           
            <p className="text-xl font-[500] text-black flex justify-end mb-1">  ₹{product?.price}</p>
          </span>
          <span className="text-[24px]"> {product?.oldPrice > 0 && (
          <div>
            <span className="text-sm text-gray-500 line-through mb-4">
              ₹{product.oldPrice}
            </span>
          </div>
        )}</span>
        </div>
       
        {product?.productRam?.length !== 0 && (
          <div className="flex items-center py-1">
            <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
              <MdFilterVintage className="opacity-65" />
              RAM:{" "}
            </span>
            <div className="flex flex-wrap gap-2">
              {typeof product?.productRam === "string" &&
                product.productRam.split(",").map((ram, index) => (
                  <span
                    key={index}
                    className="text-[14px] px-3 py-1 bg-gray-200 rounded-md shadow-sm"
                  >
                    {ram.trim()}
                  </span>
                ))}
            </div>
          </div>
        )}
      { product?.size && product.size.length !== 0 && (
  <div className="flex items-center py-1">
    <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
      <MdFilterVintage className="opacity-65" />
      Size:
    </span>
    <div className="flex flex-wrap gap-2">
      {typeof product.size === "string"
        ? product.size.split(",").map((s, index) => (
            <span
              key={index}
              className="text-[14px] px-3 py-1 bg-gray-200 rounded-md shadow-sm"
            >
              {s.trim()}
            </span>
          ))
        : Array.isArray(product.size) &&
          product.size.map((s, index) => (
            <span
              key={index}
              className="text-[14px] px-3 py-1 bg-gray-200 rounded-md shadow-sm"
            >
              {s}
            </span>
          ))}
       </div>
      </div>
  
   )}

     {product?.productWeight?.length !== 0 && (
          <div className="flex items-center py-1">
            <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
              <LuWeight className="opacity-65" />
              Weight:{" "}
            </span>
            <div className="flex flex-wrap gap-2">
              {typeof product?.productWeight === "string" &&
                product.productWeight.split(",").map((weight, index) => (
                  <span
                    key={index}
                    className="text-[14px] px-3 py-1 bg-gray-200 rounded-md shadow-sm"
                  >
                    {weight.trim()}
                   
                  </span>
                ))}
            </div>
          </div>
        )}


         <div className="flex items-center py-1">
          <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
            <MdOutlineRateReview className="opacity-65" />
            Reviews:{" "}
          </span>
          <span className="text-[14px]">({product?.reviews?.length > 0 ? product.reviews.length : (0)})Review</span>
        </div>
         <div className="flex items-center py-1">
          <span className="w-[20%] font-[500] flex items-center gap-2 text-[14px]">
            <BsPatchCheckFill className="opacity-65" />
            Published:{" "}
          </span>
          <span className="text-[14px]">({product?.createdAt?.split("T")[0]})</span>
        </div>

        <br ></br>

        <h2 className="text-[22px] font-[500] flex items-left mb-2">Product Description</h2>

       {
          product?.description && <p className="font[14px] ">{product.description}</p>
         }


        
      </div>
    </div>

    <br/>


<h2 className="text-[22px] font-[500] mb-2">Customer Reviews</h2>

<div className="reviewsWrap mt-4">
  <div className="reviews w-full h-auto p-4 bg-white rounded shadow-sm border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <img
          src="https://cdn.jsdelivr.net/gh/alohe/memojis/png/teams_1.png"
          alt="User Avatar"
          className="w-10 h-10 rounded-full mr-3"
        />
        <span className="text-base font-medium text-gray-700">
         John Doe
        </span>
      </div>
      <span className="text-sm text-gray-500">
        {product?.reviews?.length || 0} review
        {product?.reviews?.length === 1 ? "" : "s"}
      </span>
    </div>

    {product?.reviews?.length > 0 ? (
      <div className="space-y-4">
        {product.reviews.map((review, index) => (
          <div
            key={index}
            className="bg-gray-50 p-3 rounded-md border border-gray-100"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-semibold text-gray-800">
                {review.userName || "Anonymous"}
              </p>
              <p className="text-sm text-yellow-600 font-semibold">
                {review.rating} / 5
              </p>
            </div>
            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-500">
        No reviews available for this product yet.
      </p>
    )}
  </div>
</div>


         </>
       
  );
};

export default ProductDetails;
