import type { IActivity } from "../activity/IActivity";
import type { Entry } from "../journal-entry/Entry";

export interface IBackend 
{
    getGreenActivities: () => Promise<IActivity[]>;
    getYellowActivities: () => Promise<IActivity[]>;
    getRedActivities: () => Promise<IActivity[]>;
    getJournalEntries: () => Promise<Entry[]>;
}