const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: [20, "Length should not be more than 20 characters"],
        required: [true, "Please enter value"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const Task = model('Task', taskSchema)

module.exports = Task