const inventarioModel = require("../models/inventario");

exports.crearInventario = async (req, res) => {
	try {
		req.body.inventario = JSON.parse(req.body.inventario);
		req.body.urlImagen = req.file.path.replace(/\\/g, '/')
		inventarioData = new inventarioModel(req.body);
		await inventarioData.save();
		res.status(202).send(inventarioData);
	} catch (error) {
		console.log(error);
		res.status(500).send("no se pudo crear");
	}
};

exports.traerInventario = async (req, res) => {
	try {
		const inventarioData = await inventarioModel.find();
		res.json(inventarioData);
	} catch (error) {
		console.log(error);
		res.status(404).send("no se encontró nada en la pagina");
	}
};

exports.modificarInventario = async (req, res) => {
	try {
		const idInventario = req.params.id;

		const {
			id,
			producto,
			precio,
			cantidad,
			talla,
			proveedor,
			catalogo,
			disponibilidad,
		} = req.body;
		let inventarioData = await inventarioModel.find({ id: idInventario });

		if (!inventarioData) {
			res.status(500).send({ msg: "no se encontró el producto" });
		} else {
			inventarioData.id = id;
			inventarioData.producto = producto;
			inventarioData.precio = precio;
			inventarioData.cantidad = cantidad;
			inventarioData.talla = talla;
			inventarioData.proveedor = proveedor;
			inventarioData.catalogo = catalogo;
			inventarioData.disponibilidad = disponibilidad;

			const modificado = await inventarioModel.findOneAndUpdate({ id: req.params.id }, inventarioData, { new: true })
			res.status(200).send(modificado);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("no se pudo hacer el cambio");
	}
};


exports.eliminarInventario = async (req, res) => {
	try {
		let inventarioData = await inventarioModel.find({ id: req.params.id });
		if (!inventarioData) {
			res.status(404).send({ msg: "no se encontró" });
		} else {
			await inventarioModel.findByIdAndDelete(req.params.id);
			res.status(200).send({ msg: "se eliminó el producto" });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un problema");
	}
};


exports.infoInventario = async (req, res) => {
	try {
		const filtro = req.params.filtro;
		let inventarioData
		switch (filtro) {
			case 'productos':
				inventarioData = await inventarioModel.countDocuments();
				break;
			case 'stock':
				inventarioData = await inventarioModel.aggregate([
					{
						$unwind: "$inventario" // Descomponemos el array 'inventario'
					},
					{
						$match: {
							"inventario.checked": true // Solo consideramos los elementos donde 'checked' es true
						}
					},
					{
						$group: {
							_id: null, // No agrupamos por ningún campo específico
							totalCantidad: { $sum: "$inventario.cantidad" } // Sumamos todas las cantidades
						}
					}
				])
				break;
			case 'proveedores':
				inventarioData = await inventarioModel.aggregate([
					{
						$group: {
							_id: "$proveedor",
						}
					},
					{
						$count: "totalProveedores"
					}
				]);
				break;
			default:
				res.status(401).json({ msg: "No se especifico el filtro" });
				break;
		}
		res.status(201).json(inventarioData);
	} catch (error) {
		console.log(error);
		res.status(404).send("no se encontró nada en la pagina");
	}
}

exports.buscarProducto = async (req, res) => {
	try {
		const filtroBusqueda = req.body.busqueda;
		const inventarioData = await inventarioModel.find({ producto: { $regex: filtroBusqueda, $options: 'i' } });
		if (!inventarioData) {
			res.status(204).send({ msg: "no se encontraron resultados" });
		} else {
			res.status(200).json(inventarioData);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un problema");
	}
}

