<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import JournalEntry from "./JournalEntry.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Backend } from "../backend/TauriBackend";
	import { Green, Yellow, Red, type IActivity } from "../activity/IActivity";
	import { onMount } from "svelte";
	import { Entry } from "../journal-entry/Entry";
	import { JournalEntryType } from "./utils";

	let backend = new Backend();

	let greenActivities: IActivity[] = [];
	let yellowActivities: IActivity[] = [];
	let redActivities: IActivity[] = [];

	let entries: Entry[];

	// TODO: make this global state so we can stash it and only run queries
	// to update existing state instead of getting it fresh each time
	const getActivities = async () => {
		greenActivities = await backend.getGreenActivities();
		yellowActivities = await backend.getYellowActivities();
		redActivities = await backend.getRedActivities();
		entries = await backend.getJournalEntries();
	};

	onMount(() => getActivities());
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}
		>Add Entry</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
		<ScrollArea class="sm:max-h-[590px] sm:max-w-[600px] p-4">
			<JournalEntry
				type={JournalEntryType.READONLY}
				state={new Entry(1234, "2222-22-22", "hellow world")}
				{entries}
				{greenActivities}
				{yellowActivities}
				{redActivities}
			></JournalEntry>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>

<div class="mx-auto w-1/2">

	<ScrollArea class="sm:max-w-[600px] p-4 ">
		
		<JournalEntry
		type={JournalEntryType.READONLY}
		state={new Entry(1234, "2222-22-22", "hellow world")}
		{entries}
		{greenActivities}
		{yellowActivities}
		{redActivities}
		></JournalEntry>
		<JournalEntry
		type={JournalEntryType.READONLY}
		state={new Entry(1234, "2222-22-22", "hellow world")}
		{entries}
		{greenActivities}
		{yellowActivities}
		{redActivities}
		></JournalEntry>
		
	</ScrollArea>
</div>