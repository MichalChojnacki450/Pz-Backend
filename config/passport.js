const passport = require('passport')
const User = require('../Models/User');
const LocalStrategy = require('passport-local').Strategy;

passport.use(User.createStrategy());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());