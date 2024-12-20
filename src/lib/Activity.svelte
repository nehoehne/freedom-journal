<script lang="ts">
	import type { IActivity } from "../activity/IActivity";
	import { cn } from "$lib/utils.js";

	const baseStyles =
		"mr-1 focus:ring-ring inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-0 focus:ring-offset-2d ";

	export let activity: IActivity;
	export let disabled: boolean = false;
	export let selectedActivitiesMap: Map<number, IActivity>;

	let styles = "";
	
	const toggleSelected = () => {
		if (selectedActivitiesMap) {
			selectedActivitiesMap.has(activity.id)
				? selectedActivitiesMap.delete(activity.id)
				: selectedActivitiesMap.set(activity.id, activity);
		
			refreshStyles()
		}
	};

	const refreshStyles = () => {
		styles = selectedActivitiesMap.has(activity.id)
			? activity.getSelectedStyles()
			: activity.getUnselectedStyles();
	};

	refreshStyles();
</script>

<button
	on:click={() => toggleSelected()}
	{disabled}
	class={cn(baseStyles, styles)}
>
	{activity.name}
</button>
