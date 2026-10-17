import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  tasks: [],
  filter: 'all',
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.unshift(action.payload)
      },
      prepare(description) {
        return {
          payload: { id: nanoid(), description, isDone: false },
        }
      },
    },
    editTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload.id)
      if (task) task.description = action.payload.description
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    toggleTask(state, action) {
      const task = state.tasks.find((item) => item.id === action.payload)
      if (task) task.isDone = !task.isDone
    },
    setFilter(state, action) {
      state.filter = action.payload
    },
  },
})

export const { addTask, editTask, deleteTask, toggleTask, setFilter } =
  taskSlice.actions

export default taskSlice.reducer