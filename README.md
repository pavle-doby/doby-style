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

### TODO: Add Options in Doby Style Wizard for displaying file content. 

<br>

#### TODO: Add Command for adding single file in specific folder.

```c
// command
doby-style add <folder-name> <predefined-file> // Will add & import predefined file by doby-style-cli
doby-style add <folder-name> <new-file> // Will add, import & name a new file with predefined convention

// shorthands
doby-style add <first-letter-of-folder> <predefined-file>
doby-style add <first-letter-of-folder> <new-file>

// command examples
doby-style add components badge
doby-style add elements link

// shorthands examples
doby-style add c badge
doby-style add e link
```

#### TODO: Add Command for removing single file from specific folder
```c
// command
doby-style remove <folder-name> <file-name> // Will remove file & imports from your current project structure

// shorthand
doby-style remove <first-letter-of-folder> <file-name> // Will remove file & imports from your current project structure

// command example
doby-style remove components badge

// shorthand example
doby-style remove c badge
```


#### TODO: Add Command for listing all TODOs from files
This command will work for every folder.

```c
doby-style todo // Will show all TODOs from style files.

// Output eg.
[<file-name>] TODO: <message>

[_colors.tokens.scss] TODO: Set up colors from your design system
[_colors.tokens.scss] TODO: If you are changing this colors, also change _colors.utilities.scss

[_colors.utilities.scss] TODO: Add colors from _colors.tokens.scss
...
```

#### TODO: Add Command for saving custom files to doby-style-cli structure

This will alow you to add your custom style and then use it in other projects

```c
// command
doby-style save <folder-name> <filename> // Will take existing file and save it to doby-style-cli structure

// shorthand
doby-style save <first-letter-of-folder> <filename>

// (eg.)
doby-style save components spinner
doby-style save c spinner
```

#### TODO: Add Command for deleting files from doby-style-cli structure

This will alow you to delete style that you never use in other projects.
// Not recommended because you can easily skip them when setting up your project and they may come in handy someday.

```c
// command
doby-style delete <folder-name> <filename> // Will delete existing file from global doby-style-cli structure.

// shorthand
doby-style delete <first-letter-of-folder> <filename>

// (eg.)
doby-style delete components spinner
doby-style delete c spinner
```

#### TODO: Add Command for showing current doby-style-cli structure

```c
// ? - optional flag
doby-style structure ?<folder-name>

// (eg.)
doby-style structure // Will show structure of style folder
doby-style structure components // Will show structure of components folder
```
