const usuarioModel = require("../models/usuario");

exports.crearUsuario = async (req, res) => {
	console.log(req.body);
	try {
		let usuarioData;
		usuarioData = new usuarioModel(req.body);
		await usuarioData.save();
		res.send(usuarioData);
	} catch (error) {
		console.log(error);
		res.status(500).send("hubo un proble con tu registro");
	}
};

exports.obtenerUsuarios = async (req, res) => {
	try {
		const usuarioData = await usuarioModel.find();
		res.json(usuarioData);
	} catch (error) {
		console.log(error);
		res.status(404).send("no se encontro ningun usuario");
	}
};

exports.obtenerUsuario = async (req, res) => {
	try {
		const usuarioData = await usuarioModel.findById(req.params.id);
		if (!usuarioData) {
			return res.status(404).send({msg:'usuario no encontrado'})
		} else {
			return res.status(202).send(usuarioData);
		}
		
	} catch (error) {
		console.log(error);
		res.status(404).send("no se encontro ningun usuario");
	}
};

exports.eliminarUsuario = async (req, res) => {
	try {
		const usuarioData = await usuarioModel.findById(req.params.id);
		if (!usuarioData) {
			return res.status(404).send("no se encontoro el usuario");
		} else {
			await usuarioModel.findByIdAndDelete(req.params.id);
			res.status(202).send({ msg: "usuario eliminado correctamente" });
		}
	} catch (error) {
		console.log(error);
		res.status(404).send("no se encontro ningun usuario");
	}
};
