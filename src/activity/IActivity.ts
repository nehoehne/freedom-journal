export interface IActivity {
	name: string;
	selected: boolean;

	toggleSelected: () => void;
	getStyles: () => string;
}

export class Green implements IActivity {
	
	private readonly baseStyles = "cursor-default border-transparent"
	private readonly selectedStyles = "bg-green-400 hover:bg-green-400/80";
	private readonly unselectedStyles = "bg-green-200 hover:bg-green-200/80";

	name: string;
	selected: boolean = false;

	constructor(name: string) {
		this.name = name;
	}

	getStyles() {
		let styles = this.baseStyles + " ";
		if (this.selected)
			styles += this.selectedStyles
		else 
			styles += this.unselectedStyles
		return styles;
	} 

	toggleSelected() {
		this.selected = !this.selected;
		console.log(this.selected)
	}

}

export class Yellow implements IActivity {
	
	private readonly baseStyles = "cursor-default border-transparent"
	private readonly selectedStyles = "bg-yellow-400 hover:bg-yellow-400/80";
	private readonly unselectedStyles = "bg-yellow-200 hover:bg-yellow-200/80";

	name: string;
	selected: boolean = false;

	constructor(name: string) {
		this.name = name;
	}

	getStyles() {
		let styles = this.baseStyles + " ";
		if (this.selected)
			styles += this.selectedStyles
		else 
			styles += this.unselectedStyles
		return styles;
	} 

	toggleSelected() {
		this.selected = !this.selected;
		console.log(this.selected)
	}

}

export class Red implements IActivity {
	
	private readonly baseStyles = "cursor-default border-transparent"
	private readonly selectedStyles = "bg-red-400 hover:bg-red-400/80";
	private readonly unselectedStyles = "bg-red-200 hover:bg-red-200/80";

	name: string;
	selected: boolean = false;

	constructor(name: string) {
		this.name = name;
	}

	getStyles() {
		let styles = this.baseStyles + " ";
		if (this.selected)
			styles += this.selectedStyles
		else 
			styles += this.unselectedStyles
		return styles;
	} 

	toggleSelected() {
		this.selected = !this.selected;
		console.log(this.selected)
	}

}