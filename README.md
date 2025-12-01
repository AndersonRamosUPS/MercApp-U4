#  MercApp

Aplicación web tipo SPA para gestión de catálogo de productos, búsqueda avanzada, carrito de compras y CRUD completo.
Desarrollada con **Vue 3, Vite, Node.js, Express y MongoDB**.

---

## Datos del estudiante

- **Nombre:** Anderson Vicente Ramos Iza  
- **Carrera:** Ingenieria en Software
- **Materia:** Aplicaciones Web  
- **Docente:** Ing. Jose Jaime  
- **Fecha:** 23/11/2025
--
MercApp es una aplicación web SPA desarrollada con Vue 3 + Vite, que consume una API REST propia construida en Node.js + Express conectada a MongoDB Atlas.
El sistema permite gestionar productos (CRUD), visualizar detalles, buscar, filtrar por categoría y administrar un carrito persistente.
---

## El proyecto inclue:
- frontend/ → SPA desplegado en Netlify
- backend/ → API REST desplegada en Railway
- docs/ → Micrositio documental desplegado en GitHub Pages

## Funcionalidades principales

### SPA completa con Vue 3
- Catálogo dinámico de productos
- Vista de detalles
- CRUD completo desde el frontend
- Búsqueda reactiva
- Filtros por categoría
- Carrito persistente (LocalStorage)
- Lazy loading de vistas
- **< Suspense >** para loaders y fallbacks
### API REST – Node + Express
- Endpoints CRUD para productos
- Endpoint de categorías
- Validaciones con express-validator
- Manejo de errores centralizado
- CORS restringido al dominio de Netlify
- Despliegue profesional en Railway
### Base de datos – MongoDB Atlas
- Colecciones: **products**, **categories**
- Usuario con rol adecuado
- IP allowlist configurado
- TLS activo según requisitos del curso
---

## URLs Públicas del Proyecto
Frontend (Netlify)
* https://friendly-hummingbird-6b7487.netlify.app

Backend (Railway)
* Productos: https://merry-nourishment-production-f345.up.railway.app/api/products
* Categorías: https://merry-nourishment-production-f345.up.railway.app/api/categories

Micrositio (GitHub Pages)

* https://TU-USUARIO.github.io/MercApp-U4/
---

## Endpoints principales
| Ruta                   | Rutas             | Descripción                       |
| -----------------------|-------------------| --------------------------------- |
| GET                    |  /api/products    |Lista de productos                 |
| GET                    |/api/products/:id  |Trae el detalle de un producto     |
| POST                   |/api/products      | Crea un nuevo producto            |
| PUT                    |/api/products/:id  | Editar producto existente         |
| DELETE                 | /api/products/:id | Elimina un producto               |
| GET                    | /api/categories   | Lista categorías                  |
---
### Estructura del proyecto
```
MercApp-U4/
 ├── backend/
 │   ├── src/
 │   │   ├── models/
 │   │   │     ├── Category.js
 │   │   │     └── Product.js
 │   │   ├── controllers/
 │   │   ├── routes/
 │   │   ├── middlewares/
 │   │   ├── config/
 │   │   └── index.js
 │   ├── seed/
 │   │   └── seed.js
 │   ├── .env.example
 │   ├── package.json
 │   └── package-lock.json
 │
 ├── frontend/
 │   ├── public/
 │   │   └── _redirects
 │   ├── src/
 │   │   ├── views/
 │   │   ├── components/
 │   │   ├── composables/
 │   │   ├── router/
 │   │   └── services/
 │   ├── index.html
 │   ├── .env.example
 │   ├── package.json
 │   └── vite.config.ts
 │
 ├── docs/
 │   ├── assets/
 │   ├── index.html
 │   └── styles.css
 │
 ├── README.md
 └── .gitignore

```
----------
## Tecnologías utilizadas
### Frontend
- Vue 3 (Composition API)
- Vite
- Vue Router
- CSS
- Composables
- Fetch API
- LocalStorage
### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- express-validator
- dotenv
- CORS
- Railway
----------
## Instalacion y ejecucion local
### Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

Variables necesarias:
```bash
MONGODB_URI=...
PORT=3000
CORS_ORIGIN=http://localhost:5173

```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
------------
## Variables de entorno de producción
### Railway (backend)
```bash
MONGODB_URI=...
PORT=8080
CORS_ORIGIN=https://friendly-hummingbird-6b7487.netlify.app
```
### Netlify (frontend)
```bash
VITE_API_BASE_URL=https://merry-nourishment-production-f345.up.railway.app/api
```
-----------
## Despliegue
### Backend (Railway)
- Importado desde GitHub
- Variables configuradas
- Deploy automático con Nixpacks
### Frontend (Netlify)
```bash
Base directory: frontend
Build command: npm run build
Publish directory: dist

```
----------
##  Créditos
Proyecto desarrollado por Anderson Vicente Ramos Iza.
Materia: Aplicaciones Web.
Docente: Ing. Jose Jaime.