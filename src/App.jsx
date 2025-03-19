import { useState, useEffect } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import DashboardChart from './components/DashboardChart'

function App() {
	// State to store the list of tasks
	const [tasks, setTasks] = useState([])

	// State to filter tasks (all, completed, pending)
	const [filter, setFilter] = useState('all')

	// State for dark mode
	const [isDarkMode, setIsDarkMode] = useState(
		() => localStorage.getItem('darkMode') === 'true' || false
	)

	// Effect to save the theme to localStorage and apply it to the document
	useEffect(() => {
		localStorage.setItem('darkMode', isDarkMode)
		document.documentElement.classList.toggle('dark', isDarkMode)
	}, [isDarkMode])

	// Function to add a new task
	const addTask = task => setTasks([...tasks, task])

	// Function to delete a task by ID
	const deleteTask = id => setTasks(tasks.filter(task => task.id !== id))

	// Function to toggle the status of a task (completed/not completed)
	const toggleTaskStatus = id =>
		setTasks(
			tasks.map(task =>
				task.id === id ? { ...task, completed: !task.completed } : task
			)
		)

	// Filter tasks based on the selected filter
	const filteredTasks = tasks.filter(task => {
		if (filter === 'completed') return task.completed
		if (filter === 'pending') return !task.completed
		return true
	})

	return (
		<div
			className={`min-h-screen p-6 ${
				isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
			}`}
		>
			<div className='max-w-4xl mx-auto'>
				{/* Header and theme toggle button */}
				<div className='flex justify-between items-center mb-6'>
					<h1 className='text-3xl font-bold text-center'>
						Task Tracker Dashboard
					</h1>
					<button
						onClick={() => setIsDarkMode(!isDarkMode)}
						className='p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors'
					>
						{isDarkMode ? '☀️' : '🌙'}
					</button>
				</div>

				{/* Main content: form, filters, task list, and chart */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div>
						{/* Form to add a new task */}
						<TaskForm addTask={addTask} />

						{/* Filter buttons */}
						<div className='flex gap-2 mb-4'>
							<button
								onClick={() => setFilter('all')}
								className={`px-4 py-2 rounded-lg ${
									filter === 'all'
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
								}`}
							>
								All
							</button>
							<button
								onClick={() => setFilter('completed')}
								className={`px-4 py-2 rounded-lg ${
									filter === 'completed'
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
								}`}
							>
								Completed
							</button>
							<button
								onClick={() => setFilter('pending')}
								className={`px-4 py-2 rounded-lg ${
									filter === 'pending'
										? 'bg-blue-500 text-white'
										: 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
								}`}
							>
								Pending
							</button>
						</div>

						{/* Task list */}
						<TaskList
							tasks={filteredTasks}
							deleteTask={deleteTask}
							toggleTaskStatus={toggleTaskStatus}
						/>
					</div>

					{/* Chart for task visualization */}
					<div>
						<DashboardChart tasks={tasks} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
