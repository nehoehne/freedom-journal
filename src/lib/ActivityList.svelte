<script lang="ts">
    import Activity from "./Activity.svelte";
    import { type IActivity } from "../activity/IActivity";
		
	export let activities: IActivity[];
	export let disabled: boolean = false;
</script>

{#each activities as activity}
<Activity activity={activity} disabled={disabled}></Activity>
{/each}
