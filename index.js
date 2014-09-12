(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.Flyout = definition();
			define = null;
		};
	}

	define([], function () {


		/* Constructor
		----------------------------------------------- */
		var Flyout = function () {

		};


		/* Methods
		----------------------------------------------- */

		/**
		 * All bootstrap logic should go here
		 * @return {void}
		 */
		Flyout.prototype.init = function () {

		};

		/**
		 * All teardown logic should go here
		 * @return {void}
		 */
		Flyout.prototype.destroy = function () {

		};


		/* Event handlers
		----------------------------------------------- */


		/* Export
		----------------------------------------------- */
		return Flyout;

	});

})(this);
