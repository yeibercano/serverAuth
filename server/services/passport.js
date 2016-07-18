const passport = require('passport');
const User = require('../models/user');
const config = require('../../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');


const localOptions = { usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
	User.findOne({ email: email}, function(err, user) {
		if (err) { return done(err) };
			console.log('compared pass')
		if (!user) { return done(null, false) };

		// compare pass
		user.comparePassword(password, function(err, isMatch) {
			if (err) { return done(err) };
			if (!isMatch)	{ return done(null, false) };

			return done(null, user); // this user gets attached to req = re.user
		});
	});
});

//setup options
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'), 
	secretOrKey: config.secret
};

//create strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	User.findById(payload.sub, function(err, user) {
		if (err) { return done(err, false); }

		if (user) {
			done(null, user)
		} else {
			done(null, false);;
		};
	});
});

//tell passport to use these strategies
passport.use(jwtLogin);
passport.use(localLogin);
