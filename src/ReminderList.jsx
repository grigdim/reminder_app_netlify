import React from 'react';
import Reminder from './Reminder';

const ReminderList = ({ reminders, handleCheck, handleDelete }) => {
	return (
		<ul className="reminderList">
			{reminders.map((reminder) => (
				<Reminder key={reminder.id} reminder={reminder} handleCheck={handleCheck} handleDelete={handleDelete} />
			))}
		</ul>
	);
};

export default ReminderList;
