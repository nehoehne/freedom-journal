<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import JournalEntry from "./JournalEntry.svelte";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}
		>Add Entry</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[700px]">
		<JournalEntry></JournalEntry>
	</Dialog.Content>
</Dialog.Root>
