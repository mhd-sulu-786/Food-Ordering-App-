const mongoose =require("mongoose")
const userSchema = mongoose.Schema({
    name:String,
   address:String,
    total:Number,
    place:String

})
const paymentModel = mongoose.model('Payment Details',userSchema);
module.exports=paymentModel
