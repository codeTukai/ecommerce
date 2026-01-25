import ProductModel from "../models/product.modal.js";
import ProductRAMSModel from "../models/productRAMS.js";
import ProductWeightModel from "../models/productWeight.js";
import ProductSizeModel from "../models/productSize.js";

import mongoose from "mongoose";

import { v2 as cloudinary }  from 'cloudinary';
import { error } from "console";
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.cloudinary_Config_Cloud_Name,
  api_key:process.env.cloudinary_Config_api_key, 
  api_secret:process.env.cloudinary_Config_api_secret, 
  secure : true,
});

export async function uploadImages(request, response) {
  try {
    const imagesArr = [];

    const image = request.files;

      const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: false,
    };

   for (let i = 0; i < image?.length; i++) {

      const img = await cloudinary.uploader.upload(
        image[i].path,
        options,
        function (error, result) {
          imagesArr.push(result.secure_url);
         fs.unlinkSync(`uploads/${request.files[i].filename}`);
        
      }
    );

  }

    return response.status(200).json({
      images: imagesArr
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    })
  }
}





export async function uploadBannerImages(request, response) {
  try {
    const bannerImages = [];

    const images = request.files; // Should be an array: multer().array('images')

    if (!images || images.length === 0) {
      return response.status(400).json({
        error: true,
        success: false,
        message: "No files uploaded",
      });
    }

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: false,
    };

    // Upload all images in parallel
    const uploadPromises = images.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.path, options);
      bannerImages.push(result.secure_url);
      fs.unlinkSync(file.path); // Clean up local file
    });

    await Promise.all(uploadPromises);

    return response.status(200).json({
      success: true,
      error: false,
      images: bannerImages,
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || "Image upload failed",
      error: true,
      success: false,
    });
  }
}


// create product



export async function createProduct(request, response) {
  try {
    let product = new ProductModel({
      name: request.body.name,
      description: request.body.description,
      images: request.body.images, // ✅ FIXED
      bannerImages: request.body.bannerImages,
      brand: request.body.brand,
      price: request.body.price,
      oldPrice: request.body.oldPrice,
      catName: request.body.catName,
      catId: request.body.catId,
      category: request.body.category,
      subCatId: request.body.subCatId,
      subCat: request.body.subCat,
      thirdsubCat: request.body.thirdsubCat,
      thirdsubCatId: request.body.thirdsubCatId,
      countInStock: request.body.countInStock,
      rating: request.body.rating,
      isFeatured: request.body.isFeatured,
      discount: request.body.discount,
      productRam: request.body.productRam,
      size: request.body.size,
      productWeight: request.body.productWeight,
      dateCreated: request.body.dateCreated,
    });

    product = await product.save();

    if (!product) {
      return response.status(500).json({
        error: true,
        success: false,
        message: "Product Not Created",
      });
    }

    return response.status(200).json({
      message: "Product Created Successfully",
      error: false,
      success: true,
      product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}






// get all products


export async function getAllProducts(request, response)  {
  try{
const page = parseInt(request.query.page)|| 1;
        const perPage = parseInt(request.query.perPage);
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );

        }

        const products = await ProductModel.find().populate("category")
        .skip((page -1 ) * perPage)
        .limit(perPage)
        .exec();


        if(!products){
            response.status(500).json({
                error: true,
                success: false,
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}



// getAll..CatId

export async function getAllProductsByCatId(request, response){
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );

        }

        const products = await ProductModel.find({
            catId:request.params.id
        }).populate("category")
        .skip((page -1 ) * perPage)
        .limit(perPage)
        .exec();


        if(!products){
            response.status(500).json({
                error: true,
                success: false,
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

//get all products cat name

export async function getAllProductsByCatName(request, response){
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );

        }

        const products = await ProductModel.find({
          catName : request.query.catName
        }).populate("category")
        .skip((page -1 ) * perPage)
        .limit(perPage)
        .exec();


        if(!products){
            response.status(500).json({
                error: true,
                success: false,
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}



// getAll..SubCat  Id

export async function getAllProductsBySubCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      subCatId: request.params.id, // ✅ FIXED
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return response.status(200).json({
      error: false,
      success: true,
      products,
      totalPages,
      page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


//get all products cat name

export async function getAllProductsBySubCatName(request, response){
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );

        }

        const products = await ProductModel.find({
          subCat : request.query.subCat
        }).populate("category")
        .skip((page -1 ) * perPage)
        .limit(perPage)
        .exec();


        if(!products){
            response.status(500).json({
                error: true,
                success: false,
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


// getAll..SubCat sub cat id for thirdlevel

export async function getAllProductsByThirdLevelCatId(request, response) {
  try {
    const page = parseInt(request.query.page) || 1;
    const perPage = parseInt(request.query.perPage) || 10000;
    const totalPosts = await ProductModel.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage);

    if (page > totalPages) {
      return response.status(404).json({
        message: "Page not found",
        success: false,
        error: true,
      });
    }

    const products = await ProductModel.find({
      thirdsubCatId: request.params.id, // ✅ FIXED
    })
      .populate("category")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();

    return response.status(200).json({
      error: false,
      success: true,
      products,
      totalPages,
      page,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


//get all products cat thirdlevel 

export async function getAllProductsByThirdCatName(request, response){
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) || 10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );

        }

        const products = await ProductModel.find({
          thirdsubCat : request.query.thirdsubCat
        }).populate("category")
        .skip((page -1 ) * perPage)
        .limit(perPage)
        .exec();


        if(!products){
            response.status(500).json({
                error: true,
                success: false,
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}



//price 

export async function getAllProductsByPrice(request, response) {
    try {
        let filter = {};
        
        // Category filters
        if (request.query.catId) {
            filter.catId = request.query.catId;
        }
        if (request.query.subCatId) {
            filter.subCatId = request.query.subCatId;
        }
        if (request.query.thirdsubCatId) {
            filter.thirdsubCatId = request.query.thirdsubCatId;
        }

        // Price filters
        if (request.query.minPrice || request.query.maxPrice) {
            filter.price = {};
            if (request.query.minPrice) {
                filter.price.$gte = Number(request.query.minPrice);
            }
            if (request.query.maxPrice) {
                filter.price.$lte = Number(request.query.maxPrice);
            }
        }

        // Fetch products with filters applied in DB
        const productList = await ProductModel.find(filter).populate("category");

        return response.status(200).json({
            error: false,
            success: true,
            products: productList,
            totalPages: 0, // you can implement pagination later
            page: 0,
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        return response.status(500).json({
            error: true,
            success: false,
            message: "Server Error",
        });
    }
}





export async function getAllProductsByRating(request, response){
    try {

        const page = parseInt(request.query.page) || 1;
        const perPage = parseInt(request.query.perPage) ||  10000;
        const totalPosts = await ProductModel.countDocuments();
        const totalPages = Math.ceil(totalPosts / perPage);

        if (page > totalPages) {
            return response.status(404).json(
                {
                    message: "Page not found",
                    success: false,
                    error: true
                }
            );

        }

        console.log(request.query.subCatId)


        let products=[];

        if(request.query.catId!==undefined){

        products = await ProductModel.find({
            rating:request.query.rating,
            catId:request.query.catId,
            }).populate("category")
            .skip((page -1 ) * perPage)
            .limit(perPage)
            .exec();
    }

    if(request.query.subCatId!==undefined){

        products = await ProductModel.find({
            rating:request.query.rating,
            subCatId:request.query.subCatId,

        }).populate("category")
            .skip((page -1 ) * perPage)
            .limit(perPage)
            .exec();
    }


    if(request.query.thirdsubCatId!==undefined){

        products = await ProductModel.find({
            rating:request.query.rating,
            thirdsubCatId:request.query.thirdsubCatId,

        }).populate("category")
            .skip((page -1 ) * perPage)
            .limit(perPage)
            .exec();
    }


        if(!products){
            response.status(500).json({
                error: true,
                success: false,
            })
        }

        return response.status(200).json({
            error: false,
            success: true,
            products: products,
            totalPages: totalPages,
            page: page,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


// get all products count

export async function getProductsCount(request, response){
    try {
        const productsCount = await ProductModel.countDocuments();

        if(!productsCount) {
            response.status(500).json({
            error:true,
            success:false
        })
    }
    
    return response.status(200).json({
        error:false,
        success:true,
        productCount: productsCount
    })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


// get all products count

export async function getAllProductsCount(request, response){
    try {
        const productsCount = await ProductModel.countDocuments();

        if(!productsCount) {
            response.status(500).json({
            error:true,
            success:false
        })
    }
    
    return response.status(200).json({
        error:false,
        success:true,
        productCount: productsCount
    })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

//123

//get all features products
export async function getAllFeaturedProducts(request, response){
    try {

        const products = await ProductModel.find({
            isFeatured: true
        }).populate("category");

        if(!products){
            response.status(500).json({
                error: true,
                success: false,
            })
        }


return response.status(200).json({
            error: false,
            success: true,
            products: products,
        })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


//delete product
export async function deleteProduct(request, response){
    const product = await ProductModel.findById(request.params.id).populate("category");

    if(!product){
        return response.status (404).json({
            message: "Product Not found",
            error:true,
            success:false
        })

    }
    const images = product.images;
    
    let img="";
    for (img of images) {
        const imgUrl = img;
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];

        const imageName = image.split(".")[0];

        if (imageName) {
            cloudinary.uploader.destroy (imageName, (error, result) => {
                // console.log(error, result);
            });

        }
    }


    const deletedProduct = await ProductModel.findByIdAndDelete (request.params.id);

    if (!deletedProduct) {
        response.status(404).json({
        message: "Product not deleted!",
        success: false,
        error:true
    });
}

return response.status(200).json({
    success: true,
    error:false,
    message: "Product Deleted!",
    });
}


//delete all products
export async function deleteMultipleProducts(req, res) {
  const { ids } = req.body;

  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({
      message: "Invalid request. 'ids' must be an array.",
      error: true,
      success: false,
    });
  }

  try {
    // Fetch all products at once
    const products = await ProductModel.find({ _id: { $in: ids } });

    // Collect all Cloudinary deletion promises
    const deleteImagePromises = [];

    for (const product of products) {
      if (!product || !product.images || !Array.isArray(product.images)) continue;

      for (const imgUrl of product.images) {
        const urlArr = imgUrl.split("/");
        const image = urlArr[urlArr.length - 1];
        const imageName = image.split(".")[0];

        if (imageName) {
          deleteImagePromises.push(
            cloudinary.uploader.destroy(imageName)
          );
        }
      }
    }

    // Wait for all Cloudinary deletions
    await Promise.all(deleteImagePromises);

    // Delete products from database
    await ProductModel.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      message: "Products deleted successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}



//get single product
export async function getProduct(request, response){
    try {
        const product = await ProductModel.findById(request.params.id).populate("category");
        
        if(!product){
            return response.status(404).json({
                message: "The product is not found",
                error:true,
                success:false
            })
        }

            return response.status(200).json({
                error:false,
                success:true,
                product:product
            })
        
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

// delete images
export async function removeImageFromCloudinary(request, response) {
  const imgUrl = request.query.img;
  const urlArr = imgUrl.split("/");
  const image = urlArr[urlArr.length - 1];
  const imageName = image.split(".")[0];

  if(imageName){
    const res = await cloudinary.uploader.destroy(
    imageName,
    (error, result) => {
         console.log(error, res)
    }
  );

  if (res) {
    response.status(200).send(res);
  }

  }

  
}



// updated product
export async function updateProduct(request, response) {
  try {
    const product = await ProductModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
        description: request.body.description,
        images: request.body.images,
        bannerImages:request.body.bannerImage,
        bannerTitleName:request.body.bannerTitleName,
        brand: request.body.brand,
        price: request.body.price,
        oldPrice: request.body.oldPrice,
        catId: request.body.catId,
        catName: request.body.catName,
        subCat: request.body.subCat,
        subCatId: request.body.subCatId,
        category: request.body.category,
        thirdsubCat: request.body.thirdsubCat,
        thirdsubCatId: request.body.thirdsubCatId,
        countInStock: request.body.countInStock,
        rating: request.body.rating, // ✅ fixed typo from "req" to "request"
        isFeatured: request.body.isFeatured,
        productRam: request.body.productRam,
        size: request.body.size,
        productWeight: request.body.productWeight,
      },
      { new: true }
    );

    if (!product) {
      return response.status(404).json({
        message: "The product could not be updated!",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Product updated successfully",
      success: true,
      error: false,
      product,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}


export async function updateProductRAMS(request, response) {
  try {
    const productRAMS = await ProductRAMSModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
       
      },
      { new: true }
    );

    if (!productRAMS) {
      return response.status(404).json({
        message: "The product RAMS could not be updated!",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Product RAMS updated successfully",
      success: true,
      error: false,
      productRAMS,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}



export async function createProductRAMS(req, res) {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "RAM name is required",
      });
    }

    const productRAMS = new ProductRAMSModel({ name: name.trim() });

    const savedRAM = await productRAMS.save();

    return res.status(201).json({
      message: "Product RAM created successfully",
      success: true,
      error: false,
      data: savedRAM,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while creating Product RAM",
      success: false,
      error: true,
    });
  }
}

  


export async function getProductRAMS(req, res) {
  try {
    const productRams = await ProductRAMSModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Product RAMs fetched successfully",
      success: true,
      error: false,
      data: productRams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while fetching RAMs",
      success: false,
      error: true,
    });
  }
}
export async function getProductRamsById(req, res) {
  try {
    const id = req.params.id;

    const productRams = await ProductRAMSModel.findById(id);

    if (!productRams) {
      return res.status(404).json({
        message: "Product RAM not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product RAM fetched successfully",
      success: true,
      error: false,
      data: productRams,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while fetching RAM",
      success: false,
      error: true,
    });
  }
}




export async function deleteProductRAMS(request, response){
    const productRAMS = await ProductRAMSModel.findById(request.params.id);

    if(!productRAMS){
        return response.status (404).json({
            message: "Product Not found",
            error:true,
            success:false
        })

    }


      const deletedProductRAMS = await ProductRAMSModel.findByIdAndDelete (request.params.id);

    if (!deletedProductRAMS) {
        response.status(404).json({
        message: "Item not deleted!",
        success: false,
        error:true
    });
}

return response.status(200).json({
    success: true,
    error:false,
    message: "Product RAM Deleted!",
    });
 }




 

 
//Weight









export async function createProductWeight(req, res) {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Weight is required",
      });
    }

    const productWeight = new ProductWeightModel({ name: name.trim() });

    const savedWeight = await productWeight.save();

    return res.status(201).json({
      message: "Product Weight created successfully",
      success: true,
      error: false,
      data: savedWeight,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while creating Product Weight",
      success: false,
      error: true,
    });
  }
}


export async function updateProductWeight(request, response) {
  try {
    const productWeight = await ProductWeightModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
       
      },
      { new: true }
    );

    if (!productWeight) {
      return response.status(404).json({
        message: "The product Weight could not be updated!",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Product Weight updated successfully",
      success: true,
      error: false,
      productWeight,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
  


export async function getProductWeight(req, res) {
  try {
    const productWeight = await ProductWeightModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Product Weight fetched successfully",
      success: true,
      error: false,
      data: productWeight,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while fetching Weight",
      success: false,
      error: true,
    });
  }
}

export async function getProductWeightById(req, res) {
  try {
    const id = req.params.id;

    const productWeight = await ProductWeightModel.findById(id);

    if (!productWeight) {
      return res.status(404).json({
        message: "Product Weight not found",
        error: true,
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product Weight fetched successfully",
      success: true,
      error: false,
      data: productWeight,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while fetching Weight",
      success: false,
      error: true,
    });
  }
}




export async function deleteProductWeight(request, response){
    const productWeight = await ProductWeightModel.findById(request.params.id);

    if(!productWeight){
        return response.status (404).json({
            message: "Product Not found",
            error:true,
            success:false
        })

    }


      const deletedProductWeight = await ProductWeightModel.findByIdAndDelete (request.params.id);

    if (!deletedProductWeight) {
        response.status(404).json({
        message: "Item not deleted!",
        success: false,
        error:true
    });
}

return response.status(200).json({
    success: true,
    error:false,
    message: "Product Weight Deleted!",
    });
 }





 //sizes

 export async function createProductSize(req, res) {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Size is required",
      });
    }

    const productSize = new ProductSizeModel({ name: name.trim() });

    const savedSize = await productSize.save();

    return res.status(201).json({
      message: "Product Size created successfully",
      success: true,
      error: false,
      data: savedSize,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while creating Product Size",
      success: false,
      error: true,
    });
  }
}


export async function updateProductSize(request, response) {
  try {
    const productSize = await ProductSizeModel.findByIdAndUpdate(
      request.params.id,
      {
        name: request.body.name,
       
      },
      { new: true }
    );

    if (!productSize) {
      return response.status(404).json({
        message: "The product Size could not be updated!",
        success: false,
        error: true,
      });
    }

    return response.status(200).json({
      message: "Product Size updated successfully",
      success: true,
      error: false,
      productSize,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
  


export async function getProductSize(req, res) {
  try {
    const productSize = await ProductSizeModel.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Product Size fetched successfully",
      success: true,
      error: false,
      data: productSize,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Server error while fetching Size",
      success: false,
      error: true,
    });
  }
}



export const getProductSizeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid ProductSize ID",
        success: false,
        error: true,
      });
    }

    const size = await ProductSizeModel.findById(id);

    if (!size) {
      return res.status(404).json({
        message: `ProductSize not found with ID ${id}`,
        success: false,
        error: true,
      });
    }

    res.status(200).json({
      data: size,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Server Error",
      success: false,
      error: true,
    });
  }
};






export async function deleteProductSize(request, response){
    const productSize = await ProductSizeModel.findById(request.params.id);

    if(!productSize){
        return response.status (404).json({
            message: "Product Not found",
            error:true,
            success:false
        })

    }


      const deletedProductSize = await ProductSizeModel.findByIdAndDelete (request.params.id);

    if (!deletedProductSize) {
        response.status(404).json({
        message: "Item not deleted!",
        success: false,
        error:true
    });
}

return response.status(200).json({
    success: true,
    error:false,
    message: "Product Size Deleted!",
    });
 }




