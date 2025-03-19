import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

// Register Chart.js components (required for rendering the chart)
ChartJS.register(ArcElement, Tooltip, Legend)

function DashboardChart({ tasks }) {
	// Calculate the number of completed and pending tasks
	const completed = tasks.filter(task => task.completed).length
	const pending = tasks.length - completed

	// Data for the pie chart
	const data = {
		labels: ['Completed', 'Pending'], // Labels for the chart segments
		datasets: [
			{
				// If no tasks exist, show equal segments (1:1), otherwise show completed vs pending
				data: tasks.length === 0 ? [1, 1] : [completed, pending],
				// Background colors for the segments (gray if no tasks, purple/red otherwise)
				backgroundColor:
					tasks.length === 0 ? ['#d1d5db', '#d1d5db'] : ['#7c3aed', '#f87171'],
				borderWidth: 1, // Border width for the segments
				borderColor: '#ffffff', // White border color for better visibility
			},
		],
	}

	// Chart configuration options
	const options = {
		responsive: true, // Make the chart responsive
		plugins: {
			legend: {
				position: 'top', // Position the legend at the top
				labels: {
					font: { size: 14, weight: '600' }, // Font settings for the legend
					padding: 20, // Padding around the legend
					usePointStyle: true, // Use point style for legend markers

					// Customize legend labels
					generateLabels: () => {
						return [
							{
								text: 'Completed',
								fillStyle: '#7c3aed', // Purple color for the "Completed" segment
								strokeStyle: '#7c3aed',
								lineWidth: 0,
								fontColor: '#2563eb', // Bright blue for the text
							},
							{
								text: 'Pending',
								fillStyle: '#f87171', // Red color for the "Pending" segment
								strokeStyle: '#f87171',
								lineWidth: 0,
								fontColor: '#dc2626', // Bright red for the text
							},
						]
					},
				},
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.8)', // Tooltip background color
				cornerRadius: 6, // Rounded corners for the tooltip
				enabled: tasks.length > 0, // Disable tooltips if there are no tasks
			},
			title: {
				display: tasks.length === 0, // Show a title if there are no tasks
				text: 'No Tasks Yet',
				color: '#1f2937', // Title text color
				font: { size: 16, weight: '600' }, // Title font settings
				padding: 20, // Padding around the title
			},
		},
		animation: {
			animateRotate: true, // Enable rotation animation
			animateScale: true, // Enable scaling animation
		},
	}

	return (
		<div className='glass-effect rounded-2xl p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-br from-white/10 to-transparent dark:from-gray-800/10 hover:shadow-2xl transition-all duration-300'>
			{/* Chart title */}
			<h2 className='text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent mb-4'>
				Task Pulse
			</h2>
			{/* Render the Pie chart with the provided data and options */}
			<Pie data={data} options={options} />
		</div>
	)
}

export default DashboardChart
