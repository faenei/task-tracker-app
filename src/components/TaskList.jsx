function TaskList({ tasks, deleteTask, toggleTaskStatus }) {
	return (
		<div className='bg-white dark:bg-gray-800 rounded-lg shadow p-4'>
			{/* Check if there are no tasks */}
			{tasks.length === 0 ? (
				// Display a message if the task list is empty
				<p className='text-gray-500 dark:text-gray-400 text-center'>
					No tasks yet
				</p>
			) : (
				// Render the list of tasks
				<ul className='space-y-2'>
					{tasks.map(task => (
						<li
							key={task.id} // Unique key for each task
							className='flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg'
						>
							{/* Task content and checkbox */}
							<div className='flex items-center'>
								<input
									type='checkbox'
									checked={task.completed} // Reflects the task's completion status
									onChange={() => toggleTaskStatus(task.id)} // Toggle completion status on click
									className='mr-2'
								/>
								{/* Task title with strikethrough if completed */}
								<span
									className={`${
										task.completed
											? 'line-through text-gray-500 dark:text-gray-400'
											: 'text-gray-800 dark:text-gray-100'
									}`}
								>
									{task.title}
								</span>
							</div>

							{/* Delete button for the task */}
							<button
								onClick={() => deleteTask(task.id)} // Trigger delete function on click
								className='text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300'
							>
								Delete
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default TaskList
