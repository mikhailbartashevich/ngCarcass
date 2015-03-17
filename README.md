# ngCarcass
An Angular.js + Require.js application scaffold with Start Bootstrap templates.
Supports FireBase backend service, Facebook, Twitter and Google authorization.

Instructions to run the sample code
-----------------------------------

Current application uses Angular.js, Require.js, Node.js, Bower, Grunt, LESS, Start Bootstrap and AdminLTE templates, so you need to 

	- install Node.js (http://nodejs.org/)
	- install Bower (http://bower.io/)
	- install Grunt (http://gruntjs.com/)

Following major grunt tasks are used:

	- html2js to compile all the angular templates in a single js file to cache it
	- requirejs to organize js files and compile them in prod mode
	- less to compile less files
	- connect with livereload to be able to use requirejs and proxy servers
	- watch to compile all the dev changes at runtime
	- karma to run jasmine tests

Then run following commands:

	- npm install
	- bower install
	- change app/scripts/config.js file, use 'firebase-client-auth' key, use your firebase keys
	- grunt dev (Development mode)

To run app in production mode please change links in index.html to its production versions and run

	- grunt prod (Production mode)

To run tests (karma + jasmine)

	- grunt test

To run protractor (http://angular.github.io/protractor/)

	- npm install -g protractor
	- webdriver-manager update
	- webdriver-manager start
	- grunt dev
	- protractor app/e2e-tests/protractor.conf.js

To use FireBase backend auth service (https://www.firebase.com/)
	
	- change app/scripts/config.js file, use 'firebase-backend-auth' key, use your firebase keys
	- change server/config.js file, use your firebase keys
	- npm install firebase express body-parser request querystring
	- node server/app

Here is the code styling recommendations to pass jscs grunt task:

	https://github.com/mgechev/angularjs-style-guide



