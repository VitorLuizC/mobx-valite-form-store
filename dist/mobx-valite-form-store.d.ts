import { Validator } from 'valite';
declare type Errors<Entries extends Object> = {
    [Entry in keyof Entries]?: string;
};
declare type Validators<Entries extends Object> = {
    [Entry in keyof Entries]?: Array<Validator>;
};
declare class FormStore<Entries extends Object> {
    ticks: number;
    errors: Errors<Entries>;
    entries: Entries;
    validators: Validators<Entries>;
    constructor(entries: Entries, validators?: Validators<Entries>);
    readonly isLoading: boolean;
    readonly isValid: boolean;
    setEntry<Entry extends keyof Entries>(entry: Entry, value: Entries[Entry]): void;
    validateEntry<Entry extends keyof Entries>(entry: Entry): Promise<void>;
    validateEntries(): Promise<void>;
    private SET_LOADING;
    private UNSET_LOADING;
    private SET_ERROR;
    private SET_ERRORS;
    private SET_ENTRY;
    private SET_ENTRIES;
}
export { FormStore as default, Errors, Validators };
