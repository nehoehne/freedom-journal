import { CalendarDate, type DateValue } from "@internationalized/date";
import { Green, Red, Yellow, type IActivity } from "../objects/IActivity";
import { getDateAsDateValue, isValidDate } from "../util/date";

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
		return getDateAsDateValue(this.date);
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
		return [...this.greenActivities.values()]
	}

	getYellowActivities(): Yellow[] {
		return [...this.yellowActivities.values()]
	}
	
	getRedActivities(): Red[] {
		return [...this.redActivities.values()]
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

