const inventarioModel = require("../models/inventario");

exports.crearInventario = async (req, res) => {
	try {
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
		let inventarioData;
		inventarioData = new inventarioModel({
			id,
			producto,
			precio,
			cantidad,
			talla,
			proveedor,
			catalogo,
			disponibilidad,
		});
		await inventarioData.save();
		res.send(inventarioData);
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

			const modificado = await inventarioModel.findOneAndUpdate({id: req.params.id}, inventarioData,{new:true})
			res.status(200).send(modificado);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("no se pudo hacer el cambio");
	}
};


exports.eliminarInventario = async (req, res) => {
	try {
		let inventarioData = await inventarioModel.find({id: req.params.id});
		if (!inventarioData) {
			res.status(404).send({ msg: "no se encontró" });
		} else {
			await inventarioModel.findOneAndDelete({id: req.params.id});
			res.status(200).send("se elimino el item");
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un problema");
	}
};



// "id":,
// "producto":,
// "precio":,
// "cantidad":,
// "talla":,
// "proveedor":,
// "catalogo":,
// "disponibilidad":,
