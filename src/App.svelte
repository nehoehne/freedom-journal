<script>
	import Journal from "$lib/Journal.svelte";
	import "./app.pcss";
	import { refreshActivities, refreshJournalEntries } from './stores/store';

	refreshJournalEntries()
	refreshActivities()
</script>

<main>
	<div>
		<Journal></Journal>
	</div>
</main>
