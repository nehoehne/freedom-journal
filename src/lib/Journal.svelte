<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import JournalEntry from "./JournalEntry.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Entry } from "../objects/Entry";
	import { JournalEntryType } from "./utils";
	import { journalEntries } from "../stores/store";
	
	let open = false; // used to close the Dialog
	
</script>

<!-- 'Add' button -->
<Dialog.Root bind:open>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}
		>Add Entry</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
		<ScrollArea class="sm:max-h-[590px] sm:max-w-[600px] p-4">
			<JournalEntry
				bind:open
				type={JournalEntryType.NEW}
				entry={new Entry()}
			></JournalEntry>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>

<div class="mx-auto w-1/2">
	{#each $journalEntries as journalEntry}
		<div class="float-end">

			<!-- 'Edit' button -->
			<Dialog.Root bind:open>
				<Dialog.Trigger class={buttonVariants({ variant: "link" })}
					>Edit</Dialog.Trigger
				>
				<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
					<ScrollArea class="sm:max-h-[590px] sm:max-w-[600px] p-4">
						<JournalEntry
							bind:open
							type={JournalEntryType.EDIT}
							entry={journalEntry}
						></JournalEntry>
					</ScrollArea>
				</Dialog.Content>
			</Dialog.Root>
		</div>

		<!-- Journal entry -->
		<div class="mb-10">
			<JournalEntry
				type={JournalEntryType.READONLY}
				entry={journalEntry}
			></JournalEntry>
		</div>
	{/each}
</div>
