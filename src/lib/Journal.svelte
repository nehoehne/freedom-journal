<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import JournalEntry from "./JournalEntry.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Backend } from "../backend/TauriBackend";
    import { Green, Yellow, Red, type IActivity } from "../activity/IActivity";
    import { onMount } from "svelte";
	import Spinner from "./Spinner.svelte";

	let backend = new Backend();

	let greenActivities : IActivity[];
	let yellowActivities : IActivity[];
	let redActivities : IActivity[];

	// TODO: make this global state so we can stash it and only run queries 
	// to update existing state instead of getting it fresh each time 
	const getActivities = async () => {
		greenActivities = await backend.getGreenActivities()
		yellowActivities = await backend.getYellowActivities()
		redActivities= await backend.getRedActivities()
	}
	
	onMount(() => getActivities())
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Add Entry</Dialog.Trigger>
	<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
	<ScrollArea class="sm:max-h-[600px] sm:max-w-[600px] p-4">
		<JournalEntry greenActivities={greenActivities} yellowActivities={yellowActivities} redActivities={redActivities}></JournalEntry>
	</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
