const asyncHandler = require('express-async-handler');


const Goal = require('../model/goalModel')
const User = require('../model/userModel')

// @desc     Get goals
// @route    Get /api/Goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {

    const goals = await Goal.find()
    res.status(200).json(goals)
})
// @desc     Create goals
// @route    Post /api/Goals
// @access   Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body["text"]) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    const goal = await Goal.create({
    user: req.user.id,
    text: req.body["text"]
    })

    return res.status(200).json(goal)
})
// @desc     Update goals
// @route    Put /api/Goals/:id
// @access   Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updateGoal = await Goal.findByIdAndUpdate(req.params.id,
         req.body, {new: true})
    res.status(200).json(updateGoal)
})
// @desc     Delete goals
// @route    Delete /api/Goals/:id
// @access   Private
const deleteGoal = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id)
    const goal = await Goal.findById(req.params.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('Not Authorized')
    }


    await goal.remove()
    res.status(200).json({
        id: req.params.id
    })
})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal

}