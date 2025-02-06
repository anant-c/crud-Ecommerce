import express from 'express'

import { getProduct,updateProduct, addProduct, deleteProduct } from '../controllers/product.controller.js'

const router = express.Router()


router.get("/", getProduct)

router.post("/", addProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProduct)


export default router;