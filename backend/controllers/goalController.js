const asyncHandler = require('express-async-handler');

// @desc     Get goals
// @route    Get /api/Goals
// @access   Private
const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: "get goals"
    })
})
// @desc     Create goals
// @route    Post /api/Goals
// @access   Private
const createGoal = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error("Please add a text field")
    }
    res.status(200).json({message: "create goals"})
})
// @desc     Update goals
// @route    Put /api/Goals/:id
// @access   Private
const updateGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `update goals ${req.params.id}`
    })
})
// @desc     Delete goals
// @route    Delete /api/Goals/:id
// @access   Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({
        message: `delete goals ${req.params.id}`
    })
})

module.exports = {
    getGoals,
    createGoal,
    updateGoal,
    deleteGoal

}