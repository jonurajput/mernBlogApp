const mongoose=require("mongoose")
const {ObjectId}=mongoose.Schema.Types
const reqType={
    type:"String",
    required:true
}
const ProductSchema=mongoose.Schema({
   title:reqType,
  description:reqType,
  mediaUrl:reqType,
  user:{
      type:ObjectId,
      ref:"user"
  },

},{
    timestamps:true
})

module.exports=mongoose.model("product",ProductSchema)