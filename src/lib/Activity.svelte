<script lang="ts">
    import type { IActivity } from "../activity/IActivity";
	import { cn } from "$lib/utils.js";
	
	const baseStyles = "mr-1 focus:ring-ring inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-0 focus:ring-offset-2d ";
	
	export let activity: IActivity;
	export let disabled: boolean = false; 
	let styles = activity.getStyles()

	const toggleSelected = () => {
		activity.toggleSelected()
		styles = activity.getStyles();	
	}

</script>

<button
	on:click={() => toggleSelected()}
	disabled={disabled}
	class={
		cn(
	   	baseStyles,
	   	styles
	  )}
	
>
	{activity.name}
</button>
