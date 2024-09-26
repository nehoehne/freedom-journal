<!-- ParentComponent.svelte -->
<script lang="ts">
	import { type DateValue } from "@internationalized/date";
	import DatePicker from "./DatePicker.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
    import ActivityList from "./ActivityList.svelte";
    import { Green, Yellow, Red, type IActivity } from "../activity/IActivity";
	import { Backend } from "../backend/TauriBackend";
    import Spinner from "./Spinner.svelte";

	let selectedDate: DateValue | undefined = undefined;
	let backend = new Backend();

	console.log("Selected date in parent:", selectedDate);
	
	export let greenActivities : IActivity[] ; 
	export let yellowActivities : IActivity[] ; 
	export let redActivities : IActivity[] ; 
</script>

<div>
	<DatePicker bind:value={selectedDate} />
	<Textarea placeholder="How was your day?" class="mt-3 mb-3" />
	<ActivityList activities={greenActivities}></ActivityList>
	<hr class="mt-3 mb-3">
	<ActivityList activities={yellowActivities}></ActivityList>
	<hr class="mt-3 mb-3">
	<ActivityList activities={redActivities}></ActivityList>
</div>
