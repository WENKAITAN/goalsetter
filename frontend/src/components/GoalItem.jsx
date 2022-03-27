import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'
function GoalItem({goal}) {
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch(deleteGoal(goal._id))
  }
  const {user} = useSelector((state) => state.auth)
  return (
    <div className="goal">
        <div>
            {new Date(goal.createdAt).toLocaleString('en-US')}
        </div>
        <h2>{goal.text}</h2>
        {user._id === goal.user && <button className="close" onClick={onClick}>X</button>}
    </div>
  )
}

export default GoalItem