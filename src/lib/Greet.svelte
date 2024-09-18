<script lang="ts">
	import { invoke } from "@tauri-apps/api/tauri";
	import "../app.css"
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
		<button type="submit" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
			Button
		  </button>
	</form>
	<p>{greetMsg}</p>
</div>
