<script lang="ts">
    import Activity from "./Activity.svelte";
    import { type IActivity } from "../activity/IActivity";
		
	export let activities: IActivity[];

</script>

{#each activities as activity}
<Activity activity={activity}></Activity>
{/each}
