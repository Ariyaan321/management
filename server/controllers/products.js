const Product = require('../models/product')

async function readAllData(req, res) {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch {
        res.status(500).json("Some error occured in getting the products")
    }
}

async function createData(req, res) {
    try {
        const prodName = req.body.ProductName
        const productExist = await Product.findOne({ ProductName: prodName })
        if (productExist) {
            res.status(409).json("Product already exist's")
        }
        else {
            await Product.create(req.body)
            res.status(201).send("Product created successfully")
        }
    } catch {
        res.status(500).json("Some error occured in creating product")
    }
}

async function updateData(req, res) {
    try {
        const productExist = await Product.findOne({ _id: req.params.id })
        if (!productExist) {
            res.status(409).json("product does not exists")
        }
        else {
            await Product.updateOne({ _id: req.params.id }, req.body)
            res.status(202).json("Product updated")
        }
    } catch {
        res.status(500).json("The product_id entered may not be correct")
    }
}

async function deleteData(req, res) {
    try {
        const productExist = await Product.findOne({ _id: req.params.id })
        if (!productExist) {
            res.status(409).json("product does not exists")
        }
        else {
            await Product.deleteOne({ _id: req.params.id })
            res.status(203).json("Product deleted successfully")
        }
    } catch {
        res.status(500).json("The product_id entered may not be correct")
    }
}

module.exports = {
    readAllData,
    createData,
    updateData,
    deleteData
}