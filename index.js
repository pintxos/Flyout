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

		var Flyout, _defaults;

		/* Default settings
		----------------------------------------------- */
		_defaults = {
			target: undefined,
			events: {
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
		};

		inherit(Flyout, Component);


		/* Methods
		----------------------------------------------- */
		Flyout.prototype.init = function () {
			this._superClass.init.call(this);

			this._on(this.getTrigger(), this.getSettings().events.toggleEvent, this._onTriggerClick);

			this.close();
		};

		Flyout.prototype.destroy = function () {
			this._$target = undefined;
			this._superClass.destroy.call(this);
		};

		Flyout.prototype.open = function () {

			var activeClass;

			activeClass = this.getSettings().css.open;

			this.getTrigger().addClass(activeClass);
			this.getTarget().addClass(activeClass);

			this._isOpen = true;

			this.getEl().trigger(this.getSettings().events.open);
		};

		Flyout.prototype.close = function () {

			var activeClass;

			activeClass = this.getSettings().css.open;

			this.getTrigger().removeClass(activeClass);
			this.getTarget().removeClass(activeClass);

			this._isOpen = false;

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


		/* Event handlers
		----------------------------------------------- */
		Flyout.prototype._onTriggerClick = function (e) {
			e.preventDefault();

			if(this.isOpen()) {
				this.close();
			}else{
				this.open();
			}
		};


		/* Export
		----------------------------------------------- */
		return Flyout;

	});

})(this);
