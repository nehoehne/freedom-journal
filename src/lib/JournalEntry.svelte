<!-- ParentComponent.svelte -->
<script lang="ts">
	import { type DateValue } from "@internationalized/date";
	import DatePicker from "./DatePicker.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
    import ActivityList from "./ActivityList.svelte";

	let selectedDate: DateValue | undefined = undefined;

	console.log("Selected date in parent:", selectedDate);
</script>

<div>
	<DatePicker bind:value={selectedDate} />
	<Textarea placeholder="How was your day?" class="mt-3 mb-3" />
	<ActivityList listVariant="green"></ActivityList>
	<hr class="mt-3 mb-3">
	<ActivityList listVariant="yellow"></ActivityList>
	<hr class="mt-3 mb-3">
	<ActivityList listVariant="red"></ActivityList>

</div>
