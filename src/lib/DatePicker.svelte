<script lang="ts">
	import CalendarIcon from "lucide-svelte/icons/calendar";
	import {
		DateFormatter,
		type DateValue,
		getLocalTimeZone,
	} from "@internationalized/date";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { Calendar } from "$lib/components/ui/calendar/index.js";
	import * as Popover from "$lib/components/ui/popover/index.js";
	import { today } from "@internationalized/date";
    import { journalEntries } from "../stores/store";
	
	const df = new DateFormatter("en-US", {
		dateStyle: "long",
	});

	export let date: DateValue | undefined = undefined;
	export let disabled: boolean = false; 

	// Check if there is already a journal entry for the 
	// given date since we don't allow duplicates
	const checkUnavailable = (date: DateValue) => {
		for (let entry of $journalEntries)
			if (date.toString() === entry.getDate())
				return true;
		return false; 
	};

</script>

<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn(
				"w-[280px] justify-start text-left font-normal",
				!date && "text-muted-foreground",
			)}
			builders={[builder]}
			disabled={disabled}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			
			<!-- Show default text if no date was provided -->
			{date
				? df.format(date.toDate(getLocalTimeZone()))
				: "Pick a date"}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar
			bind:value={date} 
			initialFocus
			maxValue={today(getLocalTimeZone())}
			isDateUnavailable={checkUnavailable}
		/>
	</Popover.Content>
</Popover.Root>
