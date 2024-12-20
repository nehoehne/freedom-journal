import { CalendarDate, type DateValue } from "@internationalized/date";
import { Green, Red, Yellow, type IActivity } from "../activity/IActivity";

export class Entry {

	private greenActivities: Map<number, Green> = new Map<number, Green>(); 
	private yellowActivities: Map<number, Yellow> = new Map<number, Yellow>(); 
	private redActivities: Map<number, Red> = new Map<number, Red>(); 

	readonly id: number;
	readonly date: string;
	readonly text: string;

	constructor(id: number, date: string, text: string) {
		this.id = id;
		this.date = date;
		this.text = text;
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
	
	addGreenActivity(activity: Green) {
		this.greenActivities.set(activity.id, activity);
	}

	addYellowActivity(activity: Yellow) {
		this.yellowActivities.set(activity.id, activity);
	}

	addRedActivity(activity: Red) {
		this.redActivities.set(activity.id, activity);
	}

	getGreenActivities(): Green[] {
		return this.greenActivities.values().toArray()
	}

	getYellowActivities(): Yellow[] {
		return this.yellowActivities.values().toArray()
	}
	
	getRedActivities(): Red[] {
		return this.redActivities.values().toArray()
	}

	getAllActivities(): IActivity[] {
		return [...this.getGreenActivities(), ...this.getYellowActivities(), ...this.getRedActivities()]
	}
}