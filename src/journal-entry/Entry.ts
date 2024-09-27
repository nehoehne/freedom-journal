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
}