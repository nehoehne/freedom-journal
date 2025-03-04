import { Entry } from '../journal-entry/Entry';
import { toActivity, type IActivity } from '../activity/IActivity';

export const rowsToJournalEntries = (rows: unknown): Entry[] => {
	try {
		if (!Array.isArray(rows)) return [];
		const entries = new Map<number, Entry>();

		for (let row of rows) {

			const id = row?.journal_entry_id;
			const date = row?.date;
			const text = row?.text;

			if (id !== undefined && date !== undefined && text !== undefined) {

				if (!entries.has(id))
					entries.set(id, new Entry(id, date, text));

				const entry = entries.get(id);
				const activity = toActivity({ id: row?.activity_id, type: row?.activity_type, name: row?.activity_name });

				if (entry !== undefined && activity !== undefined)
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
		if (!Array.isArray(rows)) return [];
		const activities: IActivity[] = [];
		for (let row of rows) {
			const curr = toActivity(row);
			if (curr) activities.push(curr);
		}
		return activities;
	} catch (error) {
		console.error("Error mapping activities:", error);
		return [];
	}
}