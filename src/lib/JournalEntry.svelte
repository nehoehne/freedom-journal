<!-- ParentComponent.svelte -->
<script lang="ts">
	import { type DateValue } from "@internationalized/date";
	import DatePicker from "./DatePicker.svelte";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
    import ActivityList from "./ActivityList.svelte";
    import { Green, Yellow, Red } from "../activity/IActivity";
	import { Backend } from "../backend/TauriBackend";
	import { onMount } from 'svelte';

	let selectedDate: DateValue | undefined = undefined;
	let backend = new Backend();

	console.log("Selected date in parent:", selectedDate);
	
	let greenActivities : Green[] = []; 
	let yellowActivities : Yellow[] = []; 
	let redActivities : Red[] = []; 

	onMount(async () => {
		greenActivities = await backend.getGreenActivities()
		yellowActivities = await backend.getYellowActivities()
		redActivities= await backend.getRedActivities()


  	});


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
