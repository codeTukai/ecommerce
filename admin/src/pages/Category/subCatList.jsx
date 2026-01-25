import React, { useContext, useState } from "react";
import { Button } from "@mui/material";
import { MdCategory } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { MyContext } from "../../App";
import EditSubCatBox from "./EditSubCatBox";

const SubCategoryList = () => {
  const [isOpen, setIsOpen] = useState(null);
  const context = useContext(MyContext);

  const toggleExpand = (index) => {
    setIsOpen((prev) => (prev === index ? null : index));
  };

  return (
    <div className="p-5 bg-white rounded-xl shadow-md border border-gray-100 mt-5 mx-4">
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
         <div className="flex items-center gap-2">
           <MdCategory className="text-blue-600 text-2xl" />
           <h2 className="text-2xl font-semibold text-gray-800">
            Sub Category List
           </h2>
         </div>

        <Button
          className="!bg-blue-600 !text-white shadow hover:shadow-lg transition-all px-6 py-2 rounded"
          variant="contained"
          onClick={() => {
            context.setEditCategory(null); // Reset for new add
            context.setIsOpenFullScreenPanel({
              open: true,
              model: "Add New  Sub Category",
            });
          }}
        >
          + Add New Sub Category
        </Button>
      </div>

      {/* Category Tree */}
      <div>
        {context?.catData?.length > 0 ? (
          <ul className="space-y-4">
            {context.catData.map((firstLevel, index) => (
              <li
                key={firstLevel._id}
                className="border p-4 rounded bg-gray-50"
              >
                {/* Top-level Category */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">
                    {firstLevel.name}
                  </span>
                  <Button
                    className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black ml-auto"
                    onClick={() => toggleExpand(index)}
                  >
                    {isOpen === index ? <FaAngleUp /> : <FaAngleDown />}
                  </Button>
                </div>

                {/* Sub-categories */}
                {isOpen === index && (
                  <div className="mt-3">
                    {firstLevel.children?.length > 0 ? (
                      <ul className="space-y-2">
                        {firstLevel.children.map((subCat, subIndex) => (
                          <li key={subCat._id} className="ml-4">
                            {/* 2nd Level */}
                            <EditSubCatBox
                              name={subCat.name}
                              id={subCat._id}
                              catData={context.catData}
                              index={subIndex}
                              selectedCat={subCat.parentId}
                              selectedCatName={subCat.parentCatName}
                            />

                            {/* 3rd Level */}
                            {subCat.children?.length > 0 && (
                              <ul className="mt-2 pl-4 border-l border-gray-300">
                                {subCat.children.map((third, thirdIndex) => (
                                  <li key={third._id} className="ml-3 py-1">
                                    <EditSubCatBox
                                      name={third.name}
                                      id={third._id}
                                      catData={firstLevel.children}
                                      index={thirdIndex}
                                      selectedCat={third.parentId}
                                      selectedCatName={third.parentCatName}
                                    />
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="ml-4 text-gray-400 italic">No sub-categories found.</p>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 italic">No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default SubCategoryList;
