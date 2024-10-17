const mongoose = require("mongoose");
const UsuarioSchema = mongoose.Schema(
	{
		clave: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("usuario", UsuarioSchema);
