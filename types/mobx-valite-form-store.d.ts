import { Validator } from 'valite';

export declare type Errors<Entries extends Object> = {
  [Entry in keyof Entries]?: string;
};

export declare type Validators<Entries extends Object> = {
  [Entry in keyof Entries]?: Array<Validator>;
};

export default class FormStore<Entries extends Object> {
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
