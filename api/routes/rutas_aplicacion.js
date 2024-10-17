const express = require("express");
const router = express.Router();
const usariosController = require("../controllers/usuarioController");
const inventarioController = require("../controllers/inventarioController");
const upload = require("../middleware/multer.middleware");

//rutas para crear y obtener usuarios
router.post("/crear-usuario", usariosController.crearUsuario);
router.get("/obtener-usuarios", usariosController.obtenerUsuarios);
router.get("/obtener-usuario/:id", usariosController.obtenerUsuario);
router.post("/login/ingreso-sistema", usariosController.obtenerUsuarioXEmail);
router.delete("/eliminar-usuario/:id", usariosController.eliminarUsuario);

//rutas para añadir,obtener ,modificar y eliminar inventario
router.post("/inventario/registrar-producto", upload.single('file'), inventarioController.crearInventario);
router.get("/inventario/obtener-inventario", inventarioController.traerInventario);
router.put("/inventario/modificar-inventario/:id", inventarioController.modificarInventario);
router.delete("/inventario/eliminar-item/:id", inventarioController.eliminarInventario);
router.get("/inventario/contador-inventario/:filtro", inventarioController.infoInventario);
router.post("/inventario/buscar-producto", inventarioController.buscarProducto);


module.exports = router;
