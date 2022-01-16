import React from 'react';
import { format } from 'date-fns';
const Reminder = ({ reminder, handleDelete, handleCheck }) => {
	return (
		<li className="reminder">
			<div className="reminderInfo">
				<label style={reminder.checked ? { textDecoration: 'line-through' } : null}>
					<h4>{`Reminder Title: ${reminder.title}`}</h4>
					<p className="date">{`This event is on: ${format(new Date(reminder.date), 'MMMM dd, yyyy pp')}`}</p>
				{reminder.frequency !== 'do not repeat' && (
					<p>
							This reminder has a {reminder.frequency} frequency and has been triggered{' '}
							{reminder.triggered}  {reminder.triggered === 1 ? 'time' : 'times'}
					</p>
				)}
				</label>
			</div>
			<div className="buttons">
				<button className="checked" onClick={() => handleCheck(reminder.id)} checked={reminder.checked}>
					Done
				</button>
				<button className="delete" onClick={() => handleDelete(reminder.id)}>
					Delete
				</button>
			</div>
		</li>
	);
};

export default Reminder;
