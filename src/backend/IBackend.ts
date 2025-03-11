import type { IActivity } from "../objects/IActivity";
import type { Entry } from "../journal-entry/Entry";

export interface IBackend 
{
	getEntry: (date: string) => Promise<Entry | undefined> 
    getGreenActivities: () => Promise<IActivity[]>;
    getYellowActivities: () => Promise<IActivity[]>;
    getRedActivities: () => Promise<IActivity[]>;
    getJournalEntries: () => Promise<Entry[]>;
}