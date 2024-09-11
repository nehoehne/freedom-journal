
CREATE TABLE IF NOT EXISTS journal_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
	date TEXT NOT NULL UNIQUE,
	text TEXT
);

CREATE TABLE IF NOT EXISTS activities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
	type TEXT NOT NULL CHECK (type IN ('green', 'yellow', 'red'))
);

CREATE TABLE IF NOT EXISTS journal_entry_activities (
    journal_entry_id INTEGER,
    activity_id INTEGER,
	PRIMARY KEY (journal_entry_id, activity_id)
	FOREIGN KEY(journal_entry_id) REFERENCES journal_entries(id)
	FOREIGN KEY(activity_id) REFERENCES activities(id)
);


