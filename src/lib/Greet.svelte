<script lang="ts">
	import { invoke } from "@tauri-apps/api/tauri";
	import Database from "tauri-plugin-sql-api";

	let name = "";
	let greetMsg = "";

	async function greet() {
		// Example tauri command generated with project template 
		greetMsg = await invoke("greet", { name });

		// Example tauri-plugin-sql usage:
		// This way we will be able to do most of the logic from the front end 
		// which means more javascript and less rust. 
		
		const db = await Database.load("sqlite:test.db"); // Absolute path: C:\Users\Nathan\AppData\Roaming\com.tauri.dev

		await db.execute("INSERT INTO activities (name, type) VALUES (?, ?)", [name, 'green']);

		// Dates must be unique so this command will fail when run multiple times. This is expected behaviour 
		//
		// await db.execute("INSERT INTO journal_entries (date, text) VALUES (?, ?)", ['2024-04-12', name]);

		// await db.execute("INSERT INTO journal_entry_activities (journal_entry_id, activity_id) VALUES (?, ?)", [1, 1]);
		
		console.log(await db.select("select * from activities"));
		console.log(await db.select("select * from journal_entries"));
		console.log(await db.select("select * from journal_entry_activities"));
	}
</script>

<div>
	<form class="row" on:submit|preventDefault={greet}>
		<input
			id="greet-input"
			placeholder="Enter a name..."
			bind:value={name}
		/>
		<button type="submit">Greet</button>
	</form>
	<p>{greetMsg}</p>
</div>
