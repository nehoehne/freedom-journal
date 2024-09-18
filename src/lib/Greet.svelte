<script lang="ts">
	import { invoke } from "@tauri-apps/api/tauri";

	let name = "";
	let greetMsg = "";

	async function greet() {
		// Example tauri command generated with project template 
		greetMsg = await invoke("greet", { name });
	}
</script>

<div>
	<form class="row" on:submit|preventDefault={greet}>
		<input
			id="greet-input"
			placeholder="Enter a name..."
			bind:value={name}
		/>
		<button type="submit">Test</button>
	</form>
	<p>{greetMsg}</p>
</div>
