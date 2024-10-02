const productoModel = require ('../models/producto')

exports.crearProducto = async (req,res) => {
	console.log(req.body);
	try {
		let productoData;
        productoData = new productoModel (req.body)
		await productoData.save();
		res.send(productoData)
	} catch (error) {
		console.log(error);
		res.status(500).send('Error en la creacion del producto')
	}
}

exports.obtenerProductos = async (req,res) => {
	try {
		const productoData = await productoModel.find()
		res.json(productoData)
	} catch (error) {
		res.status(404).send('No se encontro ningun producto')
	}
}

exports.obtenerProducto = async (req,res) => {
	try {
		const productoData = await productoModel.findById(req.params.id)
		if (!productoData) {
			res.status(404).send({msg:'producto no encontrado'})
		} else {
			res.status(202).send(productoData)
		}
	} catch (error) {
		console.log(error);
		res.status(404).send('hubo un error')
	}
}

exports.modificarProducto = async (req,res) => {
	try {
		const {imagen,producto,precio} = req.body
		let productoData = await productoModel.findById(req.params.id)

		if (!productoData) {
			res.status(500).send({msg:'no se encontro el producto'})
		} else {
			productoData.imagen = imagen;
			productoData.producto = producto;
			productoData.precio = precio;

			await productoModel.findByIdAndUpdate(req.params,id, productoData)
			res.status(202).send('se actualizo la informacion')
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('no se pudo hacer el cambio')
	}
}

exports.eliminarProducto = async (req, res) => {
    try {
        console.log('ID recibido en el backend:', req.params.id);  // Verifica que el ID no es undefined
        let productoData = await productoModel.findById(req.params.id);
        if (!productoData) {
            return res.status(404).send({ msg: 'Producto no encontrado' });
        }
        await productoModel.findByIdAndDelete(req.params.id);
        return res.status(202).send({ msg: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error('Error eliminando el producto:', error);
        return res.status(500).send({ msg: 'No se pudo eliminar el producto' });
    }
};
