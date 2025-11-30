const mongoose = require('mongoose')
const Joi = require('joi')
const Product = require('../models/Product')

// Esquema de validación con Joi
const esquemaProducto = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  description: Joi.string().allow('', null),
  price: Joi.number().min(0).required(),
  stock: Joi.number().integer().min(0).default(0),
  imageUrl: Joi.string().uri().allow('', null),
  categoryId: Joi.string().allow('', null),
})

// GET /api/products
async function listarProductos(req, res, next) {
  try {
    const productos = await Product.find().lean()
    const salida = productos.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      description: p.description,
      price: p.price,
      stock: p.stock,
      imageUrl: p.imageUrl,
      categoryId: p.categoryId ? p.categoryId.toString() : null,
    }))

    res.json(salida)
  } catch (error) {
    next(error)
  }
}

// GET /api/products/:id
async function obtenerProducto(req, res, next) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const producto = await Product.findById(id).lean()

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json({
      id: producto._id.toString(),
      name: producto.name,
      description: producto.description,
      price: producto.price,
      stock: producto.stock,
      imageUrl: producto.imageUrl,
      categoryId: producto.categoryId
        ? producto.categoryId.toString()
        : null,
    })
  } catch (error) {
    next(error)
  }
}

// POST /api/products
async function crearProducto(req, res, next) {
  try {
    const { value, error } = esquemaProducto.validate(req.body, {
      abortEarly: false,
    })

    if (error) {
      return res.status(400).json({
        message: 'Datos inválidos',
        details: error.details,
      })
    }

    // Limpiar categoryId vacío
    if (!value.categoryId) {
      value.categoryId = null
    }

    const nuevo = await Product.create(value)
    res.status(201).json(nuevo)
  } catch (error) {
    next(error)
  }
}

// PUT /api/products/:id
async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const { value, error } = esquemaProducto.validate(req.body, {
      abortEarly: false,
    })

    if (error) {
      return res.status(400).json({
        message: 'Datos inválidos',
        details: error.details,
      })
    }

    if (!value.categoryId) {
      value.categoryId = null
    }

    const actualizado = await Product.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true,
    })

    if (!actualizado) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json(actualizado)
  } catch (error) {
    next(error)
  }
}

// DELETE /api/products/:id
async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: 'ID inválido' })
    }

    const borrado = await Product.findByIdAndDelete(id)

    if (!borrado) {
      return res.status(404).json({ message: 'Producto no encontrado' })
    }

    res.json({ message: 'Producto eliminado correctamente' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
}
