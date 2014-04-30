/**
 * Simple storage based on HTML 5 Local Storage
 *
 * Support:
 * - HTML5 Standard
 * - Chrome local storage
 *
 * @memberOf cronos
 */
cronos.storage = {
	/**
	 * Set data async into Storage
	 *
	 * @param {String} key  Data Key
	 * @param {String} data Data value
	 */
	set: function(key, data) {
		var d = Q.defer();

		if (typeof(chrome) != 'undefined' && typeof(chrome.storage) != 'undefined' && typeof(chrome.storage.local) != 'undefined') {
			var dt = {};
			dt[key] = data;

			chrome.storage.local.set(dt, function() {
				d.resolve(true);
			});
		} else {
			setTimeout(function() {
				localStorage.setItem(key, JSON.stringify(data));

				d.resolve(true);
			}, 0);
		}

		return d.promise;
	},

	/**
	 * Gets the data async from the sotrage
	 *
	 * @param  {String} key Data Key
	 * @return {Promise}     Q promise to receive the data
	 */
	get: function(key) {
		var d = Q.defer();

		if (typeof(chrome) != 'undefined' && typeof(chrome.storage) != 'undefined' && typeof(chrome.storage.local) != 'undefined') {
			chrome.storage.local.get(key, function(data) {
				d.resolve(data[key]);
			});
		} else {
			setTimeout(function() {
				d.resolve(JSON.parse(localStorage.getItem(key)));
			}, 0);
		}

		return d.promise;
	},

	/**
	 * Search implementation bases on HTML 5 find
	 *
	 * @param  {String}   key      Data Key
	 * @param  {Function} callback Search function
	 * @return {Promise}            Q promise to receive the data
	 */
	find: function(key, callback) {
		var d = Q.defer();

		cronos.storage.get(key).then(function(data) {
			d.resolve(data.filter(callback));
		});

		return d.promise;
	}
};