import { writable } from 'svelte/store';
import { Backend } from '../backend/TauriBackend';
import { Entry } from '../journal-entry/Entry';
import type { IActivity } from '../activity/IActivity';

export const journalEntries = writable<Entry[]>([]);
export const greenActivities = writable<IActivity[]>([]);
export const yellowActivities = writable<IActivity[]>([]);
export const redActivities = writable<IActivity[]>([]);

// Get current list of journal entries from the database 
export const refreshJournalEntries = async () => {
	try {
		const backend = new Backend()
		const entries = await backend.getJournalEntries();
		journalEntries.set(entries ?? []);
	} catch (error) {
		console.error("Failed to refresh journal entries:", error);
	}
}

// Get current activity lists from the database 
export const refreshActivities = async () => {
	try {
		const backend = new Backend()
		greenActivities.set(await backend.getGreenActivities())
		yellowActivities.set(await backend.getYellowActivities())
		redActivities.set(await backend.getRedActivities())
	} catch (error) {
		console.error("Failed to refresh activities:", error);
	}
}

// Add the given entry to the database and refresh 
export const addEntry = async (new_entry: Entry) => {
	try {
		const backend = new Backend()
		await backend.insertJournalEntry(new_entry)
		await refreshJournalEntries()
	} catch (error) {
		console.error("Failed to add journal entry:", error);
	}
}

// Update the given entry and refresh 
export const updateEntry = async (new_entry: Entry) => {
	try {
		const backend = new Backend()
		await backend.updateJournalEntry(new_entry)
		await refreshJournalEntries()
	} catch (error) {
		console.error("Failed to add journal entry:", error);
	}
}