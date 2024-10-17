const mongoose = require("mongoose");
const inventrioSchema = mongoose.Schema(
	{
		descripcion: {
			type: String,
			required: true
		},
		genero: {
			type: String,
			required: true
		},
		inventario: {
			type: [
				{
					talla: String,
					cantidad: Number,
					checked: Boolean
				}
			],
			required: true
		},
		precioProveedor: {
			type: Number,
			required: true
		},
		precioPublico: {
			type: Number,
			required: true
		},
		producto: {
			type: String,
			required: true
		},
		proveedor: {
			type: String,
			required: true
		},
		urlImagen: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("inventario", inventrioSchema);
