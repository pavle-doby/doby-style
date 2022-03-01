# doby-style-cli ✨

CLI Wizard for SCSS style structure.

```
SCSS style structure in less than 10 seconds with all utils you need.
```

## Installation

```bash
npm install -g doby-style-cli
# or
yarn global add doby-style-cli
```

## Usage

0. Open terminal <br>
1. Navigate yourself to folder where you want to generate _style_ folder <br>
2. Run one of this <br>

```bash
doby-style-cli
doby-style
ds-cli
ds
```

3. Choose what you want to include in your project.

## Style folder structure

```
style
├── elements
|  ├── _button.elements.scss
|  ├── _core.elements.scss
|  └── _elements.scss
├── functions
|  ├── _breakpoints.functions.scss
|  ├── _functions.scss
|  ├── _rtl.functions.scss
|  ├── _split.functions.scss
|  ├── _strip-unit.functions.scss
|  ├── _transition.functions.scss
|  └── _z-index.functions.scss
├── generic
|  ├── _generic.scss
|  ├── _normalize.generic.scss
|  └── _typography.generic.scss
├── shared
|  ├── _containers.shared.scss
|  ├── _heading.shared.scss
|  ├── _hide.shared.scss
|  ├── _reset.shared.scss
|  └── _shared.scss
├── tokens
|  ├── _colors.tokens.scss
|  ├── _containers.tokens.scss
|  ├── _spacings.tokens.scss
|  ├── _text-direction.tokens.scss
|  ├── _tokens.scss
|  └── _typography.tokens.scss
├── tools
|  ├── _font-size.tools.scss
|  ├── _size.tools.scss
|  ├── _spacing.tools.scss
|  └── _tools.scss
├── utilities
|  ├── _colors.utilities.scss
|  ├── _cursor.utilities.scss
|  ├── _display.utilities.scss
|  ├── _flex.utilities.scss
|  ├── _size.utilities.scss
|  ├── _utilities.scss
|  └── _wip.utilities.scss
├── _global.scss
└── index.scss
```

## Future Improvements

##### TODO: Add Command for adding single file in specific folder.

```c
// command
doby-style --<folder-name> <predefined-file> // Will add & import predefined file by doby-style-cli
doby-style --<folder-name> <new-file> // Will add, import & name a new file with predefined convention

// shorthands
doby-style -<first-letter-of-folder> <predefined-file>
doby-style -<first-letter-of-folder> <new-file>

// command examples
doby-style --components badge
doby-style --components spinner
doby-style --elements button
doby-style --elements link

// shorthands examples
doby-style -c badge
doby-style -c spinner
doby-style -e button
doby-style -e link

```

This command will work for every folder.

#### TODO: Add Command for listing all TODOs from files

```c
doby-style --todo // Will show all TODOs from style files.

// (eg.)
[<file-name>] TODO: <message>

[_colors.tokens.scss] TODO: Set up colors from your design system
[_colors.tokens.scss] TODO: If you are changing this colors, also change _colors.utilities.scss

[_colors.utilities.scss] TODO: Add colors from _colors.tokens.scss
...

```

#### TODO: Add Command for adding/deleting custom files to doby-style-cli structure

This will alow you to add your custom style and then use it in other projects

```c
// command
doby-style add --<folder-name> <filename> // Will take existing file and add/delete it to/from doby-style-cli structure
// shorthand
doby-style add --<first-letter-of-folder> <filename>

// (eg.)
doby-style add --components spinner
doby-style add --c spinner
```

#### TODO: Add Command for showing current doby-style-cli structure

```c
// ? - optional flag
doby-style structure ?--<folder-name>

// (eg.)
doby-style structure // Will show structure of style folder
doby-style structure --components // Will show structure of components folder
```
