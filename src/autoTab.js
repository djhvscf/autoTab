 /**
 * autoTab.js
 * @version: v1.4.2
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 *
 * Created by Dennis Hernández on 23/Dic/2014.
 *
 * Copyright (c) 2014 Dennis Hernández http://djhvscf.github.io/Blog
 *	
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

;(function($) {	
	$.autoTab = function(options) {
		var defaults = {autoFocus: false, addStyle: true},
		options = $.extend(defaults, options),
		dataLength = 'data-length',
		dataTab = 'data-tab',
		elements = $.makeArray($('[' + dataTab + ']').not('body')),
		notAllowKeys = [9, 16, 37, 38, 39, 40],
		allowElements = 'input, textarea',
		selectRange = function (el) {
			var nextElement = el,
				start = 0,
				end;
			if (!nextElement) {
				return false;
			}
			if(nextElement.is(allowElements)) {
				end = nextElement.get(0).value.length;
				if (nextElement.setSelectionRange) {
					nextElement.setSelectionRange(start, end);
				} else if (nextElement.createTextRange) {
					var range = nextElement.createTextRange();
					range.moveStart("character", start);
					range.moveEnd("character", end - nextElement.get(0).value.length);
					range.select();
				}
				nextElement.focus();
			}
		},
		eventKeyUp = function (e) {
			if($(this).is('body')) {
				return;
			}
			if (!e) {
				e = window.event;
			}
			var oSelf = this;
			oSelf.maxLength = oSelf.maxLength === -1 ? parseInt($(oSelf).attr(dataLength)) : oSelf.maxLength;
			if (inArray(e.keyCode, notAllowKeys)) {
				if (oSelf.value.length < oSelf.maxLength) {
					return false;		
				}
			} else {
				if (oSelf.value.length < oSelf.maxLength) {
					return false;
				}
				else if (oSelf.value.length === oSelf.maxLength) {
					selectRange(searchNextElement(oSelf));
				}
			}
		},
		inArray = function(obj, array) {
			return $.inArray(obj, array) === -1 ? false : true;
		},
		isNumeric = function(number) {
			return $.isNumeric(number);
		},
		each = function (array, callback) {
			for(var i = 0; i < array.length; i++) {
				callback(i, $(array[i]));
			}
		},
		searchElement = function (index) {
			return  $('[' + dataTab + '="' + index + '"]');
		},
		searchNextElement = function(el) {
			return searchElement(parseInt($(el).attr(dataTab)) + 1);
		},
		error = function(message) {
			$.error(message);
		},
		initStyle = function() {
			var focusStyle = document.createElement('style'),
				inputStyle = document.createElement('style');
			
			inputStyle.type = 'text/css';
			inputStyle.innerHTML = 'input[type=text], textarea ' + 
								'{transition: all 0.30s ease-in-out;' +
								'outline: none;' +
								'padding: 3px 0px 3px 3px;' +
								'margin: 5px 1px 3px 0px;' +
								'border: 1px solid #DDDDDD;';
			focusStyle.type = 'text/css';
			focusStyle.innerHTML = 'input[type=text]:focus, textarea:focus ' +
								'{box-shadow: 0 0 5px rgba(81, 203, 238, 1);' +
								'padding: 3px 0px 3px 3px;' +
								'margin: 5px 1px 3px 0px;' +
								'border: 1px solid rgba(81, 203, 238, 1); }';
			$('html > head').append(inputStyle, focusStyle);
		},
		isValidElement = function(el) {
			if(!el.is(allowElements)) {
				error('The element has to be input or textarea');
			}else if(!isNumeric(el.attr(dataTab))) {
				error('Error. The element has an invalid property. The data-tab is not valid. Element Id = ' + el.get(0).id);
			}else if(!isNumeric(el.attr(dataLength))) {
				error('Error. The element has an invalid property. The data-length is not valid. Element Id = ' + el.get(0).id);
			}
		},
		init = function() {
			each(elements, function(i, el) {
				isValidElement(el);
				el.keyup(eventKeyUp);
				el.attr('maxlength', el.attr(dataLength));
				el.attr('autocomplete','off');
			});
			
			if(options.autoFocus) {
				searchElement(0).focus();
			}
			
			if(options.addStyle) {
				initStyle();
			}
		};
		
		init();
    };
})(jQuery);