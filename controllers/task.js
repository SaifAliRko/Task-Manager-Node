//          Controllers

const { createCustomError } = require('../erros/custom-errors')
const asyncWrapper = require('../middleware/async')
const Task = require('../models/Task')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    return res.status(200).json({ tasks })
})

const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskId } = req.params
    const task = await Task.findOne({ _id: taskId })
    if (!task) {
        return next(createCustomError(`No task found with id : ${taskId}`, 404))
    }
    res.status(200).json({ task })
})

const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, { new: true, runValidators: true })
    if (!task) {
        return next(createCustomError(`No task found with id : ${taskId}`, 404))
    }
    res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params
    const task = await Task.findOneAndDelete({ _id: taskId })
    if (!task) {
        return next(createCustomError(`No task found with id : ${taskId}`, 404))
    }
    res.status(200).json({ task })

})

const createTask = asyncWrapper(async (req, res) => {
    const task = new Task(req.body)
    await task.save()
    res.status(201).json({ task })
})

module.exports = {
    getAllTasks, getTask, updateTask, deleteTask, createTask
}