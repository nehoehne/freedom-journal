<!-- ParentComponent.svelte -->

<script lang="ts">
	import { CalendarDate, type DateValue } from "@internationalized/date";
	import DatePicker from "./DatePicker.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import ActivityList from "./ActivityList.svelte";
	import { Entry } from "../journal-entry/Entry";
	import Button from "./components/ui/button/button.svelte";
	import { JournalEntryType } from "./utils";
	import {
		journalEntries,
		greenActivities as allGreenActivities,
		yellowActivities as allYellowActivities,
		redActivities as allRedActivities,
	} from "../stores/store";
	import type { IActivity } from "../activity/IActivity";

	export let type: JournalEntryType;
	export let state: Entry | undefined = undefined;

	// If state was provided then we want to populate the form
	let date: DateValue | undefined = state?.getDateAsDateValue();
	let text: string | undefined = state?.text;

	const handleSubmit = () => {
		console.log("hello");
		// push changes to database
		// if add -> insert
		// if edit -> update
	};

	const isReadonly = () => type == JournalEntryType.READONLY;
</script>

<div>
	<form on:submit|preventDefault={handleSubmit}>
		<DatePicker
			entries={$journalEntries}
			bind:value={date}
			disabled={type == JournalEntryType.READONLY}
		/>
		<Textarea
			bind:value={text}
			placeholder="How was your day?"
			class="mt-3 mb-3"
			disabled={isReadonly()}
		/>
		<ActivityList
			selectedActivities={state?.greenActivities}
			allActivities={$allGreenActivities}
			disabled={isReadonly()}
		></ActivityList>
		<hr class="mt-3 mb-3" />
		<ActivityList
			selectedActivities={state?.yellowActivities}
			allActivities={$allYellowActivities}
			disabled={isReadonly()}
		></ActivityList>
		<hr class="mt-3 mb-3" />
		<ActivityList
			selectedActivities={state?.redActivities}
			allActivities={$allRedActivities}
			disabled={isReadonly()}
		></ActivityList>
		{#if type == JournalEntryType.NEW || type == JournalEntryType.EDIT}
			<div class="mt-6 float-right">
				<Button variant="outline" type="submit">Save</Button>
			</div>
		{/if}
	</form>
</div>

<style>
	.float-right {
		display: flex;
		justify-content: flex-end;
	}
</style>
