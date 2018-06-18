import { validate, validateProperties, isValid, Validator } from 'valite';
import { observable, action, computed } from 'mobx';

export type Errors <Entries extends Object> = {
  [ Entry in keyof Entries ]?: string;
};

export type Validators <Entries extends Object> =  {
  [ Entry in keyof Entries ]?: Array<Validator>;
};

export default class FormStore <Entries extends Object> {
  @observable ticks: number = 0;
  @observable errors: Errors<Entries> = {};
  @observable entries: Entries;
  @observable validators: Validators<Entries> = {};

  constructor (entries: Entries, validators: Validators<Entries> = {}) {
    this.SET_ENTRIES(entries);
    this.validators = validators;
  }

  @computed get isLoading (): boolean {
    return this.ticks > 0;
  }

  @computed get isValid (): boolean {
    return isValid(this.errors);
  }

  setEntry <Entry extends keyof Entries> (entry: Entry, value: Entries[Entry]) {
    this.SET_ENTRY(entry, value);
    this.validateEntry(entry);
  }

  async validateEntry <Entry extends keyof Entries> (entry: Entry) {
    this.SET_LOADING();

    try {
      const error = await validate(this.entries[entry], this.validators[entry]);
      this.SET_ERROR(entry, error);
      this.UNSET_LOADING();
    } catch (error) {
      this.UNSET_LOADING();
      throw error;
    }
  }

  async validateEntries () {
    this.SET_LOADING();

    try {
      const errors = await validateProperties(this.entries, this.validators);
      this.SET_ERRORS(errors);
      this.UNSET_LOADING();
    } catch (error) {
      this.UNSET_LOADING();
      throw error;
    }
  }

  @action('SET_LOADING')
  private SET_LOADING () {
    this.ticks++;
  }

  @action('UNSET_LOADING')
  private UNSET_LOADING () {
    this.ticks--;
  }

  @action('SET_ERROR')
  private SET_ERROR <Entry extends keyof Entries> (entry: Entry, error?: string) {
    this.errors[entry] = error;
  }

  @action('SET_ERRORS')
  private SET_ERRORS (errors: Errors<Entries>) {
    this.errors = errors;
  }

  @action('SET_ENTRY')
  private SET_ENTRY <Entry extends keyof Entries> (entry: Entry, value: Entries[Entry]) {
    this.entries[entry] = value;
  }

  @action('SET_ENTRIES')
  private SET_ENTRIES (entries: Entries) {
    this.entries = entries;
  }
}
