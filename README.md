# tsdux #

[![npm latest version](https://img.shields.io/npm/v/tsdux/latest.svg)](https://www.npmjs.com/package/tsdux)
[![npm total download](https://img.shields.io/npm/dt/tsdux.svg)](https://www.npmjs.com/package/tsdux)
[![github license](https://img.shields.io/github/license/Ailrun/tsdux.svg)](https://github.com/Ailrun/tsdux/blob/master/LICENSE)
[![github latest tag](https://img.shields.io/github/tag/Ailrun/tsdux.svg)](https://github.com/Ailrun/tsdux/tags)
[![github commit from latest](https://img.shields.io/github/commits-since/Ailrun/tsdux/latest.svg)](https://github.com/Ailrun/tsdux)

Type-safe Redux Utils for TypeScript!

## Table of Contents ##

- [How To Install](#how-to-install)
- [Prior Arts](#prior-arts)
- [API](#api)
- [Author](#author)

## How To Install ##

```
npm install --save tsdux
```

## Prior Arts ##

This library is highly inspired by [ts-action](https://github.com/cartant/ts-action).
However, it uses `Object.setPrototypeOf` in its code, and it is really, really bad to performace (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)) and have some runtime overheads on the `ActionCtor` instances.
This library is intended to be more fast, and be more lighter (therefore, have less APIs...) than ts-action (At least this **does not** use `Object.setPrototypeOf`!). If you find any codes those hurt performance, please [report an issue](https://github.com/Ailrun/tsdux/issues).

## API ##

- [Action util functions](#action-util-functions)
    - [action](#action)
    - [payload](#payload)
- [Action type util functions](#action-type-util-functions)
    - [union](#union)
- [Reducer util functions](#reducer-util-functions)
    - [subreducer](#subreducer)
    - [reducer](#reducer)

### Action util functions ###

Functions for defining an action (or rather an action creator). Defined action creators are used to define reducer.

#### action ####

``` typescript
function action<T extends string>(type: T): ActionCreatorWithoutPayload<T>
function action<T extends string, P>(type: T, p: Payload<P>): ActionCreatorWithPayload<T, P>
```
`action` is for creating an `ActionCreator`. `ActionCreator` is object used for this library. You can create action by using `actionCreator.create` method.

``` typescript
const FixNote = action('FixNote');
const fixNote = FixNote.create();
console.log(fixNote); // { type: 'FixNote' }
```

``` typescript
switch (action.type) {
case FixNote.type:
  // ... fix note
default:
  return state;
}
```

However, if you cannot define payload, this action is useless. You can define it using [`payload`](#payload) function.

#### payload ####

``` typescript
function payload<P>(): Payload<P>
```

`payload` is for creating a `payload` argument of [`action`](#action) function.

``` typescript
const AddNote = action('AddNote', payload<string>());
const addNote = AddNote.create('This is a new note');
console.log(addNote); // { type: 'AddNote', payload: 'This is a new note' }
```

### Action type util functions ###

Functions to define union type (or to do other type-related things).

#### union ####

``` typescript
function union<AC extends ActionCreator<any, any>>(arg: Array<AC>): AC['action'];
```

To define a type for all actions, you need to use this function. This *union type* is useful when you define a reducer without [`subreducer`](#subreducer) and [`reducer`](#reducer) functions.

``` typescript
const NoteActions = union([FixNote, AddNote]);

function reducer(state: State = { notes: [] }, action: NoteActions) {
  switch(action.type) {
  case FixNote.type:
    // ...
  case AddNote.type:
    // ...
  }
}
```

### Reducer util functions ###

Functions for define redux reducer.

#### subreducer ####

``` typescript
function subreducer<S, T extends string>(
  action: ActionCreatorWithoutPayload<T>, handler: SingleActionReducerWithoutPayload<S, T>['handler'],
): SingleActionReducerWithoutPayload<S, T>
function subreducer<S, T extends string, P>(
  action: ActionCreatorWithPayload<T, P>, handler: SingleActionReducerWithPayload<S, T, P>['handler'],
): SingleActionReducerWithPayload<S, T, P>
```

Function to define a reducer for specific action.

``` typescript
const fixNoteReducer = subreducer(FixNote, function (state) {
  return {
    ...state,
  });
});

const addNoteReducer = subreducer(AddNote, function (state, payload) {
  return {
    ...state,
    notes: [...state.notes, payload],
  });
});
```

This subreducer (or `SingleActionReducer`) can be merged using [`reducer`](#reducer) function.

#### reducer ####

``` typescript
function reducer<S, T extends string, P, SR extends SingleActionReducer<S, T, P>>(
  initialState: S,
  subreducers: Array<SR>,
): Reducer<S>
```

Function to define a reducer by merging `SingleActionReducer` cases.

``` typescript
export reducer({ notes: [] }, [fixNoteReducer, addNoteReducer]);
```

Code above is similar with

``` typescript
export function reducer(state = { notes: [] }, action) {
  switch (action.type) {
  case FixNote.type:
    //...
  case AddNote.type:
    //...
  // Code above includes following default case too.
  default:
    return state;
  }
}
```

## Author ##

Junyoung Clare Jang [@Ailrun]

[@Ailrun]: https://github.com/Ailrun
