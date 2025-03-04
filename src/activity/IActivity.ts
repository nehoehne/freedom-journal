import { Entry } from "../journal-entry/Entry";

export interface IActivity {
	name: string;
	id: number;

	getSelectedStyles: () => string;
	getUnselectedStyles: () => string;
	addSelfToJournal: (entry: Entry) => void;
}

export const toActivity = (rawActivity: any) => {
	
	const id = rawActivity?.id
	const type = rawActivity?.type
	const name = rawActivity?.name

	if (id === undefined || type === undefined || name === undefined)
		return undefined

	switch (type) {
		case 'green':
			return new Green(name, id);
		case 'yellow':
			return new Yellow(name, id);
		case 'red':
			return new Red(name, id);
		default:
			return undefined; 
	}
}

export class Green implements IActivity {
	
	private readonly baseStyles = "cursor-default border-transparent"
	private readonly selectedStyles = "bg-green-400 hover:bg-green-400/80";
	private readonly unselectedStyles = "bg-green-200 hover:bg-green-200/80";

	id: number;
	name: string;

	constructor(name: string, id: number) {
		this.name = name;
		this.id = id
	}

	addSelfToJournal(entry: Entry) {
		entry.addGreenActivity(this);
	}
	
	getSelectedStyles() {
		return this.baseStyles + " " + this.selectedStyles
	}

	getUnselectedStyles() {
		return this.baseStyles + " " + this.unselectedStyles
	}

}

export class Yellow implements IActivity {
	
	private readonly baseStyles = "cursor-default border-transparent"
	private readonly selectedStyles = "bg-yellow-400 hover:bg-yellow-400/80";
	private readonly unselectedStyles = "bg-yellow-200 hover:bg-yellow-200/80";

	id: number;
	name: string;

	constructor(name: string, id: number) {
		this.name = name;
		this.id = id
	}
	
	addSelfToJournal(entry: Entry) {
		entry.addYellowActivity(this);
	}

	getSelectedStyles() {
		return this.baseStyles + " " + this.selectedStyles
	}

	getUnselectedStyles() {
		return this.baseStyles + " " + this.unselectedStyles
	}

}

export class Red implements IActivity {
	
	private readonly baseStyles = "cursor-default border-transparent"
	private readonly selectedStyles = "bg-red-400 hover:bg-red-400/80";
	private readonly unselectedStyles = "bg-red-200 hover:bg-red-200/80";

	name: string;
	id: number;

	constructor(name: string, id: number) {
		this.name = name;
		this.id = id
	}

	addSelfToJournal(entry: Entry) {
		entry.addRedActivity(this);
	}

	getSelectedStyles() {
		return this.baseStyles + " " + this.selectedStyles
	}

	getUnselectedStyles() {
		return this.baseStyles + " " + this.unselectedStyles
	}
	
}