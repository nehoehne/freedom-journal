import { CalendarDate, type DateValue } from "@internationalized/date";
import { Green, Red, Yellow, type IActivity } from "../activity/IActivity";

export class Entry {

	greenActivities: Green[] = [];
	yellowActivities: Yellow[] = [];
	redActivities: Red[] = [];

	id: number;
	date: string;
	text: string;

	constructor(id: number, date: string, text: string) {
		this.id = id;
		this.date = date;
		this.text = text;
	}

	addGreenActivity(activity: Green) {
		this.greenActivities.push(activity);
	}

	addYellowActivity(activity: Yellow) {
		this.yellowActivities.push(activity);
	}
	addRedActivity(activity: Red) {
		this.redActivities.push(activity);
	}

	getDateAsDateValue(): DateValue | undefined {
		const parts = this.date?.split("-")
		const year: number = parseInt(parts[0], 10);
		const month: number = parseInt(parts[1], 10);
		const day: number = parseInt(parts[2], 10);

		if(isNaN(year) || isNaN(month) || isNaN(day) ){
			console.log("String is not a number.")
			return undefined
		}

		return new CalendarDate(year, month, day)
	}
}