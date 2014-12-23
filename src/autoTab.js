 /**
 * autoTab.js
 * @version: v1.0.0
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
	$.autoTab = function() {
		var elements = $('[data-tab]').not('body'),
		elementHelper = null,
        notAllowKeys = [9, 16, 37, 38, 39, 40],
		imposeMaxLength = function (textArea) {
			if (textArea.value.length <=  parseInt($(textArea).attr('data-length'))) {
				textArea.value = textArea.value.substr(0, parseInt($(textArea).attr('data-length')));
				return true;
			}
			else {
				return false;
			}
		},
		selectRange = function (el) {
			var nextElement = $('[data-tab="' + el + '"]'),
				start = 0,
				end;
			if (!nextElement) {
				return false;
			}			
			if(nextElement.is('input, textarea')) {
				end = nextElement.get(0).value.length;
				if (nextElement.setSelectionRange) {
					nextElement.setSelectionRange(start, end);
				} else if (nextElement.createTextRange) {
					var range = nextElement.createTextRange();
					range.moveStart("character", start);
					range.moveEnd("character", end - nextElement.value.length);
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
			if (!$.inArray(e.keyCode, notAllowKeys)) {
				if (oSelf.value.length < oSelf.maxLength) {
					return false;		
				}
			} else {
				if (oSelf.value.length < parseInt($(oSelf).attr('data-length'))) {
					return false;
				}
				else if (oSelf.value.length === parseInt($(oSelf).attr('data-length'))) {
					selectRange(parseInt($(oSelf).attr('data-tab')) + 1);
				}
			}
		};
		
		for(var i = 0; i < elements.length; i++) {
			elementHelper = $(elements[i]);
			elementHelper.keyup(eventKeyUp);
			if(elementHelper.is('input')) {
				elementHelper.attr('maxlength', elementHelper.attr('data-length'));
				elementHelper.attr('autocomplete','off');
			}
		}
		elements[0].focus();
    };
})(jQuery);