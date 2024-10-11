const express = require("express");
const router = express.Router();
const usariosController = require("../controllers/usuarioController");
const inventarioController = require("../controllers/inventarioController");

//rutas para crear y obtener usuarios
router.post("/crear-usuario", usariosController.crearUsuario);
router.get("/obtener-usuarios", usariosController.obtenerUsuarios);
router.get("/obtener-usuario/:id", usariosController.obtenerUsuario);
router.delete("/eliminar-usuario/:id", usariosController.eliminarUsuario);

//rutas para añadir,obtener ,modificar y eliminar inventario
router.post("/crear-inventario", inventarioController.crearInventario);
router.get("/obtener-inventario", inventarioController.traerInventario);
router.put("/modificar-inventario/:id",inventarioController.modificarInventario);
router.delete("/eliminar-item/:id", inventarioController.eliminarInventario);

module.exports = router;
