import { Entry } from '../objects/Entry';
import { Green, Red, Yellow, type IActivity } from '../objects/IActivity';

// Convert rows of journal entries that have been left joined with
// activities to journal entry objects 
export const rowsToJournalEntries = (rows: unknown): Entry[] => {
	try {
		if (!Array.isArray(rows)) 
			return [];

		const entries = new Map<number, Entry>();

		for (let row of rows) {

			const id = row?.journal_entry_id;
			const date = row?.date;
			const text = row?.text ?? "";

			if (id && date) {

				// Only add each journal entry once
				if (!entries.has(id))
					entries.set(id, new Entry(id, date, text));

				const entry = entries.get(id);
				const activity = toActivity({ id: row?.activity_id, type: row?.activity_type, name: row?.activity_name });

				// Add activity to the relevant journal entry
				if (entry && activity)
					activity.addSelfToJournal(entry);

			} else {
				console.log("Invalid data: " + row);
			}
		}
		return Array.from(entries.values());
	} catch (error) {
		console.error("Error mapping entries:", error);
		return [];
	}
}

export const rowsToActivities = (rows: unknown): IActivity[] => {
	try {
		if (!Array.isArray(rows)) 
			return [];
		
		const activities: IActivity[] = [];
		
		for (let row of rows) {
			const curr = toActivity(row);
			if (curr) 
				activities.push(curr);
		}
		
		return activities;
	} catch (error) {
		console.error("Error mapping activities:", error);
		return [];
	}
}

export const toActivity = (rawActivity: any) => {
	
	const id = rawActivity?.id
	const type = rawActivity?.type
	const name = rawActivity?.name

	if (!id || !type  || !name)
		return undefined

	switch (type) {
		case 'green':
			return new Green(name, id);
		case 'yellow':
			return new Yellow(name, id);
		case 'red':
			return new Red(name, id);
		default:
			return undefined; 
	}
}
