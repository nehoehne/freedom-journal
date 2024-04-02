<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri"
  import Database from "tauri-plugin-sql-api";

  let name = "";
  let greetMsg = ""

  async function greet(){
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke("greet", { name })
	const db = await Database.load("sqlite:test.db");
	await db.execute("INSERT INTO mytable (name) VALUES (?)", [name])
	console.log(await db.select("select * from mytable"))
  }
</script>

<div>
  <form class="row" on:submit|preventDefault={greet}>
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button type="submit">Greet</button>
  </form>
  <p>{greetMsg}</p>
</div>