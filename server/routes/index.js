let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
//router.get('/', indexController.displayHome);

/* GET about page. */
//router.get('/about', indexController.displayAbout);

/* GET services page. */
//router.get('/services', indexController.displayServices);

/* GET products page. */
//router.get('/products', indexController.displayProducts);

/* GET contact page. */
//router.get('/contact', indexController.displayContact);

// GET - displays the Login Page
//router.get('/login', indexController.displayLogin);

// POST - processes the Login Page
router.post('/login', indexController.processLogin);

// GET - displays the User Registration Page
//router.get('/register', indexController.displayRegister);

// POST - processes the User Registration Page
router.post('/register', indexController.processRegister);

// GET - perform user logout
router.get('/logout', indexController.performLogout);

module.exports = router;