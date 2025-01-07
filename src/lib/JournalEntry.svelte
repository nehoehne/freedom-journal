<script lang="ts">
	import { type DateValue } from "@internationalized/date";
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
        addEntry,
	} from "../stores/store";

	export let type: JournalEntryType;
	export let entry: Entry;

	// If state was provided then we want to populate the form
	let date: DateValue | undefined = entry.getDateAsDateValue();
	let text: string = entry.getText();

	const handleSubmit = () => {
		if (entry) {
			
			entry.setDate(date)
			entry.setText(text)

			if (entry.hasValidDate()) {
				if (type == JournalEntryType.EDIT) {
					console.log("EDIT")
				} else if (type == JournalEntryType.NEW) {
					addEntry(entry)
				}
			} else {
				console.log("Missing date.")
			}
		}
		else 
			console.log("Missing state.")
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
			selectedActivitiesMap={entry.getGreenActivitiesMap()}
			allActivities={$allGreenActivities}
			disabled={isReadonly()}
		></ActivityList>
		<hr class="mt-3 mb-3" />
		<ActivityList
			selectedActivitiesMap={entry.getYellowActivitiesMap()}
			allActivities={$allYellowActivities}
			disabled={isReadonly()}
		></ActivityList>
		<hr class="mt-3 mb-3" />
		<ActivityList
			selectedActivitiesMap={entry.getRedActivitiesMap()}
			allActivities={$allRedActivities}
			disabled={isReadonly()}
		></ActivityList>
		{#if type == JournalEntryType.NEW || type == JournalEntryType.EDIT}
			<div class="mt-6 float-end">
				<Button variant="outline" type="submit">Save</Button>
			</div>
		{/if}
	</form>
</div>
