
import TodoDashboard from './components/features/TodoDashboard'

function App() {

  return (
    <div className="m-auto flex flex-col p-6 gap-6 border rounded-xl min-h-[100vh]">
      <span className='text-2xl font-bold text-primary-900'>Todo App</span>
      <TodoDashboard />
    </div>
  )
}

export default App
