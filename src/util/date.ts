import { CalendarDate, type DateValue } from "@internationalized/date";

export const getDateAsDateValue = (date: string | undefined) => {
		const parts = date?.split("-")

		if (!parts) 
			return undefined 
	
		const year: number = parseInt(parts[0], 10);
		const month: number = parseInt(parts[1], 10);
		const day: number = parseInt(parts[2], 10);

		if(isNaN(year) || isNaN(month) || isNaN(day) ){
			console.log("String is not a number.")
			return undefined
		}
			
		return new CalendarDate(year, month, day)
	}
	
export const isValidDate = (maybeDate: string | undefined): boolean  => {
		if (maybeDate === undefined)
			return false; 
	
		const date = new Date(maybeDate)
	
		return !isNaN(date.getTime());
	}
	