/**
 * Router implementation
 *
 * Support:
 * - HTML5
 * - Chrome applications
 *
 * @memberOf cronos
 */
cronos.router = {
	router: new Grapnel.Router(),
	history_stack: [],
	history_current: '',

	/**
	 * Get the current route
	 *
	 * @return {String} Current route
	 */
	current: function() {
		return window.location.hash;
	},

	/**
	 * Check if the same route is the current one.
	 *
	 * @param  {String}  location Location string
	 * @return {Boolean}
	 */
	is: function(location) {
		return (cronos.router.current() == location || cronos.router.current() == ('#' + location));
	},

	/**
	 * Navigate to the specified route
	 *
	 * @param  {String} route   Route to be matched
	 */
	go: function(route, history) {
		if (typeof(window.history) == 'undefined') {
			if (history == undefined || history == true) {
				if (cronos.router.history_current.trim() != '') {
					cronos.router.history_stack.push(cronos.router.history_current);
				}
			}
			cronos.router.history_current = route;
		}

		window.location = '#' + route;
	},

	/**
	 * Back into the stacked route.
	 */
	back: function() {
		if (typeof(window.history) == 'undefined') {
			var hbi = cronos.router.history_stack.pop();
			if (hbi != undefined) {
				cronos.router.go(hbi, false);
			}
		} else {
			window.history.back();
		}
	},

	/**
	 * Adds a new route function to respond on changes
	 *
	 * @param {String}   route    Route
	 * @param {...} callback The desired behaviour ( Remember the req param )
	 */
	add: function(route) {
		var args = arguments;

		// Expose a middleware logic into the router
		var middleware = function(req) {
			var i = 1;

			var callback = function(req) {
				var fn = args[i++];
				if (fn) { fn(req, callback); }
			};

			callback(req);
		};
		cronos.router.router.get(route, middleware);
	}
};