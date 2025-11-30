const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')

const { conectarBD } = require('./config/db')
const productosRouter = require('./routes/productos.routes')
const categoriasRouter = require('./routes/categorias.routes')
const manejadorErrores = require('./middlewares/errorHandler')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Conectar a Mongo
conectarBD().catch((err) => {
  console.error('Error al conectar a MongoDB:', err)
  process.exit(1)
})

// Middlewares globales
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/uploads', express.static('uploads'))

//Endpoint de healthcheck
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  })
})

// Rutas
app.use('/api/products', productosRouter)
app.use('/api/categories', categoriasRouter)

// Middleware de errores (al final)
app.use(manejadorErrores)

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`)
})
