import sequelize from 'sequelize';
import db from '../config/db.js';

const Categories = db.define('categorias', {
    name: {
        type: sequelize.STRING(60),
        allowNull: false,
        unique:true
    }
})

export default Categories;