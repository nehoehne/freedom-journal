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
	const backend = new Backend()
	journalEntries.set(await backend.getJournalEntries())
}

export const refreshActivities = async () => {
	const backend = new Backend()
	greenActivities.set(await backend.getGreenActivities())
	yellowActivities.set(await backend.getYellowActivities())
	redActivities.set(await backend.getRedActivities())
}

export const addEntry = async (new_entry: Entry, activities: IActivity[]) => {
	const backend = new Backend()
	await backend.insertJournalEntry(new_entry, activities)
	refreshJournalEntries()
}