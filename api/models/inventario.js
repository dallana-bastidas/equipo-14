const mongoose = require("mongoose");
const inventrioSchema = mongoose.Schema(
	{
		id: {
			type: Number,
			require: true,
		},

		producto: {
			type: String,
			require: true,
		},

		precio: {
			type: String,
			require: true,
		},

		cantidad: {
			type: Number,
			required: true,
		},

		talla: {
			type: String,
			require: true,
		},

		proveedor: {
			type: String,
			required: true,
		},

		catalogo: {
			type: String,
			require: true,
		},

		disponibilidad: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("inventario", inventrioSchema);
