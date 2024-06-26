const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const DataSchema = mongoose.Schema({
    users:{
        type:[ObjectId],
        default:[]
    },
    email:{type:String},
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    priority: { type: String},
    status: { type: String},
    category: { type: String },
    createdAt: { type: Date, default: Date.now }
},{versionKey: false})

const TasksModel = mongoose.model('tasks', DataSchema);
module.exports = TasksModel;


