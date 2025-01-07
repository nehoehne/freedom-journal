import { CalendarDate, type DateValue } from "@internationalized/date";
import { Green, Red, Yellow, type IActivity } from "../activity/IActivity";

export class Entry {

	private greenActivities: Map<number, Green> = new Map<number, Green>(); 
	private yellowActivities: Map<number, Yellow> = new Map<number, Yellow>(); 
	private redActivities: Map<number, Red> = new Map<number, Red>(); 

	private date: string | undefined;
	private text: string;
	private id: number;

	constructor(id: number = -1, date: string | undefined = undefined, text: string = "") {
		this.id = id;
		this.date = date;
		this.text = text;
	}

	getText(): string {
		return this.text
	}

	setText(text: string) {
		this.text = text
	}

	getId() {
		return this.id
	}

	hasValidDate(): boolean {
		return isValidDate(this.date)
	}

	setDate(date: DateValue | undefined) {
		const dateStr = date?.toString()

		if (isValidDate(dateStr))
			this.date = dateStr
	}

	getDate() {
		return this.date;
	}

	getDateAsDateValue(): DateValue | undefined {
		const parts = this.date?.split("-")

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

	getGreenActivitiesMap(): Map<number, Green> {
		return this.greenActivities;
	}
	
	getYellowActivitiesMap(): Map<number, Yellow> {
		return this.yellowActivities;
	}

	getRedActivitiesMap(): Map<number, Red> {
		return this.redActivities;
	}

	getAllActivities(): IActivity[] {
		return [...this.getGreenActivities(), ...this.getYellowActivities(), ...this.getRedActivities()]
	}
}

function isValidDate(maybeDate: string | undefined): boolean {
	if (maybeDate === undefined)
		return false; 

	const date = new Date(maybeDate)

	return !isNaN(date.getTime());
}
