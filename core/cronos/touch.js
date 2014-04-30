/**
 * Click and Touch handler unified
 *
 * @memberOf cronos
 */
cronos.touch = {
	/**
	 * The handler to be attached
	 *
	 * @param  {DOMObject}   dom_obj  The object to attach the event
	 * @param  {Function} callback The callback to an event
	 */
	handler: function(dom_obj, callback) {
		Hammer(dom_obj).on('tap', function(e) {
			callback(e);

			e.stopPropagation();
			e.preventDefault();
		});
	}
};