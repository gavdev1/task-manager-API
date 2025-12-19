import Sequelize from "sequelize";
import db from "../config/db.js";
import Categories from "./categories.js";

const Tasks = db.define('tasks', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    expireIn: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            isAfter: new Date().toISOString()
        }
    },
    priority: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['baja', 'media', 'alta'],
    }
})

Categories.hasMany(Tasks, {foreignKey: "categoryId"});
export default Tasks;