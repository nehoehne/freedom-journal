<script lang="ts">
	import Activity from "./Activity.svelte";
	import { type IActivity } from "../activity/IActivity";

	export let allActivities: IActivity[];
	// export let selectedActivities: IActivity[];
	export let disabled: boolean = false;
	export let selectedActivities: IActivity[] = [];
	
	const selectedActivitiesMap = new Map<number, IActivity>();

	for(let activity of selectedActivities)
		selectedActivitiesMap.set(activity.id, activity)

	for(let activity of allActivities) 
		activity.selected = selectedActivitiesMap.has(activity.id) 

</script>

{#each allActivities as activity}
	<Activity {activity} {disabled}></Activity>
{/each}
