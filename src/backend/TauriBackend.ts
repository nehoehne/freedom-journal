import { ActivityTypes, Green, Red, Yellow, type IActivity } from '../activity/IActivity';
import type { IBackend } from './IBackend';
import Database from "tauri-plugin-sql-api";

/**
 * Accesses the sqlite database using tauri-plugin-api to avoid message passing between Rust and TS
 */
export class Backend implements IBackend {


	async getJournalEntry(date: string) {
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

	// Helper functions 

	// C:\Users\Nathan\AppData\Roaming\com.tauri.dev\
	private getDB = () => Database.load("sqlite:test.db");

	private jsonArrayToActivities(rawActivities: unknown): IActivity[] {

		if (!Array.isArray(rawActivities))
			return [];

		const activities: IActivity[] = []

		for (let rawActivity of rawActivities) {
			switch (rawActivity?.type) {
				case ActivityTypes.Green:
					activities.push(new Green(rawActivity?.name));
					break;
				case ActivityTypes.Yellow:
					activities.push(new Yellow(rawActivity?.name));
					break;
				case ActivityTypes.Red:
					activities.push(new Red(rawActivity?.name));
					break;
			}
		}

		return activities;

	}
}