<script lang="ts">
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import JournalEntry from "./JournalEntry.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import { Entry } from "../objects/Entry";
	import { JournalEntryType } from "./utils";
	import { journalEntries } from "../stores/store";
	import { Backend } from "../backend/TauriBackend";
    import SobrietyDay from "./SobrietyDay.svelte";
    import StyledCard from "./StyledCard.svelte";
	
	let newActivityName = "";
	let selectedType: 'green' | 'yellow' | 'red' = 'green';

	async function handleAddActivity() {
		if (!newActivityName.trim()) {
			alert("Please enter an activity name.");
			return;
		}
		addActivityByType(selectedType, newActivityName);
		newActivityName = ""
		
	}

	// Simulate your existing method from your database class
	async function addActivityByType(type: 'green' | 'yellow' | 'red', name: string) {
		// Replace with actual call to your DB class method
		console.log(`Adding: ${name} (${type})`);
		new Backend().addActivityByType(type, name)
	}
	let showDropdown = false;

  const lastEntry: Entry | null = $journalEntries.length > 0 ? $journalEntries[$journalEntries.length - 1] : null;
</script>

<SobrietyDay/>
<StyledCard>
	<!-- Button group: full-width, stacked -->
	<div class="flex flex-col gap-2 w-full">
		<!-- Dropdown trigger -->
		<div class="relative w-full">
			<button
				on:click={() => (showDropdown = !showDropdown)}
				class={buttonVariants({ variant: "outline" }) + " w-full"}
			>
				New Activity
			</button>

			<!-- Dropdown content -->
			{#if showDropdown}
				<div
					class="absolute z-10 mt-2 w-full max-w-[300px] left-1/2 -translate-x-1/2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 p-4"
				>
					<div class="flex flex-col gap-3">
						<input
							type="text"
							bind:value={newActivityName}
							placeholder="Activity name"
							class="border px-3 py-2 rounded w-full"
						/>

						<select
							bind:value={selectedType}
							class="border px-2 py-2 rounded w-full"
						>
							<option value="green">Green</option>
							<option value="yellow">Yellow</option>
							<option value="red">Red</option>
						</select>

						<button
							class={buttonVariants({ variant: "default" }) + " w-full"}
							on:click={() => {
								handleAddActivity();
							}}
						>
							Add
						</button>
					</div>
				</div>
			{/if}
		</div>

		<!-- Add Entry dialog button -->
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: "outline" }) + " w-full"}>
				New Entry
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
				<ScrollArea class="sm:max-h-[590px] sm:max-w-[600px] p-4">
					<JournalEntry
						type={JournalEntryType.NEW}
						entry={new Entry()}
					/>
				</ScrollArea>
			</Dialog.Content>
		</Dialog.Root>
	</div>
</StyledCard>


<div class="mx-auto w-1/2 mt-10">
	{#each $journalEntries as journalEntry}
		<div class="float-end">

			<!-- 'Edit' button -->
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants({ variant: "link" })}
					>Edit</Dialog.Trigger
				>
				<Dialog.Content class="sm:max-h-[600px] sm:max-w-[600px]">
					<ScrollArea class="sm:max-h-[590px] sm:max-w-[600px] p-4">
						<JournalEntry
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
