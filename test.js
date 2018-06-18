import FormStore from './';
import test from 'ava';

const sleep = (time) => new Promise((done) => setTimeout(done, time));

test('Module API: FormStore is default exported class', (context) => {
  const store = new FormStore({});

  context.is(typeof FormStore, 'function');
  context.true(store instanceof FormStore);
});

test('FormStore entries: FormStore handle entries changes', (context) => {
  const store = new FormStore({
    name: ''
  });

  context.is(store.entries.name, '');

  store.setEntry('name', 'Fred');

  context.is(store.entries.name, 'Fred');
});

test('FormStore validators: FormStore validate on entry change', async (context) => {
  let isExecuted = false;

  const validators = {
    name: [
      () => isExecuted = true // Change var and returns `true`.
    ]
  }

  const store = new FormStore({ name: '' }, validators);

  context.false(isExecuted);

  store.setEntry('name', 'Vitor');

  await sleep(200);

  context.true(isExecuted);
});

test('FormStore validators: FormStore can validate an entry or every entries', async (context) => {
  const validators = {
    name: [
      (name) => typeof name === 'string' && !!name.trim() || 'Name is required.',
      (name) => name && name.length > 2 || 'Name should have at least 2 characters.'
    ],
    email: [
      (email) => typeof email === 'string' && !!email.trim() || 'E-Mail is required.',
    ]
  };

  const store = new FormStore({}, validators);

  await store.validateEntry('name');

  context.is(store.errors.name, 'Name is required.');
  context.is(store.isValid, false);

  store.setEntry('name', 'Yuri');

  await sleep(200);

  context.falsy(store.errors.name);
  context.is(store.isValid, true);

  store.setEntry('name', 'O');

  await store.validateEntries();

  context.is(store.errors.name, 'Name should have at least 2 characters.');
  context.is(store.errors.email, 'E-Mail is required.');
  context.is(store.isValid, false);
});

test('FormStore validators: FormStore keep loading until all validators finish', async (context) => {
  const validators = {
    name: [
      () => sleep(200).then(() => Promise.resolve(true)),
      () => sleep(800).then(() => Promise.resolve(true))
    ],
    email: [
      () => sleep(800).then(() => Promise.resolve(true))
    ]
  };

  const store = new FormStore({}, validators);

  store.validateEntry('email');
  store.validateEntry('name');
  store.validateEntries();

  context.is(store.isLoading, true);

  await sleep(250);

  context.is(store.isLoading, true);

  store.validateEntries();

  await sleep(850);

  context.is(store.isLoading, false);
});

