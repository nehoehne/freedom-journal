import { Green, Red, toActivity, Yellow, type IActivity } from '../activity/IActivity';
import { Entry } from '../journal-entry/Entry';
import type { IBackend } from './IBackend';
import Database from "tauri-plugin-sql-api";

/**
 * Accesses the sqlite database using tauri-plugin-api to avoid message passing between Rust and TS
 */
export class Backend implements IBackend {

	async getEntry(date: string) {
		const db = await this.getDB();
		return await db.select("SELECT * FROM journal-entries WHERE date = $1", [date]);
	}

	async getGreenActivities() {
		const db = await this.getDB();
		return this.jsonArrayToActivities(await db.select("SELECT * FROM activities WHERE type='green'"))
	}

	async getYellowActivities() {
		const db = await this.getDB();
		return this.jsonArrayToActivities(await db.select("SELECT * FROM activities WHERE type='yellow'"))
	}

	async getRedActivities() {
		const db = await this.getDB();
		return this.jsonArrayToActivities(await db.select("SELECT * FROM activities WHERE type='red'"))
	}

	async getJournalEntries() {
		const db = await this.getDB();

		return this.rowsToJournalEntries(await db.select(
			`SELECT journal_entries.id as journal_entry_id, activity_id, date, text, name as activity_name, type as activity_type 
			FROM journal_entries 
			LEFT JOIN journal_entry_activities ON journal_entries.id=journal_entry_activities.journal_entry_id 
			LEFT JOIN activities ON journal_entry_activities.activity_id=activities.id`))
	}

	// Helper functions 

	// C:\Users\Nathan\AppData\Roaming\com.tauri.dev\
	private getDB = () => Database.load("sqlite:test.db");

	private rowsToJournalEntries(raw: any[]): Entry[] {
		const entries = new Map<number, Entry>();

		raw.forEach(row => {
			const id = row.journal_entry_id
			if (!entries.has(id)) {
				entries.set(id, new Entry(id, row.date, row.text));
			}

			const entry = entries.get(id);
			const activity = toActivity({ id: row.activity_id, name: row.activity_name, type: row.activity_type })

			if (entry && activity) {
				activity.addSelfToJournal(entry)
			}
		});

		return Array.from(entries.values());
	}

	private jsonArrayToActivities(rawActivities: unknown): IActivity[] {

		if (!Array.isArray(rawActivities))
			return [];

		const activities: IActivity[] = []

		for (let rawActivity of rawActivities) {
			const curr = toActivity(rawActivity)
			if (curr)
				activities.push(curr)
		}

		return activities;

	}
}