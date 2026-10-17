import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../features/tasks/taskSlice.js'
import Task from './Task.jsx'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Not done' },
  { id: 'done', label: 'Done' },
]

function ListTask() {
  const { tasks, filter } = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const visibleTasks = tasks.filter((task) => {
    if (filter === 'done') return task.isDone
    if (filter === 'active') return !task.isDone
    return true
  })

  return (
    <section className="task-section" aria-label="Your tasks">
      <div className="list-heading">
        <div>
          <p className="section-kicker">YOUR LIST</p>
          <h2>Tasks <span>{tasks.length}</span></h2>
        </div>
        <div className="filter-group" role="group" aria-label="Filter tasks">
          {filters.map((option) => (
            <button
              className={`filter-button${filter === option.id ? ' active' : ''}`}
              key={option.id}
              type="button"
              onClick={() => dispatch(setFilter(option.id))}
              aria-pressed={filter === option.id}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {visibleTasks.length > 0 ? (
        <ul className="task-list">
          {visibleTasks.map((task) => <Task key={task.id} task={task} />)}
        </ul>
      ) : (
        <div className="empty-state" role="status">
          <span className="empty-mark" aria-hidden="true">✓</span>
          <p>{tasks.length === 0 ? 'A little room to breathe.' : 'Nothing in this view.'}</p>
          <span>
            {tasks.length === 0
              ? 'Add a task above and make today yours.'
              : filter === 'done'
                ? 'Completed tasks will show up here.'
                : 'You’re all caught up. Nice work.'}
          </span>
        </div>
      )}
    </section>
  )
}

export default ListTask