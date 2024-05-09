
const mongoose =require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    image:String,
    category:String
  
 
});
const categoryModel = mongoose.model("Food category",userSchema);
module.exports=categoryModel