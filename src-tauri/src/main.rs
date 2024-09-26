
// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};
use std::fs::File;
use std::fs;
use std::io::Read;
use std::env;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {

	// Uncomment if you want to wipe the database 
	// delete_db();

	// Setup database tables
	let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: Box::leak(get_schema_sql().into_boxed_str()),
            kind: MigrationKind::Up,
        }
    ];
	
    tauri::Builder::default()
		.plugin(
			tauri_plugin_sql::Builder::default()
			.add_migrations("sqlite:test.db", migrations)
			.build()
		)
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn get_schema_sql() -> String {
	// TODO: get path from config
	let mut file = File::open("schema.sql").expect("Unable to find schema file");
	let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Unable to read schema file");
	return contents;
}

fn delete_db() {
	let file_path = "C:\\Users\\Nathan\\AppData\\Roaming\\com.tauri.dev\\test.db"; 

    match fs::remove_file(file_path) {
        Ok(_) => println!("File deleted successfully"),
        Err(err) => eprintln!("Error deleting file: {}", err),
    }
}