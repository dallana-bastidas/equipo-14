// const mongoose = require('mongoose');
// require('dotenv').config();

// const conectarDb = async () => {
//     try {
//         await mongoose.connect(process.env.DB_MONGO)
//         console.log('DB esta conectada');
//     } catch (error) {
//         console.log(error);
//         process.exit(1)
//     }
// }

// module.exports = conectarDb

const mongoose = require('mongoose');
require('dotenv').config();

const conectarDb = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DB está conectada');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = conectarDb;
