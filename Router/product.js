const express=require("express")
const router=express.Router();
const productSchema=require("../Models/ProductModel")
const authorization=require("../Middleware/auth")
//get all product
router.get("/api/allProduct",async (req,res)=>{
  const page=parseInt(req.query.page)
  const limit1=parseInt(req.query.limit)
  console.log(typeof page,typeof limit1);
     try{
      const data=await productSchema.find().skip((page-1)*limit1).limit(limit1).populate('user')
      if(data){
        res.status(200).json({data})
      }
      res.status(200).json({msg:"hello"})
     }catch(err){
        console.log(err)
     }
    
})




//insert new product
router.post("/api/insert",authorization,async (req,res)=>{
  try{
    console.log(req.body)
    const user=req.userid
    const {title,description,mediaUrl}=req.body
    if(!title || !description || !mediaUrl){
      return res.status(400).json({err:"please filled all details"})
    }
    const newProduct=await new productSchema({
     title,description,mediaUrl,user
    }).save();
  
    if(newProduct){
      return res.status(200).json({msg:"product added successfully"})
    }
  }catch(err){
    console.log(err);
  }
  
})

router.get("/getBlog/:pid",async (req,res)=>{
  try{
   const productId=req.params.pid.toString()
const data=await productSchema.findOne({_id:productId}).populate("user")
if(data){
return res.status(200).json({data})
}
  }catch(err){
console.log(err);
  }
})
 

module.exports=router;