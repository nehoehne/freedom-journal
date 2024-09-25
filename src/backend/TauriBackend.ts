import type { IBackend } from './IBackend';
import Database from "tauri-plugin-sql-api";

/**
 * Accesses the sqlite database using tauri-plugin-api to avoid message passing between Rust and TS
 */
class Backend implements IBackend {
		
	private getDB = () => Database.load("sqlite:test.db");

	async getJournalEntry(date: string) {
		const db = await this.getDB();

		return db.select("SELECT * FROM journal-entries WHERE date = $1", [date]);
	}

	async getGreenActivities() {
		const db = await this.getDB();

		return db.select("SELECT * FROM activities WHERE type='green'")
	}

	async getYellowActivities() {
		const db = await this.getDB();

		return db.select("SELECT * FROM activities WHERE type='yellow'")
	}

	async getRedActivities() {
		const db = await this.getDB();

		return db.select("SELECT * FROM activities WHERE type='red'")
	}

}