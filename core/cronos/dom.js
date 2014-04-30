/**
 * The DOM Management class
 *
 * - The footprint here is very small
 * - Done by KISS
 * - If something is not here just do the implementation in your code
 * - You won't ever need more strange things.
 * - More things less speed.
 *
 * @memberOf cronos
 */
cronos.dom = {
	/**
	 * Get an element by the ID
	 *
	 * @param  {String} id The element ID
	 * @return {DOMObject}
	 */
	getById: function(id) {
		return document.getElementById(id);
	},

	/**
	 * Get all the elements by the class
	 *
	 * @param  {String} classname The class name
	 * @return {DOMObject}
	 */
	getByClass: function(classname) {
		return document.getElementsByClassName(classname);
	},

	/**
	 * Get the first matched element by the class
	 *
	 * @param  {String} classname The class name element.
	 * @return {DOMObject}
	 */
	getFirstByClass: function(classname) {
		return (document.getElementsByClassName(classname)[0]);
	},

	/**
	 * Search an element into the DOM
	 *
	 * - Please avoid to use this function, will reduce the speed of the app.
	 *
	 * @param  {String} query The query
	 * @return {DOMObject}
	 */
	search: function(query) {
		return document.querySelectorAll(query);
	},

	/**
	 * Get an element by the tag
	 *
	 * @param  {String} tagname The tag name
	 * @return {DOMObject}
	 */
	getByTag: function(tagname) {
		return document.getElementsByTagName(tagname);
	},

	/**
	 * Get the first matched element by the tag
	 *
	 * @param  {String} tagname The tag name
	 * @return {DOMObject}
	 */
	getFirstByTag: function(tagname) {
		return (document.getElementsByTagName(tagname)[0]);
	},

	/**
	 * Style methods
	 *
	 * @memberOf cronos.dom
	 */
	style: {
		/**
		 * Show an element in the dom
		 *
		 * @param  {DOMObject} dobj The object to show
		 */
		show: function(dobj) {
			dobj.style.display = '';
		},

		/**
		 * Hide an element in the dom
		 *
		 * @param  {DOMObject} dobj The object to hide
		 */
		hide: function(dobj) {
			dobj.style.display = 'none';
		}
	}
};