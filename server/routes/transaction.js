import express from "express"
import Product from "../models/Product.js"

const router = express.Router()

router.get("/transactions", async (req, res) => {
  try {
    const transactions = await Product.find().limit(50).sort({ createdOn: -1 })
    res.status(200).json(transactions)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
})

export default router
