
const express=require('express')
 const router=express.Router()

 router.get('/addproduct',(req,res)=>{
res.send("hello")
 })

 module.exports=router