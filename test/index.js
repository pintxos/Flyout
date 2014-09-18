describe('Flyout', function () {

	var $body = $('body'), $target, $trigger, flyout, className, $outside;

	beforeEach(function () {
		$body.find('.flyout, .outside').remove();

		$body.append('<div class="flyout"><a href="#" class="trigger">Trigger</a><div class="target">target</div></div> <a class="outside">outside</a>');

		$trigger = $('.trigger');
		$target = $('.target');
		$outside = $('.outside');

		flyout = new pintxos.Flyout($('.trigger')[0]);

		flyout.init();

		className = flyout.getSettings().css.open;
	});

	it('open/close by click on trigger', function () {

		$trigger.trigger('click');

		expect($trigger.hasClass(className)).toBe(true);
		expect($target.hasClass(className)).toBe(true);

		$trigger.trigger('click');

		expect($trigger.hasClass(className)).toBe(false);
		expect($target.hasClass(className)).toBe(false);

	});

	it('open/close methods', function () {

		flyout.open();

		expect($trigger.hasClass(className)).toBe(true);
		expect($target.hasClass(className)).toBe(true);

		flyout.close();

		expect($trigger.hasClass(className)).toBe(false);
		expect($target.hasClass(className)).toBe(false);
	});

	it('it should remove classes after destroy', function () {
		flyout.open();
		flyout.destroy();

		expect($trigger.hasClass(className)).toBe(false);
		expect($target.hasClass(className)).toBe(false);

	});

	it('should close when a click outside the flyout happens', function () {
		flyout.open();

		$outside.trigger('click');

		expect($trigger.hasClass(className)).toBe(false);
		expect($target.hasClass(className)).toBe(false);

	});

});
