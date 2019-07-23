const productModel  = require("./model");
const categoryModel  = require('../category/model');

const createProduct = (catId, { prd_name,
                       prd_price, prd_warranty, 
                      prd_asccessories, prd_new, 
                      prd_promotion, prd_details, active}, img_name) =>{
    return new Promise( (resolve, reject) =>{
        categoryModel.findById(catId)
        .then(cat =>{
            if(!cat) console.log('error')
              else{
                const product = new productModel({
                    category: catId,
                    prd_name,
                    prd_image: img_name, 
                     prd_price, prd_warranty,
                     prd_asccessories, prd_new,
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
        .populate('category')
        .exec()
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}

const getProductByPage = (pageNumber) =>{
  return new Promise( (resolve, reject) =>{
    productModel.find({active:true})
    .populate('category')
    .skip((pageNumber - 1) *6)
    .limit(6)
    .exec()
    .then(products => resolve(products))
    .catch(err => reject(err)) 
  })
}

const updateProduct = (prdId, { prd_name, prd_image,
  prd_price, prd_warranty,
  prd_asccessories, prd_new,
  prd_promotion, prd_details, active}) =>{
  return new Promise( (resolve, reject) =>{
    productModel.findByIdAndUpdate(
        prdId, { prd_name, prd_image,
        prd_price, prd_warranty,
        prd_asccessories, prd_new,
        prd_promotion, prd_details, active}
    )
    .then(prdUpdated => resolve(prdUpdated))
    .catch(err => reject(err))
  })
}

const deleteProduct = (prdId) =>{
  return new Promise( (resolve, reject) =>{
    productModel.findByIdAndUpdate(prdId, {active: false})
    .then(imageDeleted => resolve(imageDeleted._id))
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

module.exports ={ createProduct, getAllProduct, updateProduct, deleteProduct, getProductByPage}