import React from 'react';

const AddReminder = ({
	reminderTitle,
	setReminderTitle,
	reminderFreq,
	setReminderFreq,
	reminderDate,
	setReminderDate,
	reminderDateDue,
	setReminderDateDue,
	handleSubmit
}) => {
	return (
		<form className="addReminder" onSubmit={handleSubmit}>
			<div className="titleAndDate">
				<label htmlFor="reminderTitle">Add Reminder</label>
				<input
					type="text"
					id="reminderTitle"
					value={reminderTitle}
					onChange={(e) => {
						setReminderTitle(e.target.value);
					}}
					placeholder="Reminder Title"
					required
				/>
				<label htmlFor="reminderDate">Reminder Date</label>
				<input
					id="reminderDate"
					type="datetime-local"
					value={reminderDate}
					required
					onChange={(e) => {
						setReminderDate(e.target.value);
					}}
				/>
			</div>

			<div className="frequencyAndDateDue">
				<label htmlFor="reminderFrequency">Select Frequency</label>
				<select
					className="reminderFrequency"
					name="frequency"
					value={reminderFreq}
					onChange={(e) => {
						setReminderFreq(e.target.value);
					}}
				>
					<option value="do not repeat">Do not repeat</option>
					<option value="daily">Daily</option>
					<option value="weekly">Weekly</option>
					<option value="monthly">Monthly</option>
				</select>
				{reminderFreq !== 'do not repeat' && (
					<React.Fragment>
						<label htmlFor="reminderDateDue">Due on</label>
						<input
							calssName="reminderDateDue"
							type="datetime-local"
							value={reminderDateDue}
							onChange={(e) => {
								setReminderDateDue(e.target.value);
							}}
						/>
					</React.Fragment>
				)}
			</div>
			<button type="submit">Add Reminder</button>
		</form>
	);
};

export default AddReminder;
