const express = require('express')
const {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require('../controllers/categorias.controller')

const router = express.Router()

// GET /api/categories
router.get('/', listarCategorias)

// POST /api/categories
router.post('/', crearCategoria)

// PUT /api/categories/:id
router.put('/:id', actualizarCategoria)

// DELETE /api/categories/:id
router.delete('/:id', eliminarCategoria)

module.exports = router
