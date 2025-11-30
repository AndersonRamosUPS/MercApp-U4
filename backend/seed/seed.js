require('dotenv').config()
const mongoose = require('mongoose')
const { conectarBD } = require('../src/config/db')
const Category = require('../src/models/Category')
const Product = require('../src/models/Product')

async function ejecutarSeed() {
  try {
    await conectarBD()

    console.log('Limpiando colecciones...')
    await Product.deleteMany({})
    await Category.deleteMany({})

    console.log('Creando categorías...')
    const categorias = await Category.insertMany([
      { name: 'Bebidas' },
      { name: 'Snacks' },
      { name: 'Limpieza' },
      { name: 'Tecnología' },
      { name: 'Hogar' },
    ])

    console.log('Creando productos...')
    const productos = [
      {
        name: 'Coca Cola 1L',
        description: 'Bebida gaseosa clásica.',
        price: 1.5,
        stock: 20,
        categoryId: categorias[0]._id,
      },
      {
        name: 'Pepsi 1L',
        description: 'Bebida gaseosa refrescante.',
        price: 1.4,
        stock: 18,
        categoryId: categorias[0]._id,
      },
      {
        name: 'Doritos Queso',
        description: 'Snack de tortilla sabor queso.',
        price: 2.0,
        stock: 30,
        categoryId: categorias[1]._id,
      },
      {
        name: 'Papas Lays',
        description: 'Papas fritas clásicas.',
        price: 1.8,
        stock: 25,
        categoryId: categorias[1]._id,
      },
      {
        name: 'Detergente ACE',
        description: 'Detergente para ropa 1kg.',
        price: 3.5,
        stock: 15,
        categoryId: categorias[2]._id,
      },
      {
        name: 'Lavavajillas Axion',
        description: 'Crema lavaplatos anti-grasa.',
        price: 1.7,
        stock: 22,
        categoryId: categorias[2]._id,
      },
      {
        name: 'Mouse Logitech',
        description: 'Mouse inalámbrico.',
        price: 12.0,
        stock: 10,
        categoryId: categorias[3]._id,
      },
      {
        name: 'Teclado Genius',
        description: 'Teclado de oficina.',
        price: 8.5,
        stock: 14,
        categoryId: categorias[3]._id,
      },
      {
        name: 'Funda para almohada',
        description: 'Tela suave microfibra.',
        price: 4.0,
        stock: 20,
        categoryId: categorias[4]._id,
      },
    ]

    await Product.insertMany(productos)

    console.log('Seed completado con éxito.')
  } catch (error) {
    console.error('Error en el seed:', error)
  } finally {
    await mongoose.disconnect()
    console.log('Conexión cerrada.')
  }
}

ejecutarSeed()
