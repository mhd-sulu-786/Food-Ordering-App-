const mongoose =require("mongoose")
const userSchema = mongoose.Schema({
    chefname:String,
    image:String,
    description:String

})
const chefModel = mongoose.model('Chef',userSchema);
module.exports=chefModel
