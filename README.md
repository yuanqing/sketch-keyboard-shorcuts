# sketch-keyboard-shortcuts [![npm Version](https://badgen.net/npm/v/sketch-keyboard-shortcuts)](https://www.npmjs.org/package/sketch-keyboard-shortcuts)

> A command-line utility to manage keyboard shortcuts for Sketch

## Quick start

Requires [Node.js](https://nodejs.org/).

```sh
$ npm i -g sketch-keyboard-shortcuts
$ cat shortcuts.json
{
  "Arrange": {
    "Align": {
      "Bottom": "cmd ctrl b",
      "Left": "cmd ctrl l",
      "Right": "cmd ctrl r",
      "Top": "cmd ctrl t"
    }
  },
  "Layer": {
    "Flatten Selection to Bitmap": "cmd shift b"
  }
}
$ sks set shortcuts.json
```

- The path to each menu item is specified via a nested JSON object.
- Each keypress within the shortcut is to be separated by a space.
- Use `cmd`, `ctrl`, `opt`, and `shift` for modifier keys, and `up`, `down`, `left`, and `right` for arrow keys.

## Usage

```sh
$ sks
sks <command>

Commands:
  sks set <file>  Sets keyboard shortcuts as defined in the specified file
  sks unset       Unsets all keyboard shortcuts

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Installation

```sh
$ npm i -g sketch-keyboard-shortcuts
```

## License

[MIT](LICENSE.md)
