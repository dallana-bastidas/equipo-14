const multer = require('multer');
const fs = require('fs');

/**
 * @description Middleware para la carga de archivos con Multer
 * @param {*} req
 * @param {} file
 * @param {*} cb
 */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const endpointSolicitado = req.route.path;
		let directorioAGuardar = '';
		switch (endpointSolicitado) {
			case "/img-usuario":
				directorioAGuardar = 'uploads/avatares/';
				rectifcarDirectorio(directorioAGuardar);
				cb(null, directorioAGuardar);
				break;
			default:
				directorioAGuardar = 'uploads/inventario/';
				rectifcarDirectorio(directorioAGuardar);
				cb(null, directorioAGuardar);
				break;
		}
	},
	filename: function (req, file, cb) {
		const endpointSolicitado = req.route.path;
		switch (endpointSolicitado) {
			case "/img-usuario":
				cb(null, `${Date.now()}_avatar_usuario_${generadorRandomCadena(20)}.${file.originalname.split('.').pop()}`);
				break;
			default:
				cb(null, `${Date.now()}_inventario_${generadorRandomCadena(20)}.${file.originalname.split('.').pop()}`);
				break;
		}
	}
});

/**
 * @description Función para rectificar si existe el directorio
 * @param {*} directorioAGuardar 
 */
function rectifcarDirectorio(directorioAGuardar) {
	if (!fs.existsSync(directorioAGuardar)) {
		fs.mkdirSync(directorioAGuardar);
	}
}

/**
 * @description Función para generar una cadena aleatoria para designar como nombre del archivo
 * @param {*} longitudCadena 
 * @returns Cadena aleatoria con la longitud designada
 */
function generadorRandomCadena(longitudCadena) {
	let cadenaResultante = '';
	const caracteresAdmitidos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const cantidadElementos = caracteresAdmitidos.length;
	for (let i = 0; i < longitudCadena; i++) {
		cadenaResultante += caracteresAdmitidos.charAt(Math.floor(Math.random() * cantidadElementos));
	}
	return cadenaResultante;
}

const upload = multer({ storage });

module.exports = upload;
