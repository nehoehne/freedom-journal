<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import JournalEntry from "./JournalEntry.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Entry } from "../journal-entry/Entry";
	import { JournalEntryType } from "./utils";
	import { journalEntries } from "../stores/store";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}
		>Add Entry</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
		<ScrollArea class="sm:max-h-[590px] sm:max-w-[600px] p-4">
			<JournalEntry
				type={JournalEntryType.EDIT}
				state={new Entry(1234, "", "")}
			></JournalEntry>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>

<div class="mx-auto w-1/2">
	{#each $journalEntries as journalEntry}
		<div class="float-end">
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: "link" })}
					>Edit</Dialog.Trigger
				>
				<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
					<ScrollArea class="sm:max-h-[590px] sm:max-w-[600px] p-4">
						<JournalEntry
							type={JournalEntryType.EDIT}
							state={journalEntry}
						></JournalEntry>
					</ScrollArea>
				</Dialog.Content>
			</Dialog.Root>
		</div>
		<div class="mb-10">
			<JournalEntry type={JournalEntryType.READONLY} state={journalEntry}
			></JournalEntry>
		</div>
	{/each}
</div>
