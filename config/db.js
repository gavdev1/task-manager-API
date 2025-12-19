import Sequelize from 'sequelize';

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    define: {
        timestamps: true
    },
    pool: {
        min: 1,
        max: 5,
        acquire: 30000,
        idle: 10000
    }
})

export default db;