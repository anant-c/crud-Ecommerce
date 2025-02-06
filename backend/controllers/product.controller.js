import Product from '../models/product.model.js'
import mongoose from 'mongoose'

export const getProduct = async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log("error in fetching products.")
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const addProduct = async (req,res)=>{
    const product = req.body; // user will send this data

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false, message:"Please provide all fields."})
    }

    const newProduct = new Product(product)

    try{
        await newProduct.save()
        res.status(201).json({success:true, data: newProduct})
    }
    catch(error){
        console.error("Error in saving product:  ", error.message)
        res.status(500).json({success:false, message: "Server Error"})
    }
}

export const updateProduct = async (req,res)=>{
    const {id} = req.params
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id so cann't update."})
    }
    
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id,product, {new: true})
        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product updated Successfully!!"
        })
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error"})
    }
}

export const deleteProduct = async (req,res)=>{
    const {id} = req.params
    // console.log("id: ",id);

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid Product Id so cann't delete."})
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted."})
    } catch (error) {
        res.status(500).json({success: false, message: "Server Error."})
    }
}