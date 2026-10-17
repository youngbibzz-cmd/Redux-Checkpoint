import { useSelector } from 'react-redux'
import AddTask from './components/AddTask.jsx'
import ListTask from './components/ListTask.jsx'
import './App.css'

function App() {
  const tasks = useSelector((state) => state.tasks.tasks)
  const completedCount = tasks.filter((task) => task.isDone).length

  return (
    <main className="page-shell">
      <div className="ambient-shape shape-one" aria-hidden="true" />
      <div className="ambient-shape shape-two" aria-hidden="true" />
      <section className="todo-card">
        <header className="app-header">
          <div className="brand-mark" aria-hidden="true">✓</div>
          <p className="eyebrow">A CLEARER DAY STARTS HERE</p>
          <h1>Make room<br />for <em>what matters.</em></h1>
          <p className="header-copy">One thing at a time. You’ve got this.</p>
        </header>

        <div className="progress-strip" aria-live="polite">
          <span>{tasks.length === 0 ? 'READY WHEN YOU ARE' : `${completedCount} OF ${tasks.length} COMPLETE`}</span>
          <span className="progress-track" aria-hidden="true">
            <span style={{ width: `${tasks.length ? (completedCount / tasks.length) * 100 : 0}%` }} />
          </span>
        </div>

        <AddTask />
        <ListTask />

        <footer className="app-footer">
          <span>Small steps add up.</span>
          <span className="footer-spark" aria-hidden="true">✳</span>
        </footer>
      </section>
    </main>
  )
}

export default App
