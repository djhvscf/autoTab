 /**
 * autoTab.js
 * @version: v1.5.0
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 *
 * Created by Dennis Hernández on 30/Dic/2014.
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

;( function( window ) {
	
	'use strict';

	var dataLength = 'data-length',
		dataTab = 'data-tab',
		notAllowKeys = [9, 16, 37, 38, 39, 40],
		allowElements = ['input', 'textarea'],
		elements = document.querySelectorAll('[' + dataTab + ']');
	
	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	function selectRange(el) {
		var nextElement = el,
			start = 0,
			end;
		if (!nextElement) {
			return false;
		}
		if(is(nextElement)) {
			end = nextElement.value.length;
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
	}
	
	function eventKeyUp(e) {
		if(!is(this)) {
			return;
		}
		if (!e) {
			e = window.event;
		}
		var oSelf = this;
		oSelf.maxLength = oSelf.maxLength === -1 ? parseInt(oSelf.getAttribute(dataLength)) : oSelf.maxLength;
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
	}
	
	function inArray(obj, array) {
		return array.indexOf(obj) === -1 ? false : true;
	}
	
	function isNumeric(number) {
		return !isNaN(parseFloat(number)) && isFinite(number);
	}
	
	function each(array, callback) {
		for(var i = 0; i < array.length; i++) {
			callback(i, array[i]);
		}
	}
	
	function searchElement(index) {
		return  getElement('[' + dataTab + '="' + index + '"]');
	}
	
	function searchNextElement(el) {
		return searchElement(parseInt(el.getAttribute(dataTab)) + 1);
	}
	
	function getElement(tagName) {
		return document.querySelector(tagName);
	}
	
	function is(el) {
		return inArray(el.nodeName.toLowerCase(), allowElements);
	}
	
	function error(message) {
		throw new Error(message);
	}
	
	function initStyle() {
		var focusStyle = document.createElement('style'),
			inputStyle = document.createElement('style'),
			head = document.getElementsByTagName('head')[0];
		
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
		head.appendChild(inputStyle);
		head.appendChild(focusStyle);
	}
	
	function isValidElement(el) {
		if(!is(el)) {
			error('The element has to be input or textarea');
		}else if(!isNumeric(el.getAttribute(dataTab))) {
			error('Error. The element has an invalid property. The data-tab is not valid. Element Id or Tag name = ' + el.id === "" ? el.nodeName : el.id);
		}else if(!isNumeric(el.getAttribute(dataLength))) {
			error('Error. The element has an invalid property. The data-length is not valid. Element Id or Tag name = ' + el.id === "" ? el.nodeName : el.id);
		}
	}
	
	function initEvents(el, evType, fn) {
		if (el.addEventListener) {
			el.addEventListener(evType, fn);
		}
		else if (el.attachEvent) {
			el.attachEvent('on' + evType, fn);
		}
		else {
			el['on' + evType] = fn;
		}
	}
	
	function autoTab( options ) {	
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	autoTab.prototype.options = {
		autoFocus: false, 
		addStyle: true
	}

	autoTab.prototype._init = function() {
		each(elements, function(i, el) {
			isValidElement(el);
			initEvents(el, 'keyup', eventKeyUp);
			el.setAttribute('maxlength', el.getAttribute(dataLength));
			el.setAttribute('autocomplete','off');
		});
		
		if(this.options.autoFocus) {
			searchElement(0).focus();
		}
		
		if(this.options.addStyle) {
			initStyle();
		}
	}
	
	window.autoTab = autoTab;

} )( window );