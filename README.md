# MobX `valite` form Store

[![Build Status][2]][1]

A MobX form store using [valite][0] as validator.

## Installation

This module is published under NPM Registry, so you can install using NPM, Yarn and other package managers.

```sh
npm install --save mobx-valite-form-store

# Use the command below if you're using Yarn.
yarn add mobx-valite-form-store
```

## Usage

This module provides a store class to handle form states, validators & their error states.

```tsx
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import FormStore, { Validators } from 'mobx-valite-form';

// FormStore entries model.
type Entries = { name: string; };

// Initial state of store's entries.
const entries: Entries = { name: '' };

// An validator schema for entries object.
const validators: Validators<Entries> = {
  name: [
    (name) => (typeof name === 'string' && !!name.trim()) || 'Name is a required entry.',
    (name) => (name.length > 2 && name.length < 30) || 'Name should have between 2 and 30 chars.'
  ]
};

@observer
export default class Form extends Component {
  @observable store = new FormStore(entries, validators);

  onSubmit = async () => {
    await this.store.validateEntries();

    if (!this.store.isValid)
      return;
    this.props.onSave(this.store.entries);
  };

  render () {
    return (
      <form>
        <input
          value={ this.store.entries.name }
          onChange={ (e) => this.store.setEntry('name', e.target.value) }
        />

        { this.store.errors.name && <span>{ this.store.errors.name }</span> }
      </form>
    );
  }
}
```

## License

Released under MIT license.

[0]: https://github.com/VitorLuizC/valite
[1]: https://travis-ci.org/VitorLuizC/mobx-valite-form-store
[2]: https://travis-ci.org/VitorLuizC/mobx-valite-form-store.svg?branch=master
