const productModel  = require("./model");
const categoryModel  = require('../category/model');

const createProduct = ( {catId, prd_name,
                       prd_price, prd_warranty, prd_featured,
                       prd_accessories, prd_new, prd_status,
                      prd_promotion, prd_details, active, }, img_name) =>{
    return new Promise( (resolve, reject) =>{
        categoryModel.findById(catId)
        .then(cat =>{
            if(!cat) console.log('no category found')
              else{
                const product = new productModel({
                    category: catId,
                    prd_name, prd_featured, prd_status,
                    prd_image: img_name, 
                     prd_price, prd_warranty,
                     prd_accessories, prd_new,
                     prd_promotion, prd_details, active
                  });
                  resolve(product.save());
              }
        })
        .catch(err => reject(err))
    })
}

const getAllProduct = () =>{
    return new Promise( (resolve, reject) =>{
        productModel.find({active:true})
        .sort({createdAt: 1})
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

const getProductByPage = (page, perPage) =>{
  return new Promise( (resolve, reject) =>{
    productModel.find({active:true})
    .populate('category')
    .sort([['createdAt', -1]])
    .skip((page - 1) *perPage)
    .limit(perPage)
    .exec()
    .then(products => resolve(products))
    .catch(err => reject(err)) 
  })
}

const findOneProduct = (prdId) =>{
  return new Promise( (resolve, reject) =>{
    productModel.findById(prdId)
    .then(prdFound => resolve(prdFound))
    .catch(err => reject(err))
  })
}

const getProductFeatured = () =>{
  return new Promise( (resolve, reject) =>{
    productModel.find({prd_featured: 1})
    .populate('category')
    .sort([['createdAt', -1]])
    .limit(6)
    .exec()
    .then(prdFound => resolve(prdFound))
    .catch(err => reject(err))
  })
}
const getProductLastest = () =>{
  return new Promise( (resolve, reject) =>{
      productModel.find({active:true})
      .sort({createdAt: -1})
      .limit(6)
      .then(data => resolve(data))
      .catch(err => reject(err))
  })
}

// const getProductByCategory = () =>{
//   return new Promise( (resolve, reject) =>{
//     productModel.find()
//     .populate( 'name')
//     .exec()
//     .then(data => resolve(data))
//     .catch(err => reject(err))
//   })
// }

const getProductByCategory = () =>{
  return new Promise( (resolve, reject) =>{
    productModel.find()
    .populate( 'category', 'name')
    .exec()
    .then(data => resolve(data))
    .catch(err => reject(err))
  })
}


const updateProduct = (prdId, { prd_name,
  prd_price, prd_warranty, prd_status, prd_accessories
  , prd_new, prd_featured,
  prd_promotion, prd_details}, img_name) =>{
  return new Promise( (resolve, reject) =>{
    productModel.findByIdAndUpdate(prdId, { prd_name, prd_price, prd_warranty, prd_details,      
                     prd_new, prd_status,prd_featured,prd_accessories,prd_promotion,
                    active: true, prd_image: img_name })    
                        .then(prdUpdated => resolve(prdUpdated))
                        .catch(err => reject(err))
  })

}

const deleteProduct = (prdId) =>{
  return new Promise( (resolve, reject) =>{
    productModel.findByIdAndUpdate(prdId, {active: false})
    .then(prdDelete => resolve(prdDelete._id))
    .catch(err => reject(err))
  })
}


// const test = (imgId) =>{
//     return new Promise( (resolve, reject) =>{
//         imageModel.findById(
//             imgId, 
//           )
//         .then(img => resolve(img))
//         .catch(err => reject(err))
//     })
// }

module.exports ={ createProduct, 
                  getAllProduct, 
                  updateProduct,
                  deleteProduct, 
                  getProductByPage, 
                  findOneProduct, 
                  getProductFeatured,
                  getProductLastest, 
                  getProductByCategory}
                