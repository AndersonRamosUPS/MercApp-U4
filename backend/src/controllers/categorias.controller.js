const Category = require('../models/Category')

async function listarCategorias(req, res, next) {
  try {
    const categorias = await Category.find().lean()
    const salida = categorias.map((cat) => ({
      id: cat._id.toString(),
      name: cat.name,
    }))

    res.json(salida)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  listarCategorias,
}
