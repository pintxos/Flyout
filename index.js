(function (window) {

	'use strict';

	// UMD
	if(typeof define !== 'function') {
		window.define = function(deps, definition) {
			window.pintxos = window.pintxos || {};
			window.pintxos.Flyout = definition(jQuery, pintxos.Component, pintxos.inherit);
			define = null;
		};
	}

	define(
	[
		'jQuery',
		'pintxos-component',
		'pintxos-inherit'
	], function (
		$,
		Component,
		inherit
	) {

		var Flyout, _defaults, _$body;

		/* Default settings
		----------------------------------------------- */
		_defaults = {
			target: undefined,
			closeOnClickOutside: true,
			events: {
				init: 'init.Flyout',
				destroy: 'destroy.Flyout',
				toggleEvent: 'click',
				open: 'open.Flyout',
				close: 'close.Flyout'
			},
			css: {
				open: 'js-open'
			}
		};

		/* Constructor
		----------------------------------------------- */
		Flyout = function (el, options) {
			this._settings = $.extend(true, {}, _defaults, options);
			Component.call(this, el, this._settings);

			this._bodyClickHandlerRef = undefined;
		};

		inherit(Flyout, Component);


		/* Methods
		----------------------------------------------- */

		/**
		 * Bootstrap the component
		 * @return {void}
		 */
		Flyout.prototype.init = function () {
			Flyout._super.init.call(this);

			this._on(this.getTrigger(), this.getSettings().events.toggleEvent, this._onTriggerClick);

			console.log(this._eventData)

			this.close();
		};

		/**
		 * All teardown logic should go here
		 * @return {void}
		 */
		Flyout.prototype.destroy = function () {
			this._$target = undefined;
			Flyout._super.destroy.call(this);
		};

		/**
		 * Open the flyout, trigger event and bind the outside click handler
		 * @return {void}
		 */
		Flyout.prototype.open = function () {

			var activeClass;

			activeClass = this.getSettings().css.open;

			this.getTrigger().addClass(activeClass);
			this.getTarget().addClass(activeClass);

			this._isOpen = true;

			if(this.getSettings().closeOnClickOutside) {
				this._bodyClickHandlerRef = this._on(this.getBody(), 'click', this._onBodyClick);
			}

			this.getEl().trigger(this.getSettings().events.open);
		};

		/**
		 * Close the flyout, trigger event and unbind the outside click handler
		 * @return {void}
		 */
		Flyout.prototype.close = function () {

			var activeClass;

			activeClass = this.getSettings().css.open;

			this.getTrigger().removeClass(activeClass);
			this.getTarget().removeClass(activeClass);

			this._isOpen = false;

			if(typeof this._bodyClickHandlerRef !== 'undefined') {
				this._off(this._bodyClickHandlerRef);
			}


			this.getEl().trigger(this.getSettings().events.close);
		};

		/**
		 * Getter for _isOpen
		 * @return {Boolean}
		 */
		Flyout.prototype.isOpen = function () {
			return this._isOpen;
		};

		/**
		 * Getter for trigger
		 * @return {jQuery}
		 */
		Flyout.prototype.getTrigger = function () {
			return this.getEl();
		};

		/**
		 * Getter for target
		 * @return {jQuery}
		 */
		Flyout.prototype.getTarget = function () {

			var settingsTarget;

			if(typeof this._$target === 'undefined') {

				settingsTarget = this.getSettings().target;

				if(typeof settingsTarget === 'undefined') {
					this._$target = this.getTrigger().next();
				}else{
					this._$target = (typeof settingsTarget === 'string') ? this._query(settingsTarget) : settingsTarget;
				}

			}

			return this._$target;
		};

		/**
		 * Getter for the body element. The body element
		 * is stored in private var as we only need one for all instances
		 * @return {void}
		 */
		Flyout.prototype.getBody = function () {
			if(typeof _$body === 'undefined') {
				_$body = $('body');
			}

			return _$body;
		};


		/* Event handlers
		----------------------------------------------- */

		/**
		 * Handles a click on the trigger element. Toggles te flyouts.
		 * @param  {Event}
		 * @return {void}
		 */
		Flyout.prototype._onTriggerClick = function (e) {
			e.preventDefault();

			if(this.isOpen()) {
				this.close();
			}else{
				this.open();
			}
		};

		/**
		 * Handles a click on the body element.
		 * If the click happend outside the trigger and target elements, it closes the flyout.
		 * @param  {Event}
		 * @return {void}
		 */
		Flyout.prototype._onBodyClick = function (e) {
			var $target;

			$target = $(e.target);

			// Check if the event target equals or is located within the
			// trigger or target element, if not we can close the flyout.
			if($target.closest(this.getTrigger()).length === 0 && $target.closest(this.getTarget()).length === 0) {
				this.close();
			}
		};


		/* Export
		----------------------------------------------- */
		return Flyout;

	});

})(this);
