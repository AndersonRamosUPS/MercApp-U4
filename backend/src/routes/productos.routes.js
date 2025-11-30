const express = require('express')
const {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productos.controller')

const router = express.Router()

// GET /api/products
router.get('/', listarProductos)

// GET /api/products/:id
router.get('/:id', obtenerProducto)

// POST /api/products
router.post('/', crearProducto)

// PUT /api/products/:id
router.put('/:id', actualizarProducto)

// DELETE /api/products/:id
router.delete('/:id', eliminarProducto)

module.exports = router
