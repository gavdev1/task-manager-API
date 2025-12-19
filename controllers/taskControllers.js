import { check, validationResult } from "express-validator";
import Tasks from "../models/tasks.js";
import { Op, Sequelize } from "sequelize";

export const getTasks = async (req, res) => {
    try {
        res.json(await Tasks.findAll());
    } catch (error) {
        res.status(500).json({ "err": 'The categories could not be obtained' });
    }
}

export const getOneTask = async (req, res) => {
    try {
        const id = req.params.id;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The task id must be a integer").toInt().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const task = await Tasks.findOne({ where: { id } });

        if (task) return res.json(task);

        throw new Error();

    } catch (error) {
        res.status(404).json({ "err": 'The task id not exists' });
    }
}

export const createTasks = async (req, res) => {
    try {
        const { title, description, status = false, expireIn, priority, categoryId } = req.body;

        await check("title").notEmpty().withMessage("The title is mandatory").isString().withMessage("The title must be a text").isLength({ max: 255 }).withMessage("The category cannot be longer than 255 characters").run(req);
        await check("description").notEmpty().withMessage("The description is mandatory").isString().withMessage("The description must be a text").run(req);
        await check("status").optional().isBoolean().withMessage("The status must be a boolean").run(req);
        await check("expireIn").notEmpty().withMessage("The expireIn is mandatory").isDate({ format: 'YYYY-MM-DD', strictMode: true }).withMessage("The expiration date must be in the format YYYY-MM-DD").run(req);
        await check("priority").notEmpty().withMessage("The priority is mandatory").isIn(['baja', 'media', 'alta']).withMessage("Priority must be one of the following: baja, media, alta").run(req);
        await check("categoryId").notEmpty().withMessage("The categoryId is mandatory").isInt().withMessage("The categoryId must be a int").toInt().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        await Tasks.create({ title, description, status, expireIn, priority, categoryId });
        res.status(201).send("Task successfully created");
    } catch (error) {
        console.log(error);

        res.status(500).json({ "err": 'The Task could not be created' });
    }
}

export const updateTasks = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, description, status, expireIn, priority } = req.body;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);
        await check("title").optional().notEmpty().withMessage("The title is mandatory").isString().withMessage("The title must be a text").isLength({ max: 255 }).withMessage("The category cannot be longer than 255 characters").run(req);
        await check("description").optional().notEmpty().withMessage("The description is mandatory").isString().withMessage("The description must be a text").run(req);
        await check("status").optional().isBoolean().withMessage("The status must be a boolean").run(req);
        await check("expireIn").optional().notEmpty().withMessage("The date is mandatory").isDate({ format: 'YYYY-MM-DD', strictMode: true }).withMessage("The expiration date must be in the format YYYY-MM-DD").run(req);
        await check("priority").optional().notEmpty().withMessage("The priority is mandatory").isIn(['baja', 'media', 'alta']).withMessage("Priority must be one of the following: baja, media, alta").run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const task = await Tasks.findByPk(id);
        await task.update({ title, description, status, expireIn, priority });
        res.json({ msg: "The task was updated successfully" });

    } catch (error) {
        res.status(500).json({ "err": 'The task could not be updated' });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = req.params.id;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const task = await Tasks.findByPk(id);
        await task.destroy();
        res.json({ msg: "The task was successfully removed" });

    } catch (error) {
        res.status(500).json({ "err": 'The task could not be deleted' });
    }
}



export const pendingTasks = async (req, res) => {
    try {
        res.json({ pending: await Tasks.findAll({ where: { status: false } }) });
    } catch (error) {
        res.status(500).json({ "err": 'The pending tasks could not be obtained' });
    }
}


export const modifiyTaskStatus = async (req, res) => {
    try {
        const id = req.params.id;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const task = await Tasks.findByPk(id);
        task.status = !task.status;
        await task.save();

       task.status ? res.json({ msg: "The task was marked as completed" }) : res.json({ msg: "The task was marked as incomplete" }) ;

    } catch (error) {
        res.status(500).json({ "err": 'The task status could not be modified' });
    }
}

export const getTasksByPriority = async (req, res) => {
  try {
    const tasks = await Tasks.findAll({
      where: {
        priority: {
          [Op.in]: ['alta', 'media', 'baja']
        }
      },
      order: [
        [
          Sequelize.literal(`
            CASE priority
              WHEN 'alta' THEN 1
              WHEN 'media' THEN 2
              WHEN 'baja' THEN 3
              ELSE 4
            END
          `), 
          'ASC'
        ]
      ]
    });
    res.json({msg: tasks})
  } catch (error) {
        res.status(500).json({ "err": 'Tasks could not be retrieved by priority' });
  }
};