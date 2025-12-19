import { check, validationResult } from "express-validator";
import Categories from "../models/categories.js"

export const getCategories = async (req, res) => {
    try {
        res.json(await Categories.findAll());
    } catch (error) {
        res.status(500).json({ "err": 'The categories could not be obtained' });
    }
}

export const createCategory = async (req, res) => {
    try {
        const name = req.body.name;

        await check("name").notEmpty().withMessage("The name is mandatory").isString().withMessage("The name must be a text").isLength({ max: 60 }).withMessage("The name cannot be longer than 60 characters").run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        await Categories.create({ name });

        res.status(201).send("Category successfully created");
    } catch (error) {
        res.status(500).json({ "err": 'The category could not be created' });
    }
}


export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;

        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The id must be a integer").toInt().run(req);
        await check("name").optional().isString().withMessage("The name must be a text").isLength({ max: 60 }).withMessage("The name cannot be longer than 60 characters").run(req);
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const category = await Categories.findByPk(id);
        if (!category) {
            return res.status(404).json({ err: "Category not found" });
        }

        await category.update({ name });
        res.json({ msg: "The category was updated successfully" });

    } catch (error) {
        res.status(500).json({ "err": 'The category could not be updated' });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        await check("id").notEmpty().withMessage("The id is mandatory").isInt().withMessage("The category must be a integer").toInt().run(req);
        const errors = validationResult(req);

        if (!errors.isEmpty()) return res.status(400).json({ "err": errors.array().map(e => e.msg) });

        const category = await Categories.findByPk(id);
        if (!category) {
            return res.status(404).json({ err: "Category not found" });
        }

        await category.destroy();
        res.json({ msg: "The category was successfully removed" });

    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            return res.status(400).json({ err: 'Cannot delete category: It has associated tasks' });
        }

        res.status(500).json({ "err": 'The category could not be deleted' });
    }
}

