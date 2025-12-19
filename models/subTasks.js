import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Tasks from "./tasks.js";

const SubTask = db.define("sub_tasks", {
    name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique:true
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Tasks.hasMany(SubTask, {foreignKey: "taskId", onDelete: "CASCADE"})
export default SubTask;