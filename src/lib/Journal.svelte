<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import JournalEntry from "./JournalEntry.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}
		>Add Entry</Dialog.Trigger
	>
	<!-- TODO: fix dialog transition -->
	<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
		<ScrollArea class="sm:max-h-[600px] sm:max-w-[600px] p-4">
			<JournalEntry></JournalEntry>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
