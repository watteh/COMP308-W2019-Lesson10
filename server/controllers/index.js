let express = require('express');
let router = express.Router();
let passport = require('passport');
let mongoose = require('mongoose');

let jwt = require('jsonwebtoken');
let DB = require('../config/db');

// define the user model
let userModel = require('../models/user');
let User = userModel.User; //alias

// module.exports.displayHome = (req, res, next) => {
//     res.render('index', {
//         title: 'Home',
//         displayName: req.user ? req.user.displayName : ''
//     });
// }

// module.exports.displayAbout = (req, res, next) => {
//     res.render('index', {
//         title: 'About',
//         displayName: req.user ? req.user.displayName : ''
//     });
// }

// module.exports.displayServices = (req, res, next) => {
//     res.render('index', {
//         title: 'Services',
//         displayName: req.user ? req.user.displayName : ''
//     });
// }

// module.exports.displayProducts = (req, res, next) => {
//     res.render('index', {
//         title: 'Products',
//         displayName: req.user ? req.user.displayName : ''
//     });
// }

// module.exports.displayContact = (req, res, next) => {
//     res.render('index', {
//         title: 'Contact',
//         displayName: req.user ? req.user.displayName : ''
//     });
// }

// module.exports.displayLogin = (req, res, next) => {
//     // Check if user is already logged in
//     if (!req.user) {
//         res.render('auth/login', {
//             title: 'Login',
//             messages: req.flash('loginMessage'),
//             displayName: req.user ? req.user.displayName : ''
//         });
//     } else {
//         return res.redirect('/');
//     }
// }

module.exports.processLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.json({
                success: false,
                msg: 'Error: login failed.'
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            const payload = {
                id: user._id,
                displayName: user.displayName,
                username: user.username,
                email: user.email
            }

            const authToken = jwt.sign(payload, DB.secret, {
                expiresIn: 604800 // 1 week
            });

            return res.json({
                success: true,
                msg: 'User login successful!',
                user: {
                    id: user._id,
                    displayName: user.displayName,
                    username: user.username,
                    email: user.email
                },
                token: authToken
            });
        });
    })(req, res, next);
}

// module.exports.displayRegister = (req, res, next) => {
//     if (!req.user) {
//         res.render('auth/register', {
//             title: 'Register',
//             messages: req.flash('registerMessage'),
//             displayName: req.user ? req.user.displayName : ''
//         });
//     } else {
//         return res.redirect('/');
//     }
// }

module.exports.processRegister = (req, res, next) => {
    // define a new User object
    let newUser = new User({
        username: req.body.username,
        // password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(
        newUser,
        req.body.password,
        (err) => {
            if (err) {
                console.log('Error: Inserting new user');
                if (err.name == "UserExistsError") {
                    console.log('Error: Inserting new user');
                }
                return res.json({
                    success: false,
                    msg: 'Error: registration failed.'
                });
            } else {
                // if no error exists, then registration is successful
                // redirect the user
                return res.json({
                    success: true,
                    msg: 'Registration successful!'
                });
            }
        }
    );
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    return res.json({
        success: true,
        msg: 'User logged out.'
    });
}