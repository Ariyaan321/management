const express = require('express')
const router = express.Router()
const {
    readAllData,
    createData,
    updateData,
    deleteData
} = require('../controllers/products')

router.get('/', readAllData)
    .post('/', createData)
    .put('/:id', updateData)
    .delete('/:id', deleteData)

module.exports = router;