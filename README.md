# vanjs-importtag README

This is the VS Code extension for the command that can import tag functions at the current cursor.

## Command Reference

### `VanJS: import tag` (`vanjs-importtag.import`)

Import the tag function at the current cursor. For instance, if the symbol at the current cursor is `span`, this commands will add `span` into tag function importing line. It supports the importing line in this way:

```js
const {a, div, li, p, ul} = van.tags
```

and also in this way:

```js
const {state, tags: {a, div, li, p, ul}} = van
```

All the tag functions in the importing line will be ordered alphabetically.

Note that this command will preserve the existing spacing style for the tag function list. Thus whether your current code file is in a compact style, like this:

```js
const {a, div, li, p, ul} = van.tags
```

or in a normal style, like this:

```js
const { a, div, li, p, ul } = van.tags
```

this command won't change the existing style in the current file.

If your importing line is empty:

```js
const {} = van.tags
```

this command will choose the normal spacing style, as this one is preferred by more people.

You can bind the command with a shortcut of your preference. For instance, the following snippet:

```json
{
    "key": "ctrl+/ t",
    "command": "vanjs-importtag.import"
},
```

will bind the command with shortcut `ctrl+/ t`.