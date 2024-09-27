<!-- ParentComponent.svelte -->
<script lang="ts">
	import { type DateValue } from "@internationalized/date";
	import DatePicker from "./DatePicker.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
    import ActivityList from "./ActivityList.svelte";
    import { Green, Yellow, Red, type IActivity } from "../activity/IActivity";
	import { Backend } from "../backend/TauriBackend";
    import type { Entry } from "../journal-entry/Entry";


	let date: DateValue | undefined = undefined;
	let prevDate: DateValue | undefined = undefined;
	let backend = new Backend();

	console.log("Selected date in parent:", date);
	
	export let greenActivities : IActivity[] ; 
	export let yellowActivities : IActivity[] ; 
	export let redActivities : IActivity[] ; 
	export let entries: Entry[];

	$: if (date != prevDate) {
		
		prevDate = date;
  	}

</script>

<div>
	<DatePicker entries={entries}/>
	<Textarea placeholder="How was your day?" class="mt-3 mb-3" />
	<ActivityList activities={greenActivities}></ActivityList>
	<hr class="mt-3 mb-3">
	<ActivityList activities={yellowActivities}></ActivityList>
	<hr class="mt-3 mb-3">
	<ActivityList activities={redActivities}></ActivityList>
</div>
