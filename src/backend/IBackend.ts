export interface IBackend 
{
    getJournalEntry: (date: string) => Promise<unknown>;
    
}