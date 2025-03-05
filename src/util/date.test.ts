import { describe, it, expect } from "vitest";
import { CalendarDate } from "@internationalized/date";
import { getDateAsDateValue, isValidDate } from "./date";

describe("getDateAsDateValue", () => {
	it("should convert a valid date string to a CalendarDate", () => {
		const result = getDateAsDateValue("2024-03-05");
		expect(result).toEqual(new CalendarDate(2024, 3, 5));
	});

	it("should return undefined for an invalid format", () => {
		expect(getDateAsDateValue("2024-03")).toBeUndefined();
		expect(getDateAsDateValue("March 5, 2024")).toBeUndefined();
		expect(getDateAsDateValue("2024/03/05")).toBeUndefined();
	});

	it("should return undefined for non-numeric values", () => {
		expect(getDateAsDateValue("2024-March-05")).toBeUndefined();
		expect(getDateAsDateValue("abcd-ef-gh")).toBeUndefined();
	});

	it("should return undefined for undefined input", () => {
		expect(getDateAsDateValue(undefined)).toBeUndefined();
	});
});

describe("isValidDate", () => {
	it("should return true for valid date strings", () => {
		expect(isValidDate("2024-03-05")).toBe(true);
		expect(isValidDate("2000-02-29")).toBe(true); // Leap year
	});

	it("should return false for invalid date strings", () => {
		expect(isValidDate("2024-13-01")).toBe(false);
		expect(isValidDate("abcd-ef-gh")).toBe(false);
		expect(isValidDate("")).toBe(false);
		expect(isValidDate(undefined)).toBe(false);
	});
});
