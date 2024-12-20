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
        addEntry,
	} from "../stores/store";
	import type { IActivity } from "../activity/IActivity";
    import { Backend } from "../backend/TauriBackend";

	export let type: JournalEntryType;
	export let entry: Entry;

	// If state was provided then we want to populate the form
	let date: DateValue | undefined = entry.getDateAsDateValue();
	let text: string = entry.text;

	const setActivityMap = (selectedActivities: IActivity[], selectedActivitiesMap: Map<number, IActivity>) => {
		for(let activity of selectedActivities)
			selectedActivitiesMap.set(activity.id, activity)
	}

	const handleSubmit = () => {
		if (entry) {
			let dateStr = date?.toString()

			if (dateStr) {
				entry.date = dateStr
				if (type == JournalEntryType.EDIT) {
					console.log("EDIT")
				} else if (type == JournalEntryType.NEW) {
					console.log("NEW")

					// TODO: concat not working -> move code to entry 
					console.log(date?.toString())
					const selectedActivities = greenSelectedMap.values().toArray()
					selectedActivities.concat(yellowSelectedMap.values().toArray(), redSelectedMap.values().toArray())
					addEntry(entry, selectedActivities)
				}

			} else {
				console.log("Missing date.")
			}

		}
		else 
			console.log("Missing state.")
	};

	const isReadonly = () => type == JournalEntryType.READONLY;

	if (entry) {
		setActivityMap(entry.greenActivities, greenSelectedMap)
		setActivityMap(entry.yellowActivities, yellowSelectedMap)
		setActivityMap(entry.redActivities, redSelectedMap)
	}
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
			selectedActivitiesMap={greenSelectedMap}
			allActivities={$allGreenActivities}
			disabled={isReadonly()}
		></ActivityList>
		<hr class="mt-3 mb-3" />
		<ActivityList
			selectedActivitiesMap={yellowSelectedMap}
			allActivities={$allYellowActivities}
			disabled={isReadonly()}
		></ActivityList>
		<hr class="mt-3 mb-3" />
		<ActivityList
			selectedActivitiesMap={redSelectedMap}
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
