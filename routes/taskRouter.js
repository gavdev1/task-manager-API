import { Router } from 'express';
import { createTasks, deleteTask, getOneTask, getTasks, getTasksByPriority, modifiyTaskStatus, pendingTasks, updateTasks } from '../controllers/taskControllers.js';
import { createSubTask, deleteSubTask, getSubTask, getSubTasks, updateSubTask } from '../controllers/subTaskControllers.js';

const taskRouter = Router();

taskRouter.get('/', getTasks);

taskRouter.post('/', createTasks);

taskRouter.get('/pending', pendingTasks);

taskRouter.get('/priority', getTasksByPriority);


taskRouter.get('/:id', getOneTask);

taskRouter.put('/status/:id', modifiyTaskStatus);
taskRouter.put('/:id', updateTasks);

taskRouter.delete('/:id', deleteTask);

// SubTask Router

taskRouter.post('/sub-task/', createSubTask);

taskRouter.get('/sub-task/:id', getSubTasks);

taskRouter.get('/sub-task/:id/:subTaskId', getSubTask);

taskRouter.put('/sub-task/:id', updateSubTask);

taskRouter.delete('/sub-task/:id', deleteSubTask);



export default taskRouter;