const mongoose = require("mongoose");
const inventrioSchema = mongoose.Schema(
	{
		producto: {
			type: String,
			require: true,
		},

		precio: {
			type: String,
			require: true,
		},

		cantidad: {
			type: String,
			required: true,
		},

		proveedor: {
			type: String,
			required: true,
		},

		imagen: {
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
