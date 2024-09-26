import type { IActivity } from "../activity/IActivity";

export interface IBackend 
{
    getJournalEntry: (date: string) => Promise<unknown>;
    getGreenActivities: () => Promise<IActivity[]>;
    getYellowActivities: () => Promise<IActivity[]>;
    getRedActivities: () => Promise<IActivity[]>;
}