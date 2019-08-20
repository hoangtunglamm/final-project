const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productModel = new Schema(
  {
    prd_name :{type: String, },
    prd_image: {type: String},
    prd_price: {type: Number, default:0},
    prd_warranty: {type: Number, default:0},
    prd_asccessories: {type: String, default: ''},
    prd_new: {type: String, default: 0},
    prd_promotion: {type: String, default: 0},
    prd_details:{type: String},
    active: {type: Boolean, default: true},
    category: { type: Schema.Types.ObjectId, ref:"category" },
    prd_accessories: {type: String, default: ''},
    prd_featured: {type: Number, default:2},  
    prd_status: {type: Number, default: 1}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("product", productModel);