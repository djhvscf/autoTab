# autoTab [![Build Status](https://travis-ci.org/djhvscf/autoTab.svg?branch=master)](https://travis-ci.org/djhvscf/autoTab)
A plugin that allows the auto tab between inputs and text areas. It is beautiful and lightweight plugin. No jQuery.

Author Homepage:      http://djhvscf.github.io/Blog/<br />

## Current version
* v1.5.0 `30/Dic/2014`

## Bugs & Enhancements (next version)
* [ ] Include others DOM elements
* [X] Include onComplete event
* [X] Include onChange event
* [X] Code documentation
* [X] Add destroy method
* [X] Not jQuery, pure JavaScript
* [X] Delete the version of autoTab with jQuery dependency
* [X] Order the functions in logical order
* [X] Validate parameters

## Release history
* v1.5.0 `30/Dic/2014`
* v1.4.2 `29/Dic/2014`
* v1.4.0 `28/Dic/2014`
* v1.3.0 `24/Dic/2014`
* v1.2.0 `24/Dic/2014`
* v1.0.0 `23/Dic/2014`

## Dependencies
* In this moment this plugin doesn't have dependencies

## How to Use
Define the property `data-tab` in the input element setting a number between 0 to N like `data-tab="0"` and declare `data-length` in the input element setting a number between 1 to N like `data-length="1"`
this property will be the `maxlength` property in each input element and it helps to plugin knows when change the focus.

**Syntax Example**  
```html
<script src="autoTab.min.js"></script>

<input name="first" id="first" type="text" data-tab="0" data-length="2">
<input name="second" id="second" type="text" data-tab="1" data-length="2">
```
```javascript
(function() {
	// Calling the plugin
	var autoTab = new autoTab();
})();
```

**Parameters**   
* `autoFocus`: If you want that the element with `data-tab="0"` has the focus
* `addStyle`: If you want to apply the default style of inputs and textareas, you have to set `true`
* `onComplete`: If you want to call a function when all the inputs are already "tab-ed", you have to pass the callback function in this parameter

**Methods**
* `destroy`: If you call this method the plugin will be delete and all the styles and events associated with it.

**Demo:** [http://djhvscf.github.io/Blog/experiments/2014/12/autoTab.html](http://djhvscf.github.io/Blog/experiments/2014/12/autoTab.html)

## Reporting issues
Your feedback is very appreciated! <br />
Use this page to report issues (https://github.com/djhvscf/autoTab/issues)