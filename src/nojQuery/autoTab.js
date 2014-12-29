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

/*
 ;(function($) {	
	$.autoTab = function(options) {
		elements = $.makeArray($('[' + dataTab + ']').not('body')),
		
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
*/

;( function( window ) {
	
	'use strict';

	var dataLength = 'data-length',
		dataTab = 'data-tab',
		notAllowKeys = [9, 16, 37, 38, 39, 40],
		allowElements = 'input, textarea';
		
	var docElem = window.document.documentElement,
		support = { animations : Modernizr.cssanimations },
		animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
	
	/**
	 * extend obj function
	 */
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
	}
	
	function eventKeyUp(e) {
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
	}
	
	function inArray(obj, array) {
		return array.indexOf(obj) === -1 ? false : true;
	}
	
	function isNumeric(number) {
		return !isNaN(parseFloat(number)) && isFinite(number);
	}
	
	function each(array, callback) {
		for(var i = 0; i < array.length; i++) {
			callback(i, $(array[i]));
		}
	}
	
	function searchElement(index) {
		return  $('[' + dataTab + '="' + index + '"]');
	}
	
	function searchNextElement(el) {
		return searchElement(parseInt($(el).attr(dataTab)) + 1);
	}
	
	function error(message) {
		$.error(message);
	}
	
	function initStyle() {
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
	}
	
	function isValidElement(el) {
		if(!el.is(allowElements)) {
			error('The element has to be input or textarea');
		}else if(!isNumeric(el.attr(dataTab))) {
			error('Error. The element has an invalid property. The data-tab is not valid. Element Id = ' + el.get(0).id);
		}else if(!isNumeric(el.attr(dataLength))) {
			error('Error. The element has an invalid property. The data-length is not valid. Element Id = ' + el.get(0).id);
		}
	}

	/**
	 * autoTab function
	 */
	function autoTab( options ) {	
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init();
	}

	/**
	 * autoTab options
	 */
	autoTab.prototype.options = {
		autoFocus: false, 
		addStyle: true
	}

	/**
	 * init function
	 * initialize and cache some vars
	 */
	autoTab.prototype._init = function() {
		// create HTML structure
		this.ntf = document.createElement( 'div' );
		this.ntf.className = 'ns-box ns-' + this.options.layout + ' ns-effect-' + this.options.effect + ' ns-type-' + this.options.type;
		var strinner = '<div class="ns-box-inner">';
		strinner += this.options.message;
		strinner += '</div>';
		strinner += '<span class="ns-close"></span></div>';
		this.ntf.innerHTML = strinner;

		// append to body or the element specified in options.wrapper
		this.options.wrapper.insertBefore( this.ntf, this.options.wrapper.firstChild );

		// dismiss after [options.ttl]ms
		var self = this;
		
		if(this.options.ttl) { // checks to make sure ttl is not set to false in notification initialization
			this.dismissttl = setTimeout( function() {
				if( self.active ) {
					self.dismiss();
				}
			}, this.options.ttl );
		}

		// init events
		this._initEvents();
	}

	/**
	 * init events
	 */
	autoTab.prototype._initEvents = function() {
		var self = this;
		// dismiss notification
		this.ntf.querySelector( '.ns-close' ).addEventListener( 'click', function() { self.dismiss(); } );
	}

	/**
	 * show the notification
	 */
	autoTab.prototype.show = function() {
		this.active = true;
		classie.remove( this.ntf, 'ns-hide' );
		classie.add( this.ntf, 'ns-show' );
		if (typeof this.options.onOpen === 'function')
			this.options.onOpen();
	}

	/**
	 * dismiss the notification
	 */
	autoTab.prototype.dismiss = function() {
		var self = this;
		this.active = false;
		clearTimeout( this.dismissttl );
		classie.remove( this.ntf, 'ns-show' );
		setTimeout( function() {
			classie.add( self.ntf, 'ns-hide' );
			
			// callback
			if (typeof self.options.onClose === 'function')
				self.options.onClose();
		}, 25 );

		// after animation ends remove ntf from the DOM
		var onEndAnimationFn = function( ev ) {
			if( support.animations ) {
				if( ev.target !== self.ntf ) return false;
				this.removeEventListener( animEndEventName, onEndAnimationFn );
			}
			self.options.wrapper.removeChild( this );
		};

		if( support.animations ) {
			this.ntf.addEventListener( animEndEventName, onEndAnimationFn );
		}
		else {
			onEndAnimationFn();
		}
	}

	/**
	 * add to global namespace
	 */
	window.autoTab = autoTab;

} )( window );