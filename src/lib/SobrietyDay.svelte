<script lang="ts">
  import { journalEntries } from "../stores/store";
  import { getEarliestRedEntryDate } from "../util/date";
    import StyledCard from "./StyledCard.svelte";

  let daysSober = 1;
  let sobrietyDate: Date | null = null;

  function calculateDaysSober() {
    if (!sobrietyDate) return;
    const today = new Date();
    const diffTime = today.getTime() - sobrietyDate.getTime();
    daysSober = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  // Dynamically recompute sobrietyDate & daysSober when store updates
  $: {
    const redDateString = getEarliestRedEntryDate($journalEntries);

    if (redDateString) {
      const parsed = new Date(redDateString);
      if (!isNaN(parsed.getTime())) {
        sobrietyDate = parsed;
        calculateDaysSober();
      } else {
        console.warn("Invalid date string from getEarliestRedEntryDate:", redDateString);
        sobrietyDate = null;
      }
    } else {
      sobrietyDate = null;
    }
  }

</script>

<StyledCard>
  <h2 class="text-2xl font-bold text-gray-800">Sobriety Tracker</h2>

  {#if sobrietyDate}
    <p class="text-lg text-gray-600">Since: {sobrietyDate.toDateString()}</p>
    <p class="text-4xl font-extrabold text-green-600">{daysSober}</p>
    <p class="text-md text-gray-500">days sober</p>
  {:else}
    <p class="text-md text-red-500">No relapse recorded yet.</p>
  {/if}
</StyledCard>
