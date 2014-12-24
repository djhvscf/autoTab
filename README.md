# autoTab [![Build Status](https://travis-ci.org/djhvscf/autoTab.svg?branch=master)](https://travis-ci.org/djhvscf/autoTab)
A jQuery plugin that allows the auto tab between inputs and text areas. It is beautiful and lightweight plugin.

Author Homepage:      http://djhvscf.github.io/Blog/<br />

## Current version
* v1.3.0 `24/Dic/2014`

## Bugs & Enhancements (next version)
* Include buttons and others DOM elements

## Release history
* v1.3.0 `24/Dic/2014`
* v1.2.0 `24/Dic/2014`
* v1.0.0 `23/Dic/2014`

## Dependencies
This plugin has these dependencies

* >=jquery-1.8.x.js

## How to Use
Define the property `data-tab` in the input element setting a number between 0 to N like `data-tab="0"` and declare `data-length` in the input element setting a number between 1 to N like `data-length="1"`
this property will be the `maxlength` property in each input element and it helps to plugin knows when change the focus.

**Syntax Example**  
```html
<script src="jQuery.min.js"></script>  
<script src="autoTab.min.js"></script>

<input name="first" id="first" type="text" data-tab="0" data-length="2">
<input name="second" id="second" type="text" data-tab="1" data-length="2">
```
```javascript
$(function() {
  // Calling the plugin
  $.autoTab();
});
```

**Parameters**   
* autoFocus: If you want that the element with `data-tab="0"` has the focus

**Demo:** [http://djhvscf.github.io/Blog/experiments/2014/12/autoTab.html](http://djhvscf.github.io/Blog/experiments/2014/12/autoTab.html)

## Reporting issues
Your feedback is very appreciated! <br />
Use this page to report issues (https://github.com/djhvscf/autoTab/issues)