## ChangeLog

### 2.x.x
* Fixed the issue #6
* Changed the function name of `selectRange` to `selectNextElement`
* Added new option `cleanValuesOnRestart`
* Fixed the issue #9
* Fixed the issue #11

### 2.0.16
* Deleted a variable never used
* Re-define the parameters for `filterInputValue` function
* Added `try catch` block
* Deleted consfused formats
* Code refactor
* Added logic to `restore` function when the plugin is already enabled
* Added some code consistency
* Added `sprintf` function for better replace logic

### 2.0.8
* Added a function that returns all the elements that corresponding with a tag name
* Delete the `addstyle` option
* Added the `deleteExceedCharacter` option
* Added more key codes
* Fixed the issue #2

### 2.0.3
* Added support to input disabled
* Added support for `select` element
* Deleted the `deleteEvents` function because is so heavy for the browsers delete and bind events
* Added support for `button` element

### 2.0.0
* Added `data-upper` tag
* Added `data-lower` tag
* Added `data-nospace` tag
* Added `data-format` tag
* Added `data-pattern` tag
* Changed the Index page
* Added `restore` method
* Added the `enable` variable to know if the plugin is enable or not
* Modified the validation parameters function
* Changed the ReadMe

### 1.6.0
* Deleted the version with jQuery dependency
* Added the destroy method
* Default value of `addStyle` option changed to `false`
* Added the onComplete event
* Added the onChanged event
* Order the functions in logical order
* Function that validates the parameters passed
* Added the recursive option
* Change the parameters section to table
* Added new variable `emptyFunction`

### 1.5.0
* Added the version of autoTab plugin in pure JavaScript

### 1.4.2
* Changed the initialization of style variables
* Deleted a `.append` unnecessary

### 1.4.0
* Added the option `addStyle` to apply or not the default style to inputs and textareas
* Code clean up

### 1.3.3
* Deleted a function never used
* Added the function `isValidElement` to validate if the elements are valid.
* Deleted never used validation

### 1.3.0

* Added the function `each` and `inArray`
* Best management of `maxLength` property
* Making an array with the input elements found
* Added the variables `data-tab` and `data-length` to prevent incorrect words
* Added the function `searchNextElement` to search the next input element

### 1.2.0

* Fixed the auto focus to element with `data-tab="0"`
* Added options. It includes the autofocus option with false as default value
* Added the function `searchElement`

### 1.0.0
* Initial release