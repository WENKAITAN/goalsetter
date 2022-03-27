import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
function GoalForm() {
  const dispatch = useDispatch()
  const [goal, setGoal] = useState("")
  const onChange = (e) => {
      setGoal(e.target.value)
  }
  const onSubmit = (e) => {
      e.preventDefault();
      dispatch(createGoal({text: goal}))
      setGoal("")
  }



  return (
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="">Goal</label>
                <input type="text" onChange={onChange} name="goal" value={goal} id="goal"/> 
            </div>
            <div className="form-group">
                <button className="btn btn-block" type="submit">
                    Add Goal
                </button>
            </div>
        </form>
    </section>
  )
}

export default GoalForm