import { describe, it, expect } from "vitest";
import { rowsToJournalEntries, rowsToActivities, toActivity } from "./ORM";
import { Entry } from "../journal-entry/Entry";
import { Green, Yellow, Red } from "../activity/IActivity";

describe("rowsToJournalEntries", () => {
	it("should convert valid rows into journal entries with activities", () => {
		const rows = [
			{ journal_entry_id: 1, date: "2024-03-05", text: "Entry 1", activity_id: 101, activity_type: "green", activity_name: "Running" },
			{ journal_entry_id: 1, date: "2024-03-05", text: "Entry 1", activity_id: 102, activity_type: "yellow", activity_name: "Gaming" },
			{ journal_entry_id: 2, date: "2024-03-06", text: "Entry 2" },
		];

		const result = rowsToJournalEntries(rows);
		expect(result.length).toBe(2);

		expect(result[0]).toBeInstanceOf(Entry);
		expect(result[0].getId()).toBe(1);
		expect(result[0].getDate()).toBe("2024-03-05");
		expect(result[0].getText()).toBe("Entry 1");

		const activities = result[0].getAllActivities();
		expect(activities.length).toBe(2);
		expect(activities[0]).toBeInstanceOf(Green);
		expect(activities[0].name).toBe("Running");
		expect(activities[1]).toBeInstanceOf(Yellow);
		expect(activities[1].name).toBe("Gaming");

		expect(result[1]).toBeInstanceOf(Entry);
		expect(result[1].getId()).toBe(2);
		expect(result[1].getDate()).toBe("2024-03-06");
		expect(result[1].getText()).toBe("Entry 2");
	});

	it("should return an empty array for non-array input", () => {
		expect(rowsToJournalEntries(undefined)).toEqual([]);
		expect(rowsToJournalEntries("invalid")).toEqual([]);
	});

	it("should skip invalid rows", () => {
		const rows = [
			{ journal_entry_id: 1, date: "2024-03-05", text: "Valid Entry" },
			{ date: "2024-03-07", text: "Invalid Entry" },
		];
		const result = rowsToJournalEntries(rows);
		expect(result.length).toBe(1);
		expect(result[0].getText()).toBe("Valid Entry");
	});
});

describe("rowsToActivities", () => {
	it("should convert valid rows into activities with correct class instances", () => {
		const rows = [
			{ id: 101, type: "green", name: "Running" },
			{ id: 102, type: "yellow", name: "Gaming" },
			{ id: 103, type: "red", name: "Overeating" },
		];

		const result = rowsToActivities(rows);
		expect(result.length).toBe(3);
		expect(result[0]).toBeInstanceOf(Green);
		expect(result[1]).toBeInstanceOf(Yellow);
		expect(result[2]).toBeInstanceOf(Red);

		expect(result[0].name).toBe("Running");
		expect(result[1].name).toBe("Gaming");
		expect(result[2].name).toBe("Overeating");
	});

	it("should return an empty array for non-array input", () => {
		expect(rowsToActivities(undefined)).toEqual([]);
		expect(rowsToActivities("invalid")).toEqual([]);
	});

	it("should skip invalid rows", () => {
		const rows = [
			{ id: 101, type: "green", name: "Running" },
			{ type: "invalid" },
		];
		const result = rowsToActivities(rows);
		expect(result.length).toBe(1);
		expect(result[0]).toBeInstanceOf(Green);
		expect(result[0].name).toBe("Running");
	});
});

describe("toActivity", () => {
	it("should return undefined for invalid activity data", () => {
		expect(toActivity({})).toBeUndefined();
		expect(toActivity({ type: "green" })).toBeUndefined();
		expect(toActivity({ type: "green", name: "Running" })).toBeUndefined();
	});

	it("should return an instance of Green, Yellow, or Red based on type", () => {
		expect(toActivity({ type: "green", name: "Running", id: 1 })).toBeInstanceOf(Green);
		expect(toActivity({ type: "yellow", name: "Gaming", id: 2 })).toBeInstanceOf(Yellow);
		expect(toActivity({ type: "red", name: "Overeating", id: 3 })).toBeInstanceOf(Red);
	});
});
