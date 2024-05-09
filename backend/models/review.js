const mongoose =require("mongoose")
const userSchema = mongoose.Schema({
    customer:String,
    image:String,
    description:String

})
const reviewModel = mongoose.model('Review',userSchema);
module.exports = reviewModel
