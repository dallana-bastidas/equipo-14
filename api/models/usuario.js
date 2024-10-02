const mongoose = require("mongoose");
const UsuarioSchema = mongoose.Schema(
	{
		nombres: {
			type: String,
			required: true,
		},

		apellidos:{
			type:String,
			required:true,
		},
		clave: {
			type: String,
			required: true,
		},
		correoElectronico: {
			type: String,
			required: true,
		},
		fechaNacimiento: {
			type: Date,
			required: false,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("usuario", UsuarioSchema);
