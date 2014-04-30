/**
 * Load resources async
 *
 * Implemented:
 * - Images
 * - Image
 *
 * @memberOf cronos
 */
cronos.resources = {
	/**
	 * Load an image async
	 *
	 * @param  {String}   uri      The url to be loaded
	 * @param  {Function} callback The callback response
	 */
	image: function(uri, callback) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'blob';
		xhr.onload = function() {
			callback(window.webkitURL.createObjectURL(xhr.response));
		};
		xhr.open('GET', uri, true);
		xhr.send();
	},

	/**
	 * Load images async
	 *
	 * @param  {Array} images The string urls
	 * @return {Object}        The Object to follow the progress
	 */
	images: function(images) {
		var count = 0;
		var listeners = {
			'imageload': undefined,
			'done': undefined
		};
		var self = this;

		for (var i = 0; i < images.length; i++) {
			cronos.resources.image(images[i], function(res) {
				if (listeners['imageload'] != undefined) {
					listeners['imageload'].apply(self, [res]);
				}

				count++;
				if (count >= images.length) {
					if (listeners['done'] != undefined) {
						listeners['done'].apply(self, []);
					}
				}
			});
		}

		this.on = function(listener, callback) {
			listeners[listener] = callback;
		};

		return this;
	}
};