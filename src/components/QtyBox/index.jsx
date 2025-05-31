import React, { useState } from 'react';
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import Button from "@mui/material/Button";

export const QtyBox = () => {
    const [quantity, setQuantity] = useState(1);

    const increaseQty = () => {
        setQuantity(prev => prev + 1);
    };

    const decreaseQty = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            setQuantity(value);
        }
    };

    return (
        <div className="qtyBox flex items-center relative w-[100px]">
            <input
                type="number"
                className="w-full h-[40px] focus:outline-none border border-[rgba(0,0,0,0.2)] rounded-md text-center pr-[35px]"
                value={quantity}
                onChange={handleInputChange}
                min={1}
            />

            <div className="flex items-center flex-col justify-between h-[40px] absolute top-0 right-0 z-50 border-l border-[#000] bg-white rounded-r-md">
                <Button className="!min-w-[30px] !w-[30px] !h-[20px] !text-[#000]" onClick={increaseQty}>
                    <FaAngleUp />
                </Button>
                <Button className="!min-w-[30px] !w-[30px] !h-[20px]" onClick={decreaseQty}>
                    <FaAngleDown />
                </Button>
            </div>
        </div>
    );
};
