function manejadorErrores(err, req, res, next) {
  console.error('[Error]', err)

  const estado = err.status || 500
  const mensaje = err.message || 'Error interno del servidor'

  res.status(estado).json({
    message: mensaje,
  })
}

module.exports = manejadorErrores
