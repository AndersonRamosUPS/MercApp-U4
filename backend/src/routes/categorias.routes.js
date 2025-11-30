const express = require('express')
const { listarCategorias } = require('../controllers/categorias.controller')

const router = express.Router()

// GET /api/categories
router.get('/', listarCategorias)

module.exports = router
