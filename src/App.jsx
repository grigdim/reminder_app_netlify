import { useState, useEffect } from 'react';
import AddReminder from './AddReminder';
import ReminderList from './ReminderList';
import { format, differenceInMilliseconds, compareAsc, add, formatDistance } from 'date-fns';

const POLL_INTERVAL = 60000; // 1 minute
const ALERT_TRIGGER_DIFF = 600000; // 10 minutes

function App() {
	const [ reminders, setReminders ] = useState(JSON.parse(localStorage.getItem('remindersList')) || []);
	const [ reminderTitle, setReminderTitle ] = useState('');
	const [ reminderDate, setReminderDate ] = useState('');
	const [ reminderFreq, setReminderFreq ] = useState('do not repeat');
	const [ reminderDateDue, setReminderDateDue ] = useState('');

	useEffect(
		() => {
			localStorage.setItem('remindersList', JSON.stringify(reminders));
			const interval = setInterval(notify, POLL_INTERVAL);
			return () => {
				clearInterval(interval);
			};
		},
		[ reminders ]
	);

	const updateReminder = (id) => {
		const reminderList = reminders.map((reminder) => {
			if (reminder.id === id) {
				let newReminder = { ...reminder, triggered: reminder.triggered + 1 };

				switch (reminder.frequency) {
					case 'daily':
						return { ...newReminder, date: add(new Date(reminder.date), { days: 1 }) };
					case 'weekly':
						return { ...newReminder, date: add(new Date(reminder.date), { weeks: 1 }) };
					case 'monthly':
						return { ...newReminder, date: add(new Date(reminder.date), { months: 1 }) };
					default:
						return newReminder;
				}
			}
			return reminder;
		});
		setReminders(reminderList);
	};

	const notify = () => {
		for (const reminder of reminders) {
			if (
				reminder.checked ||
				(reminder.dueDate && compareAsc(new Date(reminder.date), new Date(reminder.dateDue)) === 1) ||
				(reminder.frequency === 'do not repeat' && reminder.triggered > 0)
			) {
				continue;
			}

			const diff = differenceInMilliseconds(new Date(reminder.date), new Date());
			if (diff > 0 && diff < ALERT_TRIGGER_DIFF) {
				alert(
					`The event "${reminder.title}" is coming up in ${formatDistance(
						new Date(reminder.date),
						new Date()
					)}`
				);
				updateReminder(reminder.id);
			}
		}
	};

	const handleCheck = (id) => {
		const remindersList = reminders.map(
			(reminder) => (reminder.id === id ? { ...reminder, checked: !reminder.checked } : reminder)
		);
		setReminders(remindersList);
	};

	const handleDelete = (id) => {
		const remindersList = reminders.filter((reminder) => reminder.id !== id);
		setReminders(remindersList);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const id = reminders.length ? reminders[reminders.length - 1].id + 1 : 1;
		const datetime = format(new Date(), 'MMMM dd, yyyy pp');
		const newReminder = {
			id,
			title: reminderTitle,
			frequency: reminderFreq,
			date: reminderDate,
			dateDue: reminderDateDue,
			dateCreated: datetime,
			checked: false,
			triggered: 0
		};
		const remindersList = [ ...reminders, newReminder ];
		setReminders(remindersList);
		setReminderTitle('');
		setReminderDate('');
		setReminderFreq('do not repeat');
		setReminderDateDue('');
	};

	return (
		<div className="App">
			<header className="App-header">
				<h1>Reminder App</h1>
			</header>
			<main>
				<AddReminder
					reminderTitle={reminderTitle}
					setReminderTitle={setReminderTitle}
					reminderFreq={reminderFreq}
					setReminderFreq={setReminderFreq}
					reminderDate={reminderDate}
					setReminderDate={setReminderDate}
					reminderDateDue={reminderDateDue}
					setReminderDateDue={setReminderDateDue}
					handleSubmit={handleSubmit}
				/>
				{reminders.length ? (
					<ReminderList reminders={reminders} handleCheck={handleCheck} handleDelete={handleDelete} />
				) : (
					'There are no reminders'
				)}
			</main>
			<footer>Copyright &copy; {new Date().getFullYear()}</footer>
		</div>
	);
}

export default App;
