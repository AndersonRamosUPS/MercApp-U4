const mongoose = require('mongoose')

async function conectarBD() {
  const uri = process.env.MONGODB_URI

  if (!uri) {
    throw new Error('Falta la variable MONGODB_URI en el archivo .env')
  }

  await mongoose.connect(uri)
  console.log('[MongoDB] Conectado correctamente')
}

module.exports = {
  conectarBD,
}
