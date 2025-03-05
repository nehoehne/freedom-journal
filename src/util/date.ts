import { CalendarDate } from "@internationalized/date";

// Converts a date string (YYYY-MM-DD) to a CalendarDate 
export const getDateAsDateValue = (date: string | undefined) => {
	const parts = date?.split("-")

	// Date strings always have 3 parts 
	if (!Array.isArray(parts) || parts.length < 3)
		return undefined

	const year: number = parseInt(parts[0], 10);
	const month: number = parseInt(parts[1], 10);
	const day: number = parseInt(parts[2], 10);

	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		console.log("String is not a number.")
		return undefined
	}

	return new CalendarDate(year, month, day)
}

// Checks if the given date is a valid date string (YYYY-MM-DD)
export const isValidDate = (maybeDate: string | undefined): boolean => {
	if (!maybeDate)
		return false;

	const date = new Date(maybeDate)

	return !isNaN(date.getTime());
}
