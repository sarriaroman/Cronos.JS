// Handle application loading
var header,
	footer,
	container,
	app;

app = {
	init: function() {
		// Prepare app container
		cronos.templates.set(cronos.dom.getFirstByClass('app'), 'app', {
			header: cronos.templates.parse('header'),
			footer: cronos.templates.parse('footer')
		});

		// Get the main parts of the layout
		header = cronos.dom.getFirstByTag('header');
		container = cronos.dom.getById('container');
		footer = cronos.dom.getFirstByTag('footer');

		// Create Routes
		app.routes.create();

		if (window.location.hash == "") {
			cronos.router.go('home');
		}
	},

	content: {
		change: function(template, data) {
			cronos.templates.set(cronos.dom.getById('main-container'), template, data);
		}
	},

	routes: {
		create: function() {
			cronos.router.add('home'/*, some middleware, and_another, ... */, app.routes.home);
		},

		home: function(req) {
			console.info('Routing to home');
			// load home
			app.content.change('home');

			console.info('Calling helper');
			helpers.home();
		}
	}
};

// App Init
app.init();
// End of app