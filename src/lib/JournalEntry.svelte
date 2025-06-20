<script lang="ts">
	import { type DateValue } from "@internationalized/date";
	import DatePicker from "./DatePicker.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
	import ActivityList from "./ActivityList.svelte";
	import { Entry } from "../objects/Entry";
	import Button from "./components/ui/button/button.svelte";
	import { JournalEntryType } from "./utils";
	import {
		greenActivities as allGreenActivities,
		yellowActivities as allYellowActivities,
		redActivities as allRedActivities,
		addEntry,
		updateEntry,
	} from "../stores/store";

	export let type: JournalEntryType;
	export let entry: Entry;

	// If state was provided then we want to populate the form
	let date: DateValue | undefined = entry.getDateAsDateValue();
	let text: string = entry.getText();

	const save = () => {
		if (entry) {
			entry.setDate(date);
			entry.setText(text);

			if (entry.hasValidDate()) {
				if (type == JournalEntryType.EDIT) {
					updateEntry(entry);
				} else if (type == JournalEntryType.NEW) {
					addEntry(entry);
				}
			} else {
				console.log("Missing date.");
			}
		} else {
			console.log("Missing state.");
		}
	};

	const isReadonly = () => type == JournalEntryType.READONLY;
</script>

<div>
	<DatePicker bind:date disabled={type == JournalEntryType.READONLY} />
	<Textarea
		bind:value={text}
		placeholder="How was your day?"
		class="mt-3 mb-3"
		disabled={isReadonly()}
	/>

	<!-- Green Activities -->
	<ActivityList
		selectedActivitiesMap={entry.getGreenActivitiesMap()}
		allActivities={$allGreenActivities}
		disabled={isReadonly()}
	></ActivityList>
	<hr class="mt-3 mb-3" />

	<!-- Yellow Activities -->
	<ActivityList
		selectedActivitiesMap={entry.getYellowActivitiesMap()}
		allActivities={$allYellowActivities}
		disabled={isReadonly()}
	></ActivityList>
	<hr class="mt-3 mb-3" />

	<!-- Red Activities -->
	<ActivityList
		selectedActivitiesMap={entry.getRedActivitiesMap()}
		allActivities={$allRedActivities}
		disabled={isReadonly()}
	></ActivityList>

	<!-- Only show Save button if editable -->
	{#if type == JournalEntryType.NEW || type == JournalEntryType.EDIT}
		<div class="mt-6 float-end">
			<Button variant="outline" on:click={() => save()}>Save</Button>
		</div>
	{/if}
</div>
