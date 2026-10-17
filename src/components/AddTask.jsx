import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../features/tasks/taskSlice.js'

function AddTask() {
  const [description, setDescription] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()
    const trimmedDescription = description.trim()
    if (!trimmedDescription) return

    dispatch(addTask(trimmedDescription))
    setDescription('')
  }

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="new-task">Add a task</label>
      <input
        id="new-task"
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="What needs your attention?"
        autoComplete="off"
      />
      <button className="add-button" type="submit" disabled={!description.trim()}>
        <span aria-hidden="true">+</span> Add task
      </button>
    </form>
  )
}

export default AddTask