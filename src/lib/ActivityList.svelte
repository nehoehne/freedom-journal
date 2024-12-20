<script lang="ts">
	import Activity from "./Activity.svelte";
	import { type IActivity } from "../activity/IActivity";

	export let allActivities: IActivity[];
	export let disabled: boolean = false;
	export let selectedActivitiesMap: Map<number, IActivity>;
</script>

{#each allActivities as activity}
	<Activity {activity} {disabled} {selectedActivitiesMap}></Activity>
{/each}
