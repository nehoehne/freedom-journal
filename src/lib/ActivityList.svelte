<script lang="ts">
	import { Badge, type Variant } from "$lib/components/ui/badge";
	import Button from "./components/ui/button/button.svelte";
	let activities = [
		{ id: 1, name: "Item 1", selected: false },
		{ id: 2, name: "Item 2", selected: false },
		{ id: 3, name: "Item 3", selected: false },
		{ id: 32, name: "Item 3", selected: false },
		{ id: 33, name: "Item 3", selected: false },
		{ id: 34, name: "Item 3", selected: false },
		{ id: 35, name: "Item 3", selected: false },
		{ id: 36, name: "Item 3", selected: false },
		{ id: 37, name: "Item 3", selected: false },
		{ id: 38, name: "Item 3", selected: false },
		{ id: 234, name: "Item 3", selected: false },
		{ id: 345, name: "Item 3", selected: false },
	];

	export let listVariant: Variant;
	console.log(listVariant);

	const toggleSelected = (activity: any) => {
		activity.selected = !activity.selected;
		console.log(activity.selected);
	};
</script>

{#each activities as activity (activity.id)}
	<button 
	on:click={() => toggleSelected(activity)}
	class="mr-1 focus:ring-ring inline-flex select-none items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-0 focus:ring-offset-2d">
		{activity.name}
</button>
{/each}
