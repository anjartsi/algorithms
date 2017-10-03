let express = require('express');
let app = express();
app.set('port', (process.env.PORT || 5000));
// Use Pug as the template engine
app.set('view engine', 'pug');
app.set('views', './views');

// Use Stylus to make css less annoying
let stylus = require('stylus');
app.use(stylus.middleware('./public/styles'))

// Prepare server for bootstrap/jquery
app.use('/', express.static('./www')); // redirect root
app.use('/js', express.static('./node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static('./node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static('./node_modules/bootstrap/dist/css')); // redirect CSS bootstrap


// Use body-parser to read form data
// This must come before using the router
let bodyParser = require('body-parser');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Use multer to handling multi-part forms (used for uploading files)
let multer = require('multer');
let upload = multer({dest: 'uploads/'});


let nav = [
	  {link: '/', text: 'Home'}
];


// Use the routes file for all routes to minimize the size of this file
// let router = require('./router.js');
// app.use('/', router);
app.get('/', function(req, res) {
	res.render("home.pug" , {
		title: "Algorithm Visualization",
		nav: nav,
		projects: {}
	});
})
// Use the public folder to serve all static files
app.use(express.static('public'));
app.use(express.static('uploads'));

app.listen(app.get('port'), function() {
    console.log("Node app is running at localhost:" + app.get('port'))
});
