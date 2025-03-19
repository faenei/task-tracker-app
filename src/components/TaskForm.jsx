import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid' // Library for generating unique IDs

function TaskForm({ addTask }) {
	// State to manage the input value for the task title
	const [title, setTitle] = useState('')

	// Function to handle form submission
	const handleSubmit = e => {
		e.preventDefault() // Prevent the default form submission behavior

		// Check if the input is empty or contains only whitespace
		if (!title.trim()) return

		// Create a new task object with a unique ID, title, and default completion status
		const newTask = { id: uuidv4(), title, completed: false }

		// Pass the new task to the parent component via the `addTask` function
		addTask(newTask)

		// Clear the input field after adding the task
		setTitle('')
	}

	return (
		<form onSubmit={handleSubmit} className='mb-6'>
			{/* Input field for the task title */}
			<input
				type='text'
				value={title} // Controlled input: value is tied to the `title` state
				onChange={e => setTitle(e.target.value)} // Update the `title` state on input change
				placeholder='Add a new task'
				className='w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>
			{/* Submit button to add the task */}
			<button
				type='submit'
				className='mt-2 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors'
			>
				Add Task
			</button>
		</form>
	)
}

export default TaskForm
