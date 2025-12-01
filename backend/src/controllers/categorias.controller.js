const Category = require('../models/Category')

// GET /api/categories
async function listarCategorias(req, res, next) {
  try {
    const categorias = await Category.find().lean()
    const salida = categorias.map((cat) => ({
      id: cat._id.toString(),
      name: cat.name,
      description: cat.description ?? '',
    }))
    res.json(salida)
  } catch (error) {
    next(error)
  }
}

// POST /api/categories
async function crearCategoria(req, res, next) {
  try {
    const { name, description } = req.body

    if (!name) {
      return res.status(400).json({ message: 'El nombre es obligatorio' })
    }

    const nueva = await Category.create({ name, description })
    res.status(201).json({
      id: nueva._id.toString(),
      name: nueva.name,
      description: nueva.description ?? '',
    })
  } catch (error) {
    next(error)
  }
}

// PUT /api/categories/:id
async function actualizarCategoria(req, res, next) {
  try {
    const { id } = req.params
    const { name, description } = req.body

    const actualizada = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    )

    if (!actualizada) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }

    res.json({
      id: actualizada._id.toString(),
      name: actualizada.name,
      description: actualizada.description ?? '',
    })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/categories/:id
async function eliminarCategoria(req, res, next) {
  try {
    const { id } = req.params
    const eliminada = await Category.findByIdAndDelete(id)

    if (!eliminada) {
      return res.status(404).json({ message: 'Categoría no encontrada' })
    }

    res.status(204).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarCategorias,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
}
