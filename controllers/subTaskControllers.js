import { check, validationResult } from "express-validator";
import SubTask from "../models/subTasks.js";

export const createSubTask = async (req, res) => {
    try {
        const { name, status = false, taskId } = req.body;

        await check("name").notEmpty().withMessage("The name is mandatory").isString().withMessage("The name must be a text").isLength({ max: 100 }).withMessage("The category cannot be longer than 100 characters").run(req);
        await check("status").optional().isBoolean().withMessage("The status must be a boolean").run(req);
        await check("taskId").notEmpty().withMessage("The taskId is mandatory").isInt().withMessage("The taskId must be a int").toInt().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        await SubTask.create({ name, status, taskId });
        res.status(201).send("Task successfully created");
    } catch (error) {
        console.log(error);
        res.status(500).json({ "err": 'The subtask could not be created' });
    }
}

export const getSubTasks = async (req, res) => {
    try {
        const id = req.params.id;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const subTasks = await SubTask.findAll({ where: { taskId: id } });

        if (!subTasks) {
            return res.status(404).json({ err: "Subtask not found for this task" });
        }

        res.json({ msg: subTasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "err": 'The subtasks could not be obtained' });
    }
}

export const getSubTask = async (req, res) => {
    try {
        const { id, subTaskId } = req.params;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);
        await check("subTaskId").notEmpty().withMessage("The subTaskId is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const subTask = await SubTask.findOne({ where: { id: subTaskId, taskId: id } });

        if (!subTask) {
            return res.status(404).json({ err: "Subtask not found for this task" });
        }

        res.json({ msg: subTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ "err": 'The subtask could not be obtained' });
    }
}

export const updateSubTask = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, status = false } = req.body;

        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);
        await check("name").optional().isString().withMessage("The title must be a text").isLength({ max: 255 }).withMessage("The category cannot be longer than 255 characters").run(req);
        await check("status").optional().isBoolean().withMessage("The status must be a boolean").run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const subTask = await SubTask.findByPk(id);
        await subTask.update({ name, status });
        res.json({ msg: "The subtask was updated successfully" });

    } catch (error) {
        console.log(error);

        res.status(500).json({ "err": 'The subtask could not be updated' });
    }
}

export const deleteSubTask = async (req, res) => {
    try {
        const id = req.params.id;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const subTask = await SubTask.findByPk(id);
        await subTask.destroy();
        res.json({ msg: "The subtask was successfully removed" });

    } catch (error) {
        res.status(500).json({ "err": 'The subtask could not be deleted' });
    }
}
