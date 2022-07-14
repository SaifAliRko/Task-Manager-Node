//      Routes


const express = require('express')
const { getAllTasks, createTask, updateTask, deleteTask, getTask } = require('../controllers/task')
const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').patch(updateTask).delete(deleteTask).get(getTask)

module.exports=router