import CategoryModel from '../models/category.model.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// utils/cloudinary.js

import dotenv from "dotenv";

dotenv.config(); // Load .env

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key:process.env.cloudinary_Config_api_key, 
  api_secret:process.env.cloudinary_Config_api_secret, 
  secure : true,
});


export default cloudinary;

// ✅ Image Upload Controller
let imagesArr = [];

export async function uploadImages(request, response) {
  try {
    imagesArr = [];
    const images = request.files;

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i].path, options);
      imagesArr.push(result.secure_url);
      fs.unlinkSync(images[i].path); // Clean up temp file
    }

    return response.status(200).json({
      images: imagesArr,
      success: true,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export async function createCategory(req, res) {
  try {
    const { name, images, parentId, parentCatName } = req.body;

    // ✅ Only check if images is an array (allow empty array)
    if (!name || !Array.isArray(images)) {
      return res.status(400).json({
        message: "Name is required and images must be an array.",
        error: true,
        success: false,
      });
    }

    // ✅ Check for duplicate name under same parentId
    const existing = await CategoryModel.findOne({
      name: name.trim(),
      parentId: parentId || null,
    });

    if (existing) {
      return res.status(400).json({
        message: `Category "${name}" already exists under this parent.`,
        error: true,
        success: false,
      });
    }

    // ✅ Create category
    const category = new CategoryModel({
      name: name.trim(),
      images,
      parentId: parentId || null,
      parentCatName: parentCatName || "",
    });

    const savedCategory = await category.save();

    return res.status(201).json({
      message: "Category created successfully",
      success: true,
      error: false,
      category: savedCategory,
    });

  } catch (error) {
    console.error("CreateCategory Error:", error.message);

    if (error.code === 11000) {
      return res.status(400).json({
        message: `Duplicate category name "${req.body.name}"`,
        error: true,
        success: false,
      });
    }

    return res.status(500).json({
      message: error.message || "Server Error",
      success: false,
      error: true,
    });
  }
}





// get Categories
export async function getCategories(request, response) {
    try {
        const categories = await CategoryModel.find();
        const categoryMap = {};

        categories.forEach(cat => {
            categoryMap [cat._id] = { ...cat._doc, children: [] };
        });

        const rootCategories = [];

        categories.forEach(cat => {
            if (cat.parentId) {
                categoryMap[cat.parentId].children.push(categoryMap[cat._id]);
            } else {
                rootCategories.push(categoryMap[cat._id]);
            }
            });

        return response.status(200).json({
            error: false,
            success: true,
            data: rootCategories
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
    })
        
    }

}


// get category count
export async function getCategoriesCount(request, response) {
    try {
        const categoryCount = await CategoryModel.countDocuments ({ parentId: undefined });
        if (!categoryCount) {
            response.status(500).json({ success: false, error: true });
        }
        else {
            response.send({
                categoryCount: categoryCount,
            });
        }
        
    } catch (error) {
         return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
    })
        
    }

}




 //get sub category count


export async function getSubCategoriesCount(req, res) {
  try {
    // Find all categories that have a parentId defined (i.e., are subcategories)
    const subCategories = await CategoryModel.find({ parentId: { $ne: null } });

    res.status(200).json({
      success: true,
      error: false,
      subCategoryCount: subCategories.length,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
}



// get single category

export async function getCategory(request, response) {
    try {
        const category = await CategoryModel.findById(request.params.id);
        
        if (!category) {
            response.status(500)
            .json(
                {
                    message: "The category with the given ID was not found.",
                    error:true,
                    success:false
                }
            );
        }

        return response.status(200).json({
            error: false,
            success: true,
            category: category
        })
        
    } catch (error) {
         return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
    })
        
    }
}


//remove image

export async function removeImageFromCloudinary(request, response) {
  const imgUrl = request.query.img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];
  const imageName = image.split(".")[0];

  if(imageName){
    const res = await cloudinary.uploader.destroy(
    imageName,
    (error, result) => {
        // console.log(error, res)
    }
  );

  if (res) {
    response.status(200).send(res);
  }

  }

  
}



//delete


export async function deleteCategory(request, response){
    const category = await CategoryModel.findById(request.params.id);
    const images = category.images;
    let img="";

    for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if(imageName){
            cloudinary.uploader.destroy (imageName, (error, result) => {
            // console.log(error, result);
            });

        
            
    }
}

    const subCategory = await CategoryModel.find({
        parentId: request.params.id
    })

    for(let i=0; i<subCategory.length; i++){

        const thirdsubCategory = await CategoryModel.find({
        parentId:subCategory[i]._id
        });

        for(let i=0; i<thirdsubCategory.length; i++){
            const deletedThirdSubCat = await CategoryModel.findByIdAndDelete(thirdsubCategory[i]._id);
        }

        const deletedSubCat = await CategoryModel.findByIdAndDelete (subCategory[i]._id);
    }

    const deletedCat = await CategoryModel.findByIdAndDelete(request.params.id);
    if (!deletedCat) {
        response.status(404).json({
            message: "Category not found!",
            success: false,
            error: true
        });
    }

    response.status(200).json({
        success: true,
        error:false,
        message: "Category Deleted!",
    });
}




// export async function updatedCategory (request, response){
//     const category = await CategoryModel.findByIdAndUpdate(
//         request.params.id,
//         {
          
//             name: request.body.name,
//             images: imagesArr.length>0 ? imagesArr[0] : request.body.images,
//             parentId:request.body.parentId,
//             parentCatName: request.body.parentCatName
//         },

//         { new: true }

//     );

//     if (!category) {
//         return response.status(500).json({
//             message: "Category cannot be updated!",
//             success: false,
//             error: true
//         });
//     }

//     imagesArr = [];

//     response.status(200).json({
//         error: false,
//         success: true,
//         category: category
//     })

// }

export async function updatedCategory(req, res) {
  try {
    const {
      name,
      images = [],
      parentId = null,
      parentCatName = ""
    } = req.body;

    // Fallback: if images array is valid, take first image
    const finalImage = Array.isArray(images) && images.length > 0 ? images[0] : null;

    const updated = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        images: finalImage, // Assuming schema only supports 1 image; adjust if needed
        parentId,
        parentCatName
      },
      { new: true }
    );

    if (!updated) {
      return res.status(500).json({
        message: "Category cannot be updated!",
        success: false,
        error: true
      });
    }

    return res.status(200).json({
      message: "Category updated successfully",
      success: true,
      error: false,
      category: updated
    });

  } catch (error) {
    console.error("UpdateCategory Error:", error.message);
    return res.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true
    });
  }
}



