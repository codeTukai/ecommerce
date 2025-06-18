import React from "react";
import { Link } from "react-router-dom";
const BannerBox = (props) => {
  return (
    <div className="box bannerBox overflow-hidden rounded-1g group">
      <Link to="/">
      <img src={props.img} className="w-full group-hover:scale-105 rotate-1" alt="banner"/>
      </Link>


    </div>
  );
};

export default BannerBox;
