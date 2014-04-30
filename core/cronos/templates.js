/**
 * Templates namespace.
 *
 * Utilities to work with templates.
 *
 * @memberOf cronos
 */
cronos.templates = {
	/**
	 * Get the template from compiled DOM
	 *
	 * @param  {String} template Template Name
	 * @return {DOMObject}
	 */
	get: function(template) {
		var dobj = document.getElementById('template_' + template);
		if (dobj) {
			return dobj.innerHTML;
		} else {
			console.error('Your template not exist. Please don\'t let me work as an...');
		}
	},

	/**
	 * Parse the template with the specified data
	 *
	 * @param  {String} template Template name
	 * @param  {Object} data     Data Object
	 * @return {DOMObject}          Template with the data
	 */
	parse: function(template, data) {
		if (data == undefined) {
			data = {};
		}
		return Ashe.parse(cronos.templates.get(template), data);
	},

	/**
	 * Parse the template and set it into the specified DOM Object
	 *
	 * @param {DOMObject} dobj     The DOM Object to fill
	 * @param {String} template Template Name
	 * @param {Object} data     Data to be filled
	 */
	set: function(dobj, template, data) {
		dobj.innerHTML = cronos.templates.parse(template, data);
	}
};