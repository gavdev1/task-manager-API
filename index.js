import express from 'express';
import db from './config/db.js';
import categoriesRouter from './routes/categoriesRouter.js';
import taskRouter from './routes/taskRouter.js';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRouter);
app.use('/task', taskRouter);

app.use((req, res) => res.status(404).json({ msg: 'route not found' }))


const port = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Conectado a la DB');

        app.listen(port);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

startServer();