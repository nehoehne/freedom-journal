import { Entry } from '../objects/Entry';
import { rowsToActivities, rowsToJournalEntries } from '../util/ORM';
import Database from "tauri-plugin-sql-api";

export class Backend  {
	private getDB = () => Database.load("sqlite:test.db");

	async getEntry(date: string) {
		try {
			const db = await this.getDB();
			const rows = await db.select("SELECT * FROM journal_entries WHERE date = $1", [date]);

			if (!Array.isArray(rows) || rows.length === 0) {
				console.log("Journal entry not found.");
				return undefined;
			}

			const row = rows[0];

			if (!row?.id || !row?.text || !row?.date) {
				console.log("Invalid entry: " + row);
				return undefined;
			}

			return new Entry(row.id, row.date, row.text);
		} catch (error) {
			console.error("Error fetching journal entry:", error);
			return undefined;
		}
	}


	async getActivitiesByType(type: string) {
		try {
			const db = await this.getDB();
			const rows = await db.select("SELECT * FROM activities WHERE type=$1", [type]);
			return rowsToActivities(rows);
		} catch (error) {
			console.error(`Error fetching ${type} activities:`, error);
			return [];
		}
	}

	async addActivityByType(type: string, name: string) {
	try {
		const db = await this.getDB();
		console.log(`INSERT INTO activities (name, type) VALUES (${name}, ${type})`)
		await db.execute(
			`INSERT INTO activities (name, type) VALUES ($1, $2)`,
			[name, type]
		);
		console.log(`Added activity '${name}' of type '${type}'`);
		return true;
	} catch (error) {
		console.error(`Error adding activity of type '${type}':`, error);
		return false;
	}
}

	async getGreenActivities() {
		return this.getActivitiesByType("green");
	}

	async getYellowActivities() {
		return this.getActivitiesByType("yellow");
	}

	async getRedActivities() {
		return this.getActivitiesByType("red");
	}


	
	async getJournalEntries() {
		try {
			const db = await this.getDB();

			// Select all journal entries and all activities 
			const rows = await db.select(
				`SELECT journal_entries.id as journal_entry_id, activity_id, date, text, name as activity_name, type as activity_type 
                FROM journal_entries 
                LEFT JOIN journal_entry_activities ON journal_entries.id=journal_entry_activities.journal_entry_id 
                LEFT JOIN activities ON journal_entry_activities.activity_id=activities.id
                ORDER BY date DESC`
			);
			return rowsToJournalEntries(rows);
		} catch (error) {
			console.error("Error fetching journal entries:", error);
			return [];
		}
	}

	async insertJournalEntry(new_entry: Entry) {
		try {
			const db = await this.getDB();
			const date = new_entry.getDate();

			if (date) {

				// Insert journal entry 
				await db.execute(`INSERT INTO journal_entries (date, text) VALUES ($1, $2)`, [new_entry.getDate(), new_entry.getText()]);

				// Get the entry that we just added because we 
				// need the ID to add the activities
				const dbEntry = await this.getEntry(date);

				if (dbEntry) {

					const activities = new_entry.getAllActivities();

					// Insert activities for this journal entry 
					for (let activity of activities)
						await db.execute(`INSERT INTO journal_entry_activities (journal_entry_id, activity_id) VALUES ($1, $2)`, [dbEntry.getId(), activity.id]);
				} else {
					console.log("Failed to add entry: " + new_entry);
				}
			}
		} catch (error) {
			console.error("Error inserting journal entry:", error);
		}
	}

	async updateJournalEntry(new_entry: Entry) {
		try {
			const db = await this.getDB();
			const date = new_entry.getDate();

			try{

				if (date) {
					await db.execute("BEGIN TRANSACTION");
	
					// Insert journal entry 
					await db.execute(`UPDATE journal_entries SET text=$1 WHERE date=$2`,
						[new_entry.getText(), new_entry.getDate()]);
	
					await db.execute(`DELETE FROM journal_entry_activities WHERE journal_entry_id=$1`, [new_entry.getId()]);
	
					const activities = new_entry.getAllActivities();
					for (let activity of activities)
						await db.execute(`INSERT INTO journal_entry_activities (journal_entry_id, activity_id) VALUES ($1, $2)`, [new_entry.getId(), activity.id]);
	
					await db.execute("COMMIT");
				}
			} catch (error) {
				db.execute("ROLLBACK");
				console.error("Update failed:", error);
			}
		} catch (error) {
			console.error("Error inserting journal entry:", error);
		}
	}
}
