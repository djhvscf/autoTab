 /**
 * autoTab.js
 * @version: v1.0.0
 * @author: Dennis Hernández
 * @webSite: http://djhvscf.github.io/Blog
 *
 * Created by Dennis Hernández on 30/Dic/2014.
 *
 * Copyright (c) 2017 Dennis Hernández http://djhvscf.github.io/Blog
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

	var dataOrder = 'data-order',
	dataTab = '[data-tab="true"]',
	dataLength = 'data-length',
	dataUpperCase = 'data-upper',
	dataLowerCase = 'data-lower',
	dataNoSpace = 'data-nospace',
	dataFormat = 'data-format',
	dataPattern = 'data-pattern',
	dataOrderStr = '[data-order="%s"]',
	enable = true,
	specialKeys = [ 
		9, 
		16, 
		35, 
		36, 
		37, 
		38, 
		39, 
		40 
	],
	allowElements = [ 
		'input', 
		'textarea', 
		'select', 
		'button' 
	],
	elements = getElements( dataTab ),
	totalElements = 1,
	emptyFunction = function() { },
	regExpressions = { 
		text: '[0-9]+',
		alpha: '[^a-zA-Z]+',
		alphanumeric: '[^0-9a-zA-Z]+',
		numeric: '[^0-9]+',
		hexadecimal: '[^0-9A-Fa-f]+'
	};
	
	/**
	 * Replace characters in the string passed by parameter
	 * @param {String} str
	 * @return {String} str
	 */
    function sprintf( str ) {
        var args = arguments,
            flag = true,
            i = 1;

        str = str.replace( /%s/g, function () {
            var arg = args[ i++ ];

            if ( typeof arg === 'undefined' ) {
                flag = false;
                return '';
            }
            return arg;
        });
        return flag ? str : '';
    }
	
	/**
	 * Extends the properties between two objects
	 * @param {Object} a 
	 * @param {Object} b
	 * @return {Object} extended
	 */
	function extend( a, b ) {
		for ( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[ key ] = b[ key ];
			}
		}
		return a;
	}
	
	/**
	 * Searches the object in the array passed by parameter
	 * @param {Object} obj 
	 * @param {Array} array
	 * @return {Boolean} True if the object exists in the array, otherwise, false
	 */
	function inArray( obj, array ) {
		return array.indexOf( obj ) === -1 ? false : true;
	}
	
	/**
	 * Checks if the parameter is a correct number
	 * @param {Object} number
	 * @return {Boolean} True if the object is a correct number, otherwise, false
	 */
	function isNumeric( number ) {
		return !isNaN( parseFloat( number ) ) && isFinite( number );
	}
	
	/**
	 * For each item in the array passed by parameter, it will call the callback function passed by parameter too
	 * @param {Array} array
	 * @param {Function} callback 
	 */
	function each( array, callback ) {
		for (var i = 0; i < array.length; i++ ) {
			callback( array[ i ] );
		}
	}
	
	/**
	 * Searches element with data-tab tag
	 * @param {Number} index
	 * @return {DOM Element} Element found
	 */
	function searchElement( index ) {
		var el = getElement( sprintf( dataOrderStr, index ) );
		if ( el !== null && el.getAttribute( 'disabled' ) === 'disabled' ) {
			return searchNextElement( el );
		}
		return el;
	}
	
	/**
	 * Searches the next element where the focus should be
	 * @param {DOM Element} el
	 * @return {DOM Element} Element found
	 */
	function searchNextElement( el ) {
		return searchElement( parseInt( el.getAttribute( dataOrder ) ) + 1 );
	}
	
	/**
	 * Searches an element in the DOM
	 * @param {String} tagName
	 * @return {DOM Element} Element found
	 */
	function getElement( tagName ) {
		return document.querySelector( tagName );
	}
	
	/**
	 * Searches all the elements in the DOM that corresponding with the tag name passed by parameter
	 * @param {String} tagName
	 * @return {DOM Elements} An array of elements found
	 */
	function getElements( tagName ) {
		return document.querySelectorAll( tagName );
	}
	
	/**
	 * Validates if the element passed by parameter is valid 
	 * @param {DOM Element} el
	 * @return {Boolean} True if the DOM element is correct, otherwise, false
	 */
	function is( el ) {
		return inArray( el.nodeName.toLowerCase(), allowElements );
	}
	
	/**
	 * Raises an error
	 * @param {String} message 
	 */
	function error( message ) {
		throw new Error( message === '' ? 'An error has been raised' : message );
	}
	
	/**
	 * Validates if the DOM element passed by parameter is valid
	 * @param {DOM Element} el
	 */
	function isValidElement( el ) {
		if ( !is( el ) ) {
			error( 'The element has to be input or textarea or select' );
		} else if ( !isNumeric( el.getAttribute( dataOrder ) ) ) {
			error( 'Error. The element has an invalid property. The data-tab is not valid. Element Id or Tag name = ' + el.id === "" ? el.nodeName : el.id );
		}
		if ( el.nodeName.toLowerCase() !== 'select' && el.nodeName.toLowerCase() !== 'button' ) {
			if ( !isNumeric( el.getAttribute( dataLength ) ) ) {
				error( 'Error. The element has an invalid property. The data-length is not valid. Element Id or Tag name = ' + el.id === "" ? el.nodeName : el.id );
			}
		}
	}

	function setTabIndexAttr ( el ) {
		el.setAttribute( 'tabindex', el.getAttribute( dataOrder ) );
	}
		
	/**
	 * Validates if the parameters passed are correct
	 * @param {Object} params
	 */
	function isValidParameters( params ) {
		var errorMessage = '';
		if ( typeof params.autoFocus !== 'boolean' && typeof params.autoFocus !== 'undefined' && typeof params.autoFocus !== 'number' ) {
			errorMessage = 'Error. You must pass a boolean in the autofocus parameter';
		}
		
		if ( typeof params.recursive !== 'boolean' && typeof params.recursive !== 'undefined' ) {
			errorMessage = 'Error. You must pass a boolean in the recursive parameter';
		}
		
		if ( typeof params.onComplete !== 'function' && typeof params.onComplete !== 'undefined' ) {
			errorMessage = 'Error. You must pass a function in the onComplete parameter';
		}
		
		if ( typeof params.onChanged !== 'function' && typeof params.onChanged !== 'undefined' ) {
			errorMessage = 'Error. You must pass a boolean in the onChanged parameter';
		}
		
		if(errorMessage !== '') {
			error( errorMessage );
		}
	}
	
	/**
	 * Initializes the events for each element
	 * @param {DOM Element} el
	 * @param {String} evType
	 * @param {Function} callback
	 */
	function initEvents( el, evType, callback ) {
		if ( el.addEventListener ) {
			el.addEventListener( evType, callback );
		} else if ( el.attachEvent ) {
			el.attachEvent( 'on' + evType, callback );
		} else {
			el[ 'on' + evType ] = callback;
		}
	}
	
	/**
	 * Deletes a specific attribute of the element passed by parameter
	 * @param {DOM Element} el
	 * @param {String} tagName
	 */
	function deleteAttribute( el, tagName ) {
		el.removeAttribute( tagName );
	}
	
	/**
	 * Selects the range of the element pass by parameter
	 * @param {DOM Element} el
	 */
	function selectNextElement( el ) {
		var nextElement = el,
			start,
			end;
		totalElements++;
		if ( !nextElement ) {
			// FIx #6 Improve the complete function and add new option "if autoTab is completed, start again or finish"
			if ( totalElements === elements.length  ) {
				window.autoTab.options.onComplete.call();
				if ( window.autoTab.options.recursive ) {
					focus( { autoFocus: window.autoTab.options.autoFocus } );
				}
			}
			return;
		}
		if ( is( nextElement ) ) {
			start = end = nextElement.value.length;
			if ( nextElement.setSelectionRange ) {
				nextElement.setSelectionRange( start, end );
			} else if ( nextElement.createTextRange ) {
				var range = nextElement.createTextRange();
				range.moveStart( 'character', start );
				range.moveEnd( 'character', end );
				range.select();
			}
			focus( { element: nextElement } );
		}
	}
	
	/**
	 * Takes the Key Up event
	 * @param {Event} e
	 */
	function eventKeyUp( e ) {
		if ( !enable ) { 
			return;
		}
		if ( !is( this ) ) {
			return;
		}
		if  ( !e ) {
			e = window.event;
		}		
		// Fix #2 Can't select the text in input
		if ( inArray( e.keyCode, specialKeys ) ) {
			return false;
		}

		var oSelf = this;
		oSelf.maxLength = oSelf.maxLength === -1 ? parseInt( oSelf.getAttribute( dataLength ) ) : oSelf.maxLength;
		oSelf.value = filterInputValue( oSelf );
		// Fix #11 Call the onChanged function after value change function
		window.autoTab.options.onChanged.call( oSelf, e );
		if ( oSelf.value.length < oSelf.maxLength ) {
			return false;
		}
		else if ( oSelf.value.length === oSelf.maxLength ) {
			selectNextElement( searchNextElement( oSelf ) );
		} else {
			// Fix #1 When the DOM elements have more characters than the max length allowed
			if( window.autoTab.options.deleteExceedCharacter ) {
				oSelf.value = oSelf.value.substring( 0, oSelf.maxLength );
			}
			selectNextElement( searchNextElement( oSelf ) );
		}
	}
	
	/**
	 * Takes the change event of select element
	 * @param {Event} e
	 */
	function eventChange( e ) {
		eventDefault( e, this );
	}
	
	/**
	 * Takes the click event of button element
	 * @param {Event} e
	 */
	function eventClick( e ) {
		eventDefault( e, this );
	}
	
	/**
	 * Takes the click event of button element and the change event of select element
	 * @param {Event} e
	 * @param {DOM Element} oSelf
	 */
	function eventDefault( e, oSelf ) {
		if ( !enable ) { 
			return;
		}
		if ( !is( oSelf ) ) {
			return;
		}
		if  ( !e ) {
			e = window.event;
		}
		window.autoTab.options.onChanged.call( oSelf, e );
		selectNextElement( searchNextElement( oSelf ) );
	}
	
	/**
	 * Modified the input value to the correct format or pattern
	 * @param {DOM Element} oSelf
	 */
	function filterInputValue( oSelf ) {
		var patternHelper = null,
			inputValue = oSelf.value,
			format = oSelf.getAttribute( dataFormat );
		
		if ( format !== null ) {
			inputValue = inputValue.replace( new RegExp( format === 'custom' ? oSelf.getAttribute( dataPattern ) : regExpressions[ format ], 'g' ), '' );
		}
		// Fix #9 Convert data-upper, data-lower, data-nospace to boolean
        if ( oSelf.getAttribute( dataNoSpace ) !== null && oSelf.getAttribute( dataNoSpace ).toLowerCase() === "true" ) {
            inputValue = inputValue.replace( new RegExp( '[ ]+', 'g' ), '' );
        }

        if ( oSelf.getAttribute( dataUpperCase ) !== null && oSelf.getAttribute( dataUpperCase ).toLowerCase() === "true" ) {
            inputValue = inputValue.toUpperCase();
        }

        if ( oSelf.getAttribute( dataLowerCase ) !== null && oSelf.getAttribute( dataLowerCase ).toLowerCase() === "true" ) {
            inputValue = inputValue.toLowerCase();
        }
		
		return inputValue;
	}
	
	/**
	 * Cleans the values of the items bound
	 */
	function cleanValues() {
		each ( elements, function( el ) {
			switch ( el.nodeName.toLowerCase() ) {
				case 'input':
				case 'textarea':
					el.value = "";
				break;
				case 'select':
					el.selectedIndex = -1;
				break;
			}
		} );
	}
	
	/**
	 * Sets the focus on the element passed by parameter
	 * @param {Object} params
	 */
	function focus( params ) {
		if ( params.element !== undefined && params.element !== null ) {
			params.element.focus();
			return;
		} else {
			if ( params.autoFocus !== false ) {
				searchElement ( params.autoFocus === true ? 0 : params.autoFocus ).focus();
			}
		}
	}
	
	/**
	 * autoTab class
	 * @param {Object} options
	 */
	function autoTab( options ) {
		isValidParameters( options );
		this.options = extend( {}, this.options );
		extend( this.options, options );
		this._init( false );
	}

	/**
	 * Options
	 */
	autoTab.prototype.options = {
		autoFocus: false,
		recursive: false,
		onComplete: emptyFunction,
		onChanged: emptyFunction,
		deleteExceedCharacter: false,
		cleanValuesOnRestart: false
	}
	
	/**
	 * Initializes the plugin
	 */
	autoTab.prototype._init = function( isRestore ) {
		try {
			totalElements = 1;
			each ( elements, function( el ) {
				isValidElement( el );
				setTabIndexAttr( el );
				switch ( el.nodeName.toLowerCase() ) {
					case 'input':
					case 'textarea':
						if( !isRestore ) {
							initEvents( el, 'keyup', eventKeyUp );
						}
						el.setAttribute( 'maxlength', el.getAttribute( dataLength ) );
						el.setAttribute( 'autocomplete','off' );
					break;
					case 'select':
						if( !isRestore ) {
							initEvents( el, 'change', eventChange );
						}
					break;
					case 'button':
						if( !isRestore ) {
							initEvents( el, 'click', eventClick );
						}
					break;
				}
			} );
			
			focus( { 
				autoFocus: this.options.autoFocus 
			} );
			
		} catch ( ex ) {
			error( ex );
		}
	}

	/**
	 * Destroys the plugin
	 */
	autoTab.prototype.destroy = function() {
		each ( elements, function( el ) {
			deleteAttribute( el, 'maxlength' );
			deleteAttribute( el, 'autocomplete' );
		} );
		
		enable = false;
	}
	
	/**
	 * Restores the plugin
	 */
	autoTab.prototype.restore = function() { 
		if ( !enable ) {
			enable = true;
			this._init( true );
			if ( this.options.cleanValuesOnRestart ) {
				cleanValues();
			}
		} else {
			focus( { autoFocus: this.options.autoFocus } );
		}
	}
	
	/**
	 * Adds the plugin to namespace
	 */
	window.autoTab = autoTab;

} )( window );