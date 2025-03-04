import { writable } from 'svelte/store';
import { Backend } from '../backend/TauriBackend';
import { Entry } from '../journal-entry/Entry';
import type { IActivity } from '../activity/IActivity';

const initEntries: Entry[] = []
export const journalEntries = writable(initEntries)

const initGreenActivities: IActivity[] = []
export const greenActivities = writable(initGreenActivities)

const initYellowActivities: IActivity[] = []
export const yellowActivities = writable(initYellowActivities)

const initRedActivities: IActivity[] = []
export const redActivities = writable(initRedActivities)

export const refreshJournalEntries = async () => {
	try {
		const backend = new Backend()
		const entries = await backend.getJournalEntries();
		journalEntries.set(entries ?? []);
	} catch (error) {
		console.error("Failed to refresh journal entries:", error);
	}
}

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

export const addEntry = async (new_entry: Entry) => {
	try {
		const backend = new Backend()
		await backend.insertJournalEntry(new_entry)
		refreshJournalEntries()
	} catch (error) {
		console.error("Failed to add journal entry:", error);
	}
}