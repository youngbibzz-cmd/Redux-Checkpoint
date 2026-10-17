import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  deleteTask,
  editTask,
  toggleTask,
} from '../features/tasks/taskSlice.js'

function Task({ task }) {
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(task.description)
  const dispatch = useDispatch()

  function saveEdit(event) {
    event.preventDefault()
    const trimmedDescription = description.trim()
    if (!trimmedDescription) return

    dispatch(editTask({ id: task.id, description: trimmedDescription }))
    setIsEditing(false)
  }

  function cancelEdit() {
    setDescription(task.description)
    setIsEditing(false)
  }

  return (
    <li className={`task-row${task.isDone ? ' is-done' : ''}`}>
      <button
        className="completion-toggle"
        type="button"
        onClick={() => dispatch(toggleTask(task.id))}
        aria-label={task.isDone ? 'Mark task as not done' : 'Mark task as done'}
        aria-pressed={task.isDone}
      >
        {task.isDone && <span aria-hidden="true">✓</span>}
      </button>

      {isEditing ? (
        <form className="edit-form" onSubmit={saveEdit}>
          <label className="sr-only" htmlFor={`edit-${task.id}`}>Edit task</label>
          <input
            id={`edit-${task.id}`}
            autoFocus
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') cancelEdit()
            }}
          />
          <button className="row-action save-action" type="submit" disabled={!description.trim()}>
            Save
          </button>
          <button className="row-action" type="button" onClick={cancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="task-description">{task.description}</span>
          <div className="task-actions">
            <button
              className="row-action"
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label={`Edit ${task.description}`}
            >
              Edit
            </button>
            <button
              className="row-action delete-action"
              type="button"
              onClick={() => dispatch(deleteTask(task.id))}
              aria-label={`Delete ${task.description}`}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  )
}

export default Task