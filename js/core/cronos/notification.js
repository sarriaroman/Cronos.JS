/**
 * Notifications namespace
 *
 * - Work in progress
 *
 * @memberOf cronos
 */
cronos.notification = {
	/**
	 * Wrapped alert
	 *
	 * Support:
	 * - HTML standard
	 * - Chrome notifications
	 *
	 * @param  {String} message The message
	 * @param  {String} title   The title
	 */
	alert: function(message, title) {
		if (title == undefined) {
			title = '';
		}

		if (typeof(chrome.notifications) != 'undefined') {
			chrome.notifications.create("cronos_" + (new Date()).getTime(), {
				type: "basic",
				iconUrl: 'images/icon128.png',
				title: title,
				message: message
			}, function(notificationId) {});
		} else {
			alert(message);
		}
	}
};