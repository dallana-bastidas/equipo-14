const express = require ('express')
const router = express.Router();
const usariosController = require('../controllers/usuarioController') 
const productoController = require('../controllers/productoController')
const inventarioController = require('../controllers/inventarioController')

//rutas para crear y obtener usuarios
router.post('/crear-usuario',usariosController.crearUsuario)
router.get('/obtener-usuarios',usariosController.obtenerUsuarios)
router.get('/obtener-usuario/:id',usariosController.obtenerUsuario)
router.delete('/eliminar-usuario/:id',usariosController.eliminarUsuario)

//rutas para crear, obtener, editar y eliminar productos
router.post('/crear-producto',productoController.crearProducto)
router.get('/obtener-productos',productoController.obtenerProductos)
router.get('/obtenr-producto/:id',productoController.obtenerProducto)
router.put('/modificar-producto/:id',productoController.modificarProducto)
router.delete('/eliminar-producto/:id', productoController.eliminarProducto);

//rutas para añadir,obtener ,modificar y eliminar inventario
router.post('/crear-inventario',inventarioController.crearInventario)
router.get('/obtener-inventario',inventarioController.traerInventario)
router.put('/modificar-inventario/:id',inventarioController.modificarInventario)
router.delete('/eliminar-item/:id',inventarioController.eliminarInventario)


module.exports = router;
